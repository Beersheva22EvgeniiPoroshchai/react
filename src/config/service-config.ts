import AuthService from "../service/auth/AuthService";
import AuthServiceJwt from "../service/auth/AuthServiceJwt";
import EmployeesServiceRest from "../service/crud/EmployeesServiceRest";
import EmployeesService from "../service/crud/EmployeesService";
import AuthServiceFake from "../service/auth/authServiceFake";
import EmployeesServiceFire from "../service/crud/EmployeesServiceFire";
import AuthServiceFire from "../service/auth/AuthServiceFire";



//export const authService: AuthService = new AuthServiceJwt('http://localhost:3500/login');
//export const employeesService: EmployeesService = new EmployeesServiceRest('http://localhost:3500/employees')

//export const authService: AuthService = new AuthServiceFake();

export const authService: AuthService = new AuthServiceFire();

export const employeesService: EmployeesService = new EmployeesServiceFire();


