import { Observable, Subscriber } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";
import CodeType from "../model/CodeType";

const POLLING_INTERVAL = 2000;

class Cache {
    cacheString: string = '';
    set(employees: Employee[]): void {
        this.cacheString = JSON.stringify(employees);
    }
    reset(): void {
        this.cacheString = '';
    }
    isEqual(employees: Employee[]): boolean{
        return this.cacheString === JSON.stringify(employees); 
    }
}

const cache = new Cache();

function getHeaders(): any {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
       }
}

async function checkResponse(response: Response): Promise<any> {
    if (response.status < 400) {
        return await response.json();
    }
    if (response.status === 401 || response.status === 403) {
        throw CodeType.AUTH_ERROR
    }
    throw CodeType.UNKNOWN
}

//let intervalId: any;


export default class EmployeesServiceRest implements EmployeesService {
    private observable: Observable<Employee[] | string> | null = null;
    private observer: Subscriber<Employee[] | string> | null = null;
    private intervalId: NodeJS.Timeout | null = null;
    
    constructor (private url : string) {
    }



    async updateEmployee(id: any, empl: Employee): Promise<Employee | string>   {
        let responseText = '';
        try {
            const response = await fetch(`${this.url}/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
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
   
    async deleteEmployee(id: any): Promise<void> {
        let response: Response;
        try {
                response = await fetch(`${this.url}/${id}`, {
                method: 'DELETE',
                headers: getHeaders()
              });
            } catch (error: any) {
            throw CodeType.SERVER_ERROR;
        }
        checkResponse(response);
    }









    getEmployees(): Observable<Employee[] | string> {
        const res =  new Observable<Employee[] | string>((subscriber) => {
             fetch(this.url, {
                headers: getHeaders()
             }
             ).then(response => {
                let res: Promise<Employee[] | string>;
                if (response.ok) {
                    res = response.json();
                } else {
                    res = Promise.resolve(response.status == 401 || response.status == 403 ?
                    'Authentication' : response.statusText); 
                }
                return res;
            })
             .then((data) => subscriber.next(data)).catch(error => subscriber.next('Server is unavailable. Repeat later'));
        });
         return res;
    }


async addEmployee(empl: Employee): Promise<Employee> {
    let responseText = '';
    try {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: getHeaders(),
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


async getEmployee(id: any): Promise<string | Employee> {
    let responseText = '';
    try {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'GET',
            headers: getHeaders(),
            
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




// getEmployees(): Observable<Employee[] | string> {
//     if (!this.observable) {
//         this.observable = new Observable(observer => {
//             this.observer = observer;
//             this.observeEmployees();
            
//             this.intervalId = setInterval(() => this.observeEmployees(), POLLING_INTERVAL)
            
//                })
//     }
//         return this.observable;
// }


// observeEmployees() {
//     const empl = this.getEmployee(id);
 
//     this.getEmployee(empl.id)
//       .then((employees) => {
//         if (cache.isEqual(employees)) {
//           this.observer?.next(employees);
//         } else {
//           cache.set(employees);
//         }
//       })
//       .catch((error) => {
//         if (error === CodeType.UNKNOWN) {
//           this.observer?.next(CodeType.UNKNOWN);
//           this.observer?.complete();
//         } else {
//           cache.reset();
//           this.observer?.next(error);
//         }
//       });
//   }

}




