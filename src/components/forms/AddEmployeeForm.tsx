import React, { useState } from "react";
import employeesConfig from '../../config/employee-config.json'

import {Box, Button,FormControl,FormControlLabel,FormLabel,Grid,InputLabel,MenuItem,Radio,RadioGroup,Select,TextField, Typography} from "@mui/material";
  import Employee from "../../model/Employee";
  

type Props = {
    submitFn: (empl: Employee) => void
}

const initialEmployee: Employee = {
    id: '',
    name: '',
    birthDate: new Date,
    gender: 'male',
    department: '',
    salary: 0,
}


  const AddEmployeeForm: React.FC<Props> = ({submitFn}) => {
    const {minSalary, maxSalary, maxYear, minYear , departments} = employeesConfig;
    const [employee, setEmployee] = useState<Employee>(initialEmployee);

    function setId(event: any) {
        const id = event.target.value;
        const instanceEmpl = {...employee};
        instanceEmpl.id = id;
        setEmployee(instanceEmpl);
    }



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
        const salary = event.target.value;
        const instanceEmpl = {...employee};
        instanceEmpl.salary = salary;
        setEmployee(instanceEmpl);
    }

        function setGender(event: any) {
        const gender = event.target.value;
        const instanceEmpl = {...employee};
        instanceEmpl.gender = gender;
        setEmployee(instanceEmpl);
    }

        function onSubmitFn(event: any) {
        event.preventDefault();
        submitFn(employee);
        document.querySelector('form')!.reset();
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
                    <TextField type="number" required fullWidth label="ID"
                        helperText="enter employee's id" onChange={setId}
                        value={employee.id}/>
                </Grid>


                <Grid item xs={8} sm={5} >
                    <FormControl fullWidth required>
                        <InputLabel id="select-department-id">Department</InputLabel>
                        <Select labelId="select-department-id" label="Department"
                            value={employee.department} onChange={setDepartment}>
                            <MenuItem value=''>None</MenuItem>
                            {departments.map(dep => <MenuItem value={dep}>{dep}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8} sm={5} >
                    <TextField type="text" required fullWidth label="Name"
                        helperText="enter name of employee" onChange={setName}
                        value={employee.name}/>
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


                <Grid item xs={8} sm={5} >
                    
                <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={employee.gender}
        onChange={setGender}
        
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
     </RadioGroup>
    </FormControl>
                    
                </Grid>

                <Grid item xs={8} sm={5} >
                    <TextField label="salary" fullWidth required
                        type="number" onChange={setSalary}
                        value={employee.salary || ''}
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
    

