import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import Employee from '../../model/Employee';
import { Statistics } from '../Statistics';
import { employeesService } from '../../config/service-config';
import CodePayload from '../../model/CodePayload';
import CodeType from '../../model/CodeType';
import { Subscription } from 'rxjs';

export const AgeStatistics: React.FC = () => {
    
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


    const employeesAge = employees.map(empl => ({
        age: new Date().getFullYear() - new Date(empl.birthDate).getFullYear()
    }))
    return <Statistics title="Age Statistics" field="age" objects={employeesAge} />
}