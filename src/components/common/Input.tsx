import { useEffect, useRef, useState } from "react";
import InputResult from "../../model/InputResult";

type Props = {
    submitFn: (inputText: string) => InputResult;
    placeholder: string;
    buttonTitle? : string;
    type?: string
}
const Input: React.FC<Props> = ({submitFn, placeholder, buttonTitle, type}) => {
    
   const inputElementRef = useRef<HTMLInputElement>(null);
   const [disabled, setDisabled] = useState<boolean>(true);
   const [message, setMessage] = useState<string>("");
    function onClickFn(){
        const res = submitFn(inputElementRef.current!.value);
        setMessage(res.message || '');
        res.message && setTimeout(() => setMessage(''), 5000);
    }
    function onChangeFn() {
        setDisabled(!inputElementRef.current?.value)
    }
    return <div>
        <input type={type || 'text'} placeholder={placeholder} ref={inputElementRef}
        onChange={onChangeFn}/>
        <button onClick={onClickFn} disabled={disabled}>{buttonTitle || 'GO' }</button>
        {message && <p>{"success"} {message}</p>}
    </div>
}
export default Input;