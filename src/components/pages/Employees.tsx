import { Alert, Box, Snackbar, Typography } from "@mui/material"
import { useState, useEffect, useRef, Dispatch, ReactNode } from "react";
import Employee from "../../model/Employee";
import { authService, employeesService } from "../../config/service-config";
import {Subscription} from 'rxjs';
import { DataGrid, GridActionsCellItem, GridColDef, GridDeleteForeverIcon, GridRowId, GridRowParams} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authenticSlice";
import { StatusType } from "../../model/StatusType";
import CodePayload from "../../model/CodePayload";
import CodeType from "../../model/CodeType";
import { codeActions } from "../../redux/slices/codeSlice";
import { Visibility } from "@mui/icons-material";
import UserData from "../../model/UserData";
import { useSelectorAuth } from "../../redux/store";
import { AnyAction } from "redux";
import Confirm from "../common/Confirm"
import AddEmployeeForm from "../forms/AddEmployeeForm";
import ModalWindow from "../common/ModalWindow";



const Employees: React.FC = () => {

    const dispatch = useDispatch();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [open, setOpen] = useState(false);
    const [confirmEmployeeId, setConfirmEmployeeId] = useState<any>(null);
    const [activeModalWindow, setActiveModalWindow] = useState<boolean>(false)
    const [formEmployee, setFormEmployee] = useState<ReactNode>()
  
  //  const editId = useRef<number>(0)


function getColumns (userData: UserData, setConfirmEmployeeId: (id: any) => void, setOpen: (open: boolean) => void): GridColDef[] {
    const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
    {field: 'name',headerName: 'Name', flex: 0.7, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
    {field: 'birthDate',  headerName: "Date", flex:0.8, type: 'date', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
    {field: 'department', headerName: 'Department', flex:0.8, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
    {field: 'salary', headerName: 'Salary, NIS', type: 'number', flex:0.6, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
    {field: 'gender', headerName: 'Gender', flex: 0.6, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'}
    ]
    if (userData && userData.role === "admin") {
        columns.push(
        {
          field: "actions",
          headerName: 'Actions',
          type: "actions",
          headerClassName: 'data-grid-header',
          flex: 0.6,
          getActions: (params) => [
            <GridActionsCellItem onClick={() => {setConfirmEmployeeId(params.id); setOpen(true)}} icon={<DeleteIcon/>} label="Delete"/>, 
            <GridActionsCellItem onClick={() => {openEditForm(params.id)}} icon={<EditIcon/>} label="Edit"/>
        ]
    })
}
return columns;    
}
          

//const [flEdit, setFlEdit] = useState<boolean>(false);


async function openEditForm(id: GridRowId) {
    const codeAlert: CodePayload = { code: CodeType.OK, message: '' };
    try {
      const employee: Employee | string = await employeesService.getEmployee(id);
      if (typeof employee !== 'string') {
        const birthDateJS = new Date(employee.birthDate);
        const form: ReactNode = (
          <AddEmployeeForm
            defNameValue={employee.name}
            defBirthDate={birthDateJS}
            defGender={employee.gender}
            defSalary={employee.salary}
            defDepartment={employee.department}
            id={id}
            submitFn={updateEmployee}
            modalClose={setActiveModalWindow}
          />
        );
        setFormEmployee(form);
        setActiveModalWindow(true);
      } else {
        if (employee.includes('Authentication')) {
          codeAlert.code = CodeType.AUTH_ERROR;
          codeAlert.message = 'Authentication error: ' + employee;
        } else {
          codeAlert.code = CodeType.SERVER_ERROR;
          codeAlert.message = 'Server error: ' + employee;
        }
        dispatch(codeActions.set(codeAlert));
        return;
      }
    } catch (error: any) {
      codeAlert.code = CodeType.SERVER_ERROR;
      codeAlert.message = 'Server error: ' + error;
      dispatch(codeActions.set(codeAlert));
      return;
    }
  }


async function updateEmployee(employee:Employee, id:any): Promise<CodePayload|void>{
    const codeAlert: CodePayload = {code:CodeType.OK,message:''}
    const response = await employeesService.updateEmployee(id,employee)
    if(typeof response === 'string'){
        if(response.includes('Authentification')){
            codeAlert.code = CodeType.AUTH_ERROR;
            codeAlert.message = 'Authentification error:' + response
        } else {
            codeAlert.code = CodeType.SERVER_ERROR
            codeAlert.message = "Server error: " + response
        }   
    } else {
        codeAlert.message = `Emploee with id: ${id} updated`
    }
    dispatch(codeActions.set(codeAlert))
    console.log(employee);

    
}




async function deleteFn(id: any, dispatch: Dispatch<AnyAction>) {
    try {
        const res = await employeesService.deleteEmployee(id);
    } catch (error: any) {
        if (typeof error == 'string') {
            if (error.includes('Authentication')) {
                authService.logout();
                dispatch(authActions.reset());
                dispatch(codeActions.set({ code: CodeType.AUTH_ERROR, message: error }))
            } else if (error.includes('Server is unavailable')) {
                dispatch(codeActions.set({ code: CodeType.SERVER_ERROR, message: error as string }))
            } else {
                dispatch(codeActions.set({ code: CodeType.UNKNOWN, message: error }))
            }
        }
    }
    const codeAlert: CodePayload = {code: CodeType.OK, message: `employee with id: ${id} was deleted`}
    dispatch(codeActions.set(codeAlert))
}




   useEffect(() => {
    const codeAlert: CodePayload = {code: CodeType.OK, message:''}
    const subscription:Subscription = employeesService.getEmployees().subscribe({
     next(employeesArr:Employee[]|string) {
         if (typeof employeesArr === 'string') {
             if(employeesArr.includes('Authentication')) {
                 codeAlert.code = CodeType.AUTH_ERROR
                 codeAlert.message = 'Authentication error'
                 dispatch(authActions.reset());
                 dispatch(codeActions.set(codeAlert))
             } else {
                 codeAlert.code = CodeType.SERVER_ERROR
                 codeAlert.message = 'Server is unavailable'
                 dispatch(codeActions.set(codeAlert))
             }
             
         } else {
             codeAlert.message = `${employeesArr.length} employees were loaded to the table`
             dispatch(codeActions.set(codeAlert))
             setEmployees(employeesArr.map(e => ({...e,birthDate: new Date(e.birthDate)})))
         }
         
         
     }
    })
    return () => subscription.unsubscribe();
 },[])

 
 const handleClose = (decision: boolean) => {
    setOpen(false);
    if (decision) {
      deleteFn(confirmEmployeeId, dispatch);
    }
  };

   return <Box sx={{display: 'flex', justifyContent: 'center'}}>
     <ModalWindow active ={activeModalWindow} element = {formEmployee} setActive={setActiveModalWindow}></ModalWindow>
        <Box sx = {{height: '50vh', width: '80vw'}}>
            <DataGrid columns={getColumns(useSelectorAuth(), setConfirmEmployeeId, setOpen)} rows={employees}/>
            <Confirm title={"Are you sure to delete employee?"} content={"You're going to delete employee"}
            open={open} handleClose={handleClose}/>

        </Box>
    </Box>

}

export default Employees;


