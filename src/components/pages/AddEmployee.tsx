import { Typography } from "@mui/material";
import AddEmployeeForm from "../forms/AddEmployeeForm";
import Employee from "../../model/Employee";
import { authService, employeesService } from "../../config/service-config";
import { useDispatch } from "react-redux";
import InputResult from "../../model/InputResult";
import { authActions } from "../../redux/slices/authenticSlice";
import CodePayload from "../../model/CodePayload";
import CodeType from "../../model/CodeType";
import { codeActions } from "../../redux/slices/codeSlice";


const AddEmployees: React.FC = () => {

    const dispatch = useDispatch();
    async function submitFn(empl: Employee): Promise<CodePayload> {
        const res: CodePayload = {code: CodeType.OK, message:''}
    
        try {
            const employee: Employee = await employeesService.addEmployee(empl);
            res.message = `employee with id: ${employee.id} has been added`
            dispatch(codeActions.set(res))
        } catch (error: any) {
           res.code = CodeType.AUTH_ERROR;
           if((typeof(error) == 'string') && error.includes('Authentication')) {
            authService.logout();
            dispatch(authActions.reset());
            res.message = 'Authentication error'
            dispatch(codeActions.set(res))
       }
           }
        return res;
    }

    return <AddEmployeeForm submitFn={submitFn}/>


}

export default AddEmployees;