import { Observable, Subscriber } from "rxjs";
import Employee from "../../model/Employee";
import { AUTH_DATA_JWT } from "../auth/AuthServiceJwt";
import EmployeesService from "./EmployeesService";
import { CompatClient, IMessage, Stomp } from "@stomp/stompjs";
import { PushMessage } from "../../model/PushMessage";
const TOPIC = "/topic/employees"

class Cach {

    cashMap = new Map<any,Employee>();

    addToCach(employee:Employee){
        this.cashMap.set(employee.id, employee);
    }

    delFromCach(id:any){
        this.cashMap.delete(id);
    }

    updateInCash(id:any, employee:Employee){
        this.cashMap.set(employee.id, employee);
    }

    addAllToCach(employees:Employee[]){
        employees.forEach(employee => this.addToCach(employee))
    }

    getCach():Employee[]{
        
        return Array.from(this.cashMap.values());
    }

}


async function getResponseText(response: Response): Promise<string> {
    let res = '';
    if (!response.ok) {
        const { status } = response;
        res = status == 401 || status == 403 ? 'Authentication' : await response.text();
    }
    return res;
}

function getHeaders(): HeadersInit {
    const res: HeadersInit = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
    }
    return res;
}

async function fetchRequest(url: string, options: RequestInit, empl?: Employee): Promise<Response> {
    options.headers = getHeaders();
    if (empl) {
        options.body = JSON.stringify(empl);
    }

    let flUpdate = true;
    let responseText = '';
    try {
        if (options.method == "DELETE" || options.method == "PUT") {
            flUpdate = false;
            await fetchRequest(url, {method: "GET"});
            flUpdate = true;
        }

        const response = await fetch(url, options);
        responseText = await getResponseText(response);
        if (responseText) {
            throw responseText;
        }
        return response;
    } catch (error: any) {
        if (!flUpdate) {
            throw error;
        }
        throw responseText ? responseText : "Server is unavailable. Repeat later on";
    }
}

async function fetchAllEmployees(url: string):Promise< Employee[]|string> {
    const response = await fetchRequest(url, {});
    return await response.json()
}

export default class EmployeesServiceRest implements EmployeesService {
    private observable: Observable<Employee[] | string> | null = null;
    private subscriber: Subscriber<string|Employee[]> | undefined;
    private urlService: string;
    private urlWebsocket: string;
    private stompClient: CompatClient;
    private cash:Cach;

    constructor(baseUrl: string) {
    this.urlService = `http://${baseUrl}/employees`;
    this.urlWebsocket = `ws://${baseUrl}/websocket/employees`;
    this.stompClient = Stomp.client(this.urlWebsocket);
    this.cash = new Cach();
    }

    async updateEmployee(empl: Employee): Promise<Employee> {
        const response = await fetchRequest(this.getUrlWithId(empl.id!),
            { method: 'PUT' }, empl);
        return await response.json();
    }

    private getUrlWithId(id: any): string {
        return `${this.urlService}/${id}`;
    }
    private subscriberNext(): void {
        
        fetchAllEmployees(this.urlService).then(employees => {
            if ( typeof employees != "string") {
                this.cash?.addAllToCach(employees)
            }
            this.subscriber?.next(this.cash?.getCach());     
        })
        .catch(error => this.subscriber?.next(error));

        // fetchAllEmployees(this.urlService).then(employees => {
        //     this.subscriber?.next(employees);
        //     }).catch(error => this.subscriber?.next(error));
    }

    async deleteEmployee(id: any): Promise<void> {
            await fetchRequest(this.getUrlWithId(id), {
            method: 'DELETE',
            });
           }

    getEmployees(): Observable<Employee[] | string> {
        if (!this.observable) {
            this.observable = new Observable<Employee[] | string>(subscriber => {
                this.subscriber = subscriber;
                this.subscriberNext();
                this.connectWebsocket();
                return () => this.disconnectWebsocket();
            })
        }
        return this.observable;
    }
    
    private disconnectWebsocket(): void {
       this.stompClient?.disconnect();
    }

    private connectWebsocket() {
        //this.stompClient = Stomp.client(this.urlWebsocket);
        this.stompClient.connect({}, () => {
            this.stompClient?.subscribe(TOPIC, message => {
                console.log(message.body);
                this.getAction(message);
               // this.subscriberNext();
            });
        }, (error:any) => {this.subscriber?.next(JSON.stringify(error))}, ()=> console.log("websocket disconnected"));
    }
    
    private getAction(message: any) {
        const pushMessage: PushMessage = JSON.parse(message.body);
            switch (pushMessage.status) {
                case "deleted":
                    this.cash?.delFromCach(pushMessage.employee.id);
                    break;
                case "added":
                    this.cash?.addToCach(pushMessage.employee);
                    break;
                case "updated":
                    this.cash?.updateInCash(pushMessage.employee.id, pushMessage.employee);
                    break;
                default:
                    break;
            }
            this.subscriber?.next(this.cash.getCach());
            } 
    
    
    async addEmployee(empl: Employee): Promise<Employee> {
        const response = await fetchRequest(this.urlService, {
                method: 'POST',
               }, empl);
        return response.json();

    }

}