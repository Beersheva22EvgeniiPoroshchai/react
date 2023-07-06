import React, { useRef, useState } from "react";
import employeesConfig from '../../config/employee-config.json'

import {Alert, Box, Button,FormControl,FormControlLabel,FormHelperText,FormLabel,Grid,InputLabel,MenuItem,Radio,RadioGroup,Select,Snackbar,TextField, Typography} from "@mui/material";
  import Employee from "../../model/Employee";
import { StatusType } from "../../model/StatusType";
import InputResult from "../../model/InputResult";
import CodePayload from "../../model/CodePayload";
import CodeType from "../../model/CodeType";
import Genders from "../../model/Genders";
  

type Props = {
    submitFn: (empl: Employee, id?: any) => Promise<CodePayload|any>
    modalClose?:(active: boolean) => void,
    id?:any,
    defNameValue?:string
    defBirthDate?:Date,
    defSalary?:number,
    defGender?:Genders,
    defDepartment?:string

}

const initialDate: any = 0;
const initialGender: any = '';
const initialEmployee: Employee = {
    id: 0, birthDate: initialDate, name: '',department: '', salary: 0,
     gender: initialGender
};


  const AddEmployeeForm: React.FC<Props> = ({submitFn, defNameValue, defBirthDate, defSalary, defGender, defDepartment}) => {
    const {minSalary, maxSalary, maxYear, minYear , departments} = employeesConfig;
    const [employee, setEmployee] = useState<Employee>(initialEmployee);
    const [errorMessage, setErrorMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const severity = useRef<CodeType>();


    function setName(event: any) {
        const name = event.target.value;
        const instanceEmpl = {...employee};
        instanceEmpl.name = name;
        setEmployee(instanceEmpl);
    }

    function setBirthDate(event: any) {
        const birthDate = event.target.value;
        const instanceEmpl = {...employee};
        instanceEmpl.birthDate = birthDate;
        setEmployee(instanceEmpl);
    }


    function setDepartment(event: any) {
        const department = event.target.value;
        const instanceEmpl = {...employee};
        instanceEmpl.department = department;
        setEmployee(instanceEmpl);

    }

    function setSalary(event: any) {
        const salary = +event.target.value;
        const instanceEmpl = {...employee};
        instanceEmpl.salary = salary;
        setEmployee(instanceEmpl);
    }

        function setGender(event: any) {
        setErrorMessage('');
        const gender: 'male' | 'female' = event.target.value;
        const instanceEmpl = {...employee};
        instanceEmpl.gender = gender;
        setEmployee(instanceEmpl);
    }

        async function onSubmitFn(event: any) {
        event.preventDefault();
        if (!employee.gender) {
            setErrorMessage('You should mark the gender');
        } else {
        const res = await submitFn(employee);
         severity.current = res.code; 
         res.code == CodeType.OK && event.target.reset();
         setAlertMessage(res.message!)
        }
        // submitFn(employee);
        // document.querySelector('form')!.reset();
     }

     function onResetFn(event: any) {
        setEmployee(initialEmployee);    //initialEmployee
     }

     return <Box sx={{ marginTop: { sm: "10vh" } }}>
         
        <form onSubmit={onSubmitFn} onReset={onResetFn}>
            <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} >

            <Typography
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: ""}}
          variant="h6"
          id="tableTitle"
          component="div"
          fontSize={25}
          >
          Add Employee form
        </Typography>
        </Grid>

        <Grid item xs={8} sm={5} >
                    <TextField type="text" required fullWidth label="Name"
                        helperText="enter name of employee" onChange={setName}
                        value={defNameValue ? defNameValue : null}/>
                </Grid>


                <Grid item xs={8} sm={5} >
                    <TextField type="date" required fullWidth label="birthDate"
                        value={employee.birthDate} inputProps={{
                            min: `${minYear}-01-01`,
                            max: `${maxYear}-12-31`
                        }} InputLabelProps={{
                            shrink: true
                        }} onChange={setBirthDate} />
                </Grid>

                <Grid item xs={8} sm={4} md={5}>
                    <FormControl required error={!!errorMessage}>
                        <FormLabel id="gender-group-label">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="gender-group-label"
                            defaultValue=""
                            value={defGender ? defGender : null}
                            name="radio-buttons-group"
                           row onChange={setGender}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female"  />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormHelperText>{errorMessage}</FormHelperText>
                        </RadioGroup>
                    </FormControl>
                </Grid>

    
                <Grid item xs={8} sm={5} >
                    <FormControl fullWidth required>
                        <InputLabel id="select-department-id">Department</InputLabel>
                        <Select labelId="select-department-id" label="Department"
                            defaultValue={defDepartment? defDepartment : ''} onChange={setDepartment}>
                            <MenuItem value=''>None</MenuItem>
                            {departments.map(dep => <MenuItem value={dep}>{dep}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={8} sm={5} >
                    <TextField type="number" required fullWidth label="Salary"
                        onChange={setSalary}
                        defaultValue={defSalary? defSalary : null}
                        helperText={`enter salary size from ${minSalary*1000} to ${maxSalary*1000}`}
                        inputProps={{
                            min: `${minSalary*1000}`,
                            max: `${maxSalary*1000}`
                        }} InputLabelProps={{
                            shrink: !!employee.salary
                        }} />
                </Grid>
            </Grid>

<Box sx={{ marginTop: {xs: "10vh", sm:"5vh"}, textAlign: "center"}}>
    <Button type="submit">Submit</Button>
            <Button type="reset">Reset</Button>
</Box>
            
        </form>

    </Box>
}

  
  export default AddEmployeeForm;
    

