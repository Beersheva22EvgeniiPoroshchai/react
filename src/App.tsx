import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/pages/Home";
import Customers from "./components/pages/Customers";
import Orders from "./components/pages/Orders";
import Products from "./components/pages/Products";
import ShoppingCart from "./components/pages/ShoppingCart";
import SignIn from "./components/pages/SignIn";
import SignOut from "./components/pages/SignOut";
import Navigator from "./components/navigators/Navigator";
import './App.css';
import { useSelectorUserState } from "./redux/store";
import { getMenuItem } from "./service/util/authentic";


const App: React.FC = () => {
    const currentUser = useSelectorUserState()
    const [menuItems,setMenuItems] = useState<string[][]>(getMenuItem(currentUser))
  
    useEffect(() => {
      setMenuItems(getMenuItem(currentUser))
    },[currentUser])
   
    return  <BrowserRouter>
              <Routes>    
              <Route path ='/' element = {<Navigator navItem={menuItems}></Navigator>}>
                  <Route path="Home" element = {<Home></Home>}/>
                  <Route path="Orders" element = {<Orders></Orders>}/>
                  <Route path="Products" element = {<Products></Products>}/>
                  <Route path="Customers" element = {<Customers></Customers>}/>
                  <Route path="ShoppingCart" element = {<ShoppingCart></ShoppingCart>}/>
                  <Route path="SignIn" element = {<SignIn></SignIn>}/>
                  <Route path="SignOut" element = {<SignOut></SignOut>}/>
                </Route>
              </Routes>
            </BrowserRouter> 
              
           
  }






// const App: React.FC = () => {

// return <BrowserRouter>
//   <Routes>

//     <Route path='/' element={<Navigator />}>
//         <Route index element = {<Home/>} />
//         <Route path="customers" element={<Customers/>}/>
//         <Route path="home" element={<Home/>}/>
//         <Route path="orders" element={<Orders/>}/>
//         <Route path="products" element={<Products/>}/>
//         <Route path="shoppingCart" element={<ShoppingCart/>}/>
//         <Route path="signin" element={<SignIn/>}/>
//         <Route path="signout" element={<SignOut/>}/>
//     </Route>

//   </Routes>

//   </BrowserRouter>

// }

export default App;