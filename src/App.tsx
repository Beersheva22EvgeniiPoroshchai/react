import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigatorDispatcher from "./components/navigators/NavigatorDispatcher";

import SignIn from "./components/pages/SignIn";
import SignOut from "./components/pages/SignOut";
import './App.css'
import { useSelectorAuth, useSelectorCode } from "./redux/store";
import { useEffect, useMemo, useState } from "react";
import routesConfig from './config/nav-config.json';
import NotFound from "./components/pages/NotFound";
import UserData from "./model/UserData";
import { RouteType } from "./components/navigators/Navigator";
import AddEmployees from "./components/pages/AddEmployee";
import Employees from "./components/pages/Employees";
import AddEmployee from "./components/pages/AddEmployee";
import SalaryStatistics from "./components/pages/SalaryStatistics";
import Generation from "./components/pages/Generation";
import { useDispatch } from "react-redux";
import CodeType from "./model/CodeType";
import { StatusType } from "./model/StatusType";
import { codeActions } from "./redux/slices/codeSlice";
import { authService } from "./config/service-config";
import CodePayload from "./model/CodePayload";
import { authActions } from "./redux/slices/authenticSlice";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { AgeStatistics } from "./components/pages/AgeStatistics";


const {always, authenticated, admin, noadmin, noauthenticated} = routesConfig;

type RouteTypeOrder = RouteType & {order?: number}

function getRoutes(userData: UserData): RouteType[] {
  const res: RouteTypeOrder[] = [];
  res.push(...always);
  if (userData) {
     res.push(...authenticated);
     if (userData.role === 'admin') {
res.push(...admin) 
     } else {
      res.push(...noadmin)
     }
    } else {
    res.push(...noauthenticated);
  }
  
 res.sort((r1, r2) => {
  let res = 0;
  if (r1.order && r2.order) {
    res = r1.order - r2.order;
  } 
  return res;
  });
 
  if (userData) {
    res[res.length - 1].label = userData.email;
  }
  return res;
}


const App: React.FC = () => {

  const dispatch = useDispatch();
  const userData = useSelectorAuth();
  const code : CodePayload = useSelectorCode();
  
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  useEffect(() => {
    const [message, status] = codeProcessing();
    setAlertMessage(message);
    setSeverity(status);
  }, [code]);


  function codeProcessing(): [string, StatusType] {
    const status: StatusType = code.code === CodeType.OK ? 'success' : 'error';
    const message: string = code.message;

    if (code.code === CodeType.AUTH_ERROR) {
      setTimeout(() => {
        authService.logout()
        dispatch(authActions.reset())
      });
    }
    setTimeout(() => {
    dispatch(codeActions.reset())
    }, 5000);

    return [message, status];
  }




  // const [alertMessage, severity] = useMemo(() => codeProcessing(), [code]);

  // function codeProcessing() {

  //   const status: StatusType = code.code === CodeType.OK ? 'success' : 'error';
  //   const message: string = code.message;

  //   if (code.code === CodeType.AUTH_ERROR) {
  //     setTimeout(() => {
  //       authService.logout()
  //       dispatch(authActions.reset())
  //     })
  //   }
  //   setTimeout(() => {
  //     dispatch(codeActions.reset())
  //   },5000)
  //   return [message, status] as [string, AlertColor]
  // }


  const routes = useMemo(() => getRoutes(userData), [userData])
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<NavigatorDispatcher routes={routes}/>}>
        <Route index element={<Employees/>}/>
        <Route path="employees/add" element={<AddEmployee/>}/>
        <Route path="employees/generation" element={<Generation/>}/>
        <Route path="statistics/age" element={<AgeStatistics/>}/>
        <Route path="statistics/salary" element={<SalaryStatistics/>}/>
        <Route path="signin" element={<SignIn/>}/>
        <Route path="signout" element={<SignOut/>}/>
        <Route path="/*" element={<NotFound/>}/>
    </Route>
  </Routes>


<Snackbar open={!!alertMessage} autoHideDuration={20000}
                    onClose={() => setAlertMessage('')}>
                    <Alert  onClose = {() => setAlertMessage('')} severity={severity} sx={{ width: '100%' }}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>



  {/* {alertMessage != '' && <Alert severity={severity}>{alertMessage}</Alert>} */}

  </BrowserRouter>
}


export default App;



