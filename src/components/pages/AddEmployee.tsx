import { Typography } from "@mui/material";
import AddEmployeeForm from "../forms/AddEmployeeForm";
import Employee from "../../model/Employee";
import { employeesService } from "../../config/service-config";


const AddEmployees: React.FC = () => {
    async function submitFn(employee: Employee): Promise<void> {
        await employeesService.addEmployee(employee);
}


  //  return <Typography variant="h4" align="center">Add Employees page</Typography>
  return <AddEmployeeForm submitFn={submitFn}/>
}

export default AddEmployees;