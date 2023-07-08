import { Observable } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";
const POLLER_INTERVAL = 2000;
class Cache {
    cacheString: string = '';
    set(employees: Employee[]): void {
        this.cacheString = JSON.stringify(employees);
    }
    reset() {
        this.cacheString = ''
    }
    isEqual(employees: Employee[]): boolean {
        return this.cacheString === JSON.stringify(employees)
    }
    getCache(): Employee[] {
        return !this.isEmpty() ? JSON.parse(this.cacheString) : []
    }
    isEmpty(): boolean {
        return this.cacheString.length === 0;
    }
}

export default class EmployeesServiceRest implements EmployeesService {
    private observable: Observable<Employee[] | string> | null = null;
    private cache: Cache = new Cache();
    constructor(private url: string) { }
    async updateEmployee(empl: Employee): Promise<Employee> {
        let responseText = '';
        let flUpdate = false;
        try {
            await this.getEmployee(empl.id);
            flUpdate = true;
            const response = await fetch(`${this.url}/${empl.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
                },
                body: JSON.stringify(empl)
                
            });
            if (!response.ok) {
                const { status, statusText } = response;
                responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
                throw responseText;
            }
            return await response.json();
        } catch (error: any) {
            if (!flUpdate) {
                throw error;
            }
            throw responseText ? responseText : "Server is unavailable. Repeat later on";
        }
    }
    async getEmployee(id: any): Promise<Employee> {
        let responseText = '';
        try {
            const response = await fetch(`${this.url}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
                },
                
            });
            if (!response.ok) {
                const { status, statusText } = response;
                responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
                throw responseText;
            }
            return await response.json();
        } catch (error: any) {

            throw responseText ? responseText : "Server is unavailable. Repeat later on";
        }
    }
    async deleteEmployee(id: any): Promise<void> {
        let responseText = '';
        let flDelete = false;
        try {
            await this.getEmployee(id);
            flDelete = true;
            const response = await fetch(`${this.url}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
                },
                
            });
            if (!response.ok) {
                const { status, statusText } = response;
                responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
                throw responseText;
            }
            return await response.json();
        } catch (error: any) {
            if(!flDelete) {
                throw error;
            }
            throw responseText ? responseText : "Server is unavailable. Repeat later on";
        }
    }
    getEmployees(): Observable<Employee[] | string> {
       const res =  new Observable<Employee[] | string>((subscriber) => {
            fetch(this.url, {
                headers: {
                    Authorization: "Bearer " +
                        localStorage.getItem(AUTH_DATA_JWT)
                }
            }
            ).then(response => {
                let res: Promise<Employee[] | string>
                if(response.ok) {
                    res = response.json();
                } else {
                    res = Promise.resolve(response.status == 401 || response.status == 403 ?
                     'Authentication' : response.statusText); 
                }
                return res;
                
            })
            .then((data) => subscriber.next(data))
            .catch(error => subscriber.next('Server is unavailable, repeate later on'));
            

        } );
        return res;
        
    }
    async addEmployee(empl: Employee): Promise<Employee> {
        let responseText = '';
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
                },
                body: JSON.stringify({ ...empl, userId: 'admin' })
            });
            if (!response.ok) {
                const { status, statusText } = response;
                responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
                throw responseText;
            }
            return await response.json();
        } catch (error: any) {

            throw responseText ? responseText : "Server is unavailable. Repeat later on";
        }

    }

}