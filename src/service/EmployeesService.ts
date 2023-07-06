import { Observable } from "rxjs";
import Employee from "../model/Employee";

export default interface EmployeesService {
    addEmployee(empl: Employee): Promise<Employee>
    getEmployees(): Observable <Employee[] | string>
    deleteEmployee(id: any): Promise<void>;
    updateEmployee(id: any, empl: Employee): Promise<Employee | string> ;
    getEmployee(id: any): Promise<string | Employee>
    
}