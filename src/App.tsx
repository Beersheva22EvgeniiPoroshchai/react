import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigatorDispatcher from "./components/navigators/NavigatorDispatcher";

import SignIn from "./components/pages/SignIn";
import SignOut from "./components/pages/SignOut";
import './App.css'
import { useSelectorAuth } from "./redux/store";
import { useMemo } from "react";
import routesConfig from './config/nav-config.json';
import NotFound from "./components/pages/NotFound";
import UserData from "./model/UserData";
import { RouteType } from "./components/navigators/Navigator";
import AddEmployees from "./components/pages/AddEmployee";
import Employees from "./components/pages/Employees";
import AddEmployee from "./components/pages/AddEmployee";
import AgeStatistics from "./components/pages/AgeStatistics";
import SalaryStatistics from "./components/pages/SalaryStatistics";

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
  const userData = useSelectorAuth();
  const routes = useMemo(() => getRoutes(userData), [userData])
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<NavigatorDispatcher routes={routes}/>}>
        <Route index element={<Employees/>}/>
        <Route path="employees/add" element={<AddEmployee/>}/>
        <Route path="statistics/age" element={<AgeStatistics/>}/>
        <Route path="statistics/salary" element={<SalaryStatistics/>}/>
        <Route path="signin" element={<SignIn/>}/>
        <Route path="signout" element={<SignOut/>}/>
        <Route path="/*" element={<NotFound/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
}


export default App;