import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { employeesService } from "../../config/service-config";
import Employee from "../../model/Employee";
import Statistics from "../Statistics";

export const SalaryStatistics: React.FC = () => {
    
    const [employees, setEmployees] = useState<Employee[]>([]);


    useEffect(() => {
       const subscription: Subscription = employeesService.getEmployees().subscribe({
         next(employeesArr:Employee[]|string) {
             if (typeof employeesArr != 'string') {
                  
                 setEmployees(employeesArr)
             }
             }
        })
        return () => subscription.unsubscribe();
     },[])


    const employeesSalary = employees.map(empl => ({
        salary: empl.salary
    }))
    return <Statistics title="Salary Statistics" field="salary" objects={employeesSalary} />
}

export default SalaryStatistics;