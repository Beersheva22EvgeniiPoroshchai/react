// const SignOut: React.FC = () => 
// <p className="component-logo">SignOut Component</p>
// export default SignOut;



import { useDispatch } from "react-redux";
import { userStateAction } from "../../redux/slices/authenticSlice";


const SignOut:React.FC = () => {
    
    const dispatch = useDispatch<any>()
    dispatch(userStateAction.setStatus('unauthorized'))
    return  <div>
                <p className = "component-logo" style={{textAlign:"center"}}>SignOut</p>
            </div>
}

export default SignOut;