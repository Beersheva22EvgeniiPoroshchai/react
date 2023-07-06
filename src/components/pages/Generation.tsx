import { Typography } from "@mui/material"
import Input from "../common/Input"
import InputResult from "../../model/InputResult"
import { getRandomEmployee } from "../../service/util/RandomEmployee"
import randomConf from "../../config/employee-config.json"
import { employeesService } from "../../config/service-config"
import { StatusType } from "../../model/StatusType"
import Employee from "../../model/Employee"

const {minSalary, maxSalary, minYear, maxYear, departments} = randomConf;

const Generation: React.FC = () => {

    function submitFn (inputText: string): InputResult {
    
        let res: InputResult = {status: 'success', message: `${inputText} employees have been added`}
        const countEmpl = Number.parseInt(inputText);
     
        if (countEmpl >=1 && countEmpl <= 10) {
             for (let index = 0; index < countEmpl; index++) {
        const randEmpl = getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments);
           const setOfEmployees = employeesService.addEmployee(randEmpl);
         
        }
        
        } else  {
        res= {status: 'warning', message: 'you can generate and add employees in the range from 1 to 10'}
        }

      return res;
    } 

    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}> 
    <Input submitFn={submitFn} placeholder="enter an amount of employees" buttonTitle="Generate and add" type="number"/>
   </div>
   
}
  

export default Generation