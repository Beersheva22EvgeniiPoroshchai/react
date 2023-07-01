import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";


export default class EmployeesServiceRest implements EmployeesService {
constructor (private url : string) {
    
}

   async addEmployee(empl: Employee): Promise<Employee> {
        const token = localStorage.getItem(AUTH_DATA_JWT)
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({ ...empl, userId: "admin" })
        });

       const data = await response.json();
       return data;
       
    }

} 