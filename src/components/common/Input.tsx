import { useEffect, useRef, useState } from "react";
import InputResult from "../../model/InputResult";
import { StatusType } from "../../model/StatusType";
import Alert from "./Alert";

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
   const status = useRef<StatusType>('success')

function onClickFn(){
        const res = submitFn(inputElementRef.current!.value);
        status.current = res.status;
        if (res.status === 'success') {
            inputElementRef.current!.value = ''
        }
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
        {message && <Alert status={status.current} message={message}></Alert>}
    </div>
}
export default Input;