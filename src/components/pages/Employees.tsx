import { Box, Snackbar, Alert, Modal } from "@mui/material"
import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch } from 'react-redux';
import Employee from "../../model/Employee";
import { authService, employeesService } from "../../config/service-config";
import { Subscription } from 'rxjs';
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import { StatusType } from "../../model/StatusType";
import CodeType from "../../model/CodeType";
import { codeActions } from "../../redux/slices/codeSlice";
import UserData from "../../model/UserData";
import { Delete, Edit } from "@mui/icons-material";
import { useSelectorAuth } from "../../redux/store";
import { Confirmation } from "../common/Confirmation";
import { CSSProperties } from "@mui/material/styles/createMixins";
import { EmployeeForm } from "../forms/EmployeeForm";
import InputResult from "../../model/InputResult";

const columnsCommon: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'name', headerName: 'Name', flex: 0.7, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'birthDate', headerName: "Date", flex: 0.8, type: 'date', headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'department', headerName: 'Department', flex: 0.8, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'salary', headerName: 'Salary', type: 'number', flex: 0.6, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'gender', headerName: 'Gender', flex: 0.6, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
   ];
   
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Employees: React.FC = () => {
    const columnsAdmin: GridColDef[] = [
        {
            headerName: 'Actions', headerClassName: 'data-grid-header', field: 'actions', type: "actions", getActions: (params) => {
                return [
                    <GridActionsCellItem label="remove" icon={<Delete />}
                        onClick={() => removeEmployee(params.id)
                        } />,
                    <GridActionsCellItem label="update" icon={<Edit />}
                        onClick={() => {
                            employeeId.current = params.id as any;
                            if (params.row) {
                                const empl = params.row;
                                empl && (employee.current = empl);
                                setFlEdit(true)
                            }
    
                        }
                        } />
                ] ;
            }
        }
       ]
    const dispatch = useDispatch();
    const userData = useSelectorAuth();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const columns = useMemo(() => getColumns(), [userData, employees]);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openEdit, setFlEdit] = useState(false);
    const title = useRef('');
    const content = useRef('');
    const employeeId = useRef('');
    const confirmFn = useRef<any>(null);
    const employee = useRef<Employee | undefined>();
    useEffect(() => {

        const subscription: Subscription = employeesService.getEmployees()
            .subscribe({
                next(emplArray: Employee[] | string) {
                    let code: CodeType = CodeType.OK;
                    let message: string = '';
                    if (typeof emplArray === 'string') {
                        if (emplArray.includes('Authentication')) {
                            code = CodeType.AUTH_ERROR;
                            message = "Authentication error, mooving to Sign In";
                        } else {
                            code = emplArray.includes('unavailable') ? CodeType.SERVER_ERROR :
                                CodeType.UNKNOWN;
                            message = emplArray;
                        }


                    } else {
                        setEmployees(emplArray.map(e => ({ ...e, birthDate: new Date(e.birthDate) })));
                    }
                    dispatch(codeActions.set({ code, message }))

                }
            });
        return () => subscription.unsubscribe();
    }, []);

    function getColumns(): GridColDef[] {
        let res: GridColDef[] = columnsCommon;
        if (userData && userData.role == 'admin') {
            res = res.concat(columnsAdmin);
        }
        return res;
    }
    function removeEmployee(id: any) {
        title.current = "Remove Employee object?";
        const employee = employees.find(empl => empl.id == id);
        content.current = `You are going remove employee with id ${employee?.id}`;
        employeeId.current = id;
        confirmFn.current = actualRemove;
        setOpenConfirm(true);
    }

    async function actualRemove(isOk: boolean) {
        let code: CodeType = CodeType.OK;
        let message: string = '';

        if (isOk) {
            try {
                await employeesService.deleteEmployee(employeeId.current);
            } catch (error: any) {
                if (error.includes('Authentication')) {

                    code = CodeType.AUTH_ERROR;
                    message = "Authentication error, mooving to Sign In";
                } else {
                    code = error.includes('unavailable') ? CodeType.SERVER_ERROR :
                        CodeType.UNKNOWN;
                    message = error;
                }
            }
        }
        dispatch(codeActions.set({ code, message }))
        setOpenConfirm(false);
    }
    
    function updateEmployee(empl: Employee): Promise<InputResult> {
        setFlEdit(false)
        const res: InputResult = { status: 'error', message: '' };
        if (JSON.stringify(employee.current) != JSON.stringify(empl)) {
            title.current = "Update Employee object?";
            employee.current = empl;
            content.current = `You are going update employee with id ${empl.id}`;
            confirmFn.current = actualUpdate;
            setOpenConfirm(true);
        }
        return Promise.resolve(res);
    }
    
    async function actualUpdate(isOk: boolean) {
        let code: CodeType = CodeType.OK;
        let message: string = '';

        if (isOk) {
            try {
                await employeesService.updateEmployee(employee.current!);
            } catch (error: any) {
                if (error.includes('Authentication')) {

                    code = CodeType.AUTH_ERROR;
                    message = "Authentication error, mooving to Sign In";
                } else {
                    code = error.includes('unavailable') ? CodeType.SERVER_ERROR :
                        CodeType.UNKNOWN;
                    message = error;
                }
            }
        }
        dispatch(codeActions.set({ code, message }))
        setOpenConfirm(false);

    }

    return <Box sx={{
        display: 'flex', justifyContent: 'center',
        alignContent: 'center'
    }}>
        <Box sx={{ height: '80vh', width: '80vw' }}>
            <DataGrid columns={columns} rows={employees} />
        </Box>
        <Confirmation confirmFn={confirmFn.current} open={openConfirm}
            title={title.current} content={content.current}></Confirmation>
        <Modal
            open={openEdit}
            onClose={() => setFlEdit(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <EmployeeForm submitFn={updateEmployee} employeeUpdated={employee.current} />
            </Box>
        </Modal>


    </Box>
}
export default Employees;