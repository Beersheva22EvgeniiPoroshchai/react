import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authenticSlice";


const SignOut: React.FC = () => {
    const dispatch = useDispatch();
    return <button onClick={() => dispatch(authActions.reset())}>confirm sign out</button>
}
 
 export default SignOut;

