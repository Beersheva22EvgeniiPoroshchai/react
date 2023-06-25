import { useState } from "react";
import InputResult from "../../model/InputResult";
import Input from "../common/Input";
import Alert from "../common/Alert";
import { useDispatch } from "react-redux";
import { userStateAction } from "../../redux/slices/authenticSlice";


const SignIn:React.FC = () => {
    const [showInput, setShowInput] = useState<boolean>(true);
    const [inputRes, setInputRes] = useState<InputResult|null> (null)
    const dispatch = useDispatch<any>()

    function submitFn(inputText:string):InputResult{
        let res: InputResult;
            if (inputText.startsWith("admin")) {
                res = {status: "success", message: `you has been registered as ${inputText}`}
             } else {
                res = {status: "success", message: `you has been registered as user: ${inputText}`};
            }

        dispatch(userStateAction.setStatus(inputText));
        setInputRes(res);
        setShowInput(false);
        
        setTimeout(() => {
            setInputRes(null);
        }, 3000);
        return res;
    }

    return (
        <div > 
        <p className="component-logo">SignIn Component</p>
        <section style = {{display: "flex", justifyContent: "center"}}> 
        {showInput && (<Input submitFn={submitFn} placeholder="enter your login" buttonTitle="LogIn"  />)}
        
         {inputRes && (
                <Alert status={inputRes.status} message={inputRes.message || ""} />
              )}
        </section>
        </div>
        
         )
         }



export default SignIn;






// const InputLogInFn = (inputText: string): InputResult => {
//     let res: InputResult;
//     const addName = inputText.split("n"); 
//     if (inputText.startsWith("admin")) {
//         res = {status: "success", message: `you has been registered as ${inputText}`}
//       dispatch(userStateAction.setStatus(inputText));
//     } else {
//         res = {status: "success", message: `you has been registered as user: ${inputText}`};
//     }
//     setShowInput(false);
//     setInputRes(res);

//     setTimeout(() => {
//         setInputRes(null);
//       }, 3000);


//     return res;



// }

// return (
// <div > 
// <p className="component-logo">SignIn Component</p>
// <section style = {{display: "flex", justifyContent: "center"}}> 
// {showInput && (<Input submitFn={InputLogInFn} placeholder="enter your login" buttonTitle="LogIn"  />)}


// {inputRes && (
//         <Alert status={inputRes.status} message={inputRes.message || ""} />
//       )}
// </section>
// </div>

// )
// }

// export default SignIn;