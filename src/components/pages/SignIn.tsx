import { useDispatch } from "react-redux";
import Input from "../common/Input";
import InputResult from "../../model/InputResult";
import { authActions } from "../../redux/slices/authenticSlice";

const SignIn: React.FC = () => {
    
    const dispatch = useDispatch();
    return <Input submitFn={function (username: string): InputResult {
        setTimeout (() => dispatch(authActions.set(username)) ,3000);
        return {status: "success", message: username}
        
      
    }  } placeholder="username" />
}

 export default SignIn;


