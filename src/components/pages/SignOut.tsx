import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authenticSlice";
import { Button } from "@mui/material";


const SignOut: React.FC = () => {
    const dispatch = useDispatch();
   
    return  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}> 
     <Button variant="contained" onClick={() => dispatch(authActions.reset())}>confirm sign out</Button>
    </div>
}
 
 export default SignOut;

