import {BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/pages/Home";
import Customers from "./components/pages/Customers";
import Orders from "./components/pages/Orders";
import Products from "./components/pages/Products";
import ShoppingCart from "./components/pages/ShoppingCart";
import SignIn from "./components/pages/SignIn";
import SignOut from "./components/pages/SignOut";
import Navigator from "./components/navigators/Navigator";

const App: React.FC = () => {

return <BrowserRouter>
<Routes>

<Route path='/' element={<Navigator/>}>
<Route index element = {<Home/>} />
<Route path="customers" element={<Customers/>}/>
<Route path="home" element={<Home/>}/>
<Route path="orders" element={<Orders/>}/>
<Route path="products" element={<Products/>}/>
<Route path="shoppingCart" element={<ShoppingCart/>}/>
<Route path="signIn" element={<SignIn/>}/>
<Route path="signOut" element={<SignOut/>}/>

<Route/>

</Route>
</Routes>
</BrowserRouter>
}

export default App;