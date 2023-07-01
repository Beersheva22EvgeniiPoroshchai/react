import AuthService from "../service/AuthService";
import AuthServiceJwt from "../service/AuthServiceJwt";
import EmployeesServiceRest from "../service/EmployeesServiceRest";
import EmployeesService from "../service/EmployeesService";


export const authService: AuthService = new AuthServiceJwt('http://localhost:3500/login');
export const employeesService: EmployeesService = new EmployeesServiceRest('http://localhost:3500/employees')