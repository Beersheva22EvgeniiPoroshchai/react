import Genders from "./Genders";

type Employee = {
    id?: any;
    name: string;
    birthDate: Date;
    department: string;
    salary: number;
    gender: Genders; 


}

export default Employee;