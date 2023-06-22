import { useState } from "react";
import { useSelectorCount, useSelectorDirection } from "../redux/store"
import { useDispatch } from "react-redux";
import LifeGame from "./LifeGame";
import { countActions } from "../redux/slices/lifesCountSlice";
import Input from "./common/Input";
import InputResult from "../model/InputResult";

const Lifes: React.FC = () => {
    const dispatch = useDispatch();
    const [showInput, setShowInput] = useState<boolean>(true);
    const count = useSelectorCount();

    const handleInputSubmit = (inputText: string): InputResult => {
        const res: InputResult = {status: "error", message: `forbidden for ${inputText} games, you should enter in range from 1 to 5 `}
        const count = parseInt (inputText, 10);
        if (count >= 1 && count <= 5) {
            dispatch(countActions.setCount(count));
            setShowInput(false);
            
        } 
        return res;
     }

    const flexDirection = useSelectorDirection();
    return (
             <section style = {{display: 'flex', flexDirection, alignItems: "center", justifyContent: "space-around", height: "100vh"}}>
            {showInput? 
            (<Input submitFn={handleInputSubmit} placeholder="enter a number of lives" buttonTitle="Start" type="number"/>) : 
            (Array.from({length: count},(__, index) => <LifeGame key={index} />))
            }
                 
    </section>
    );   
}


export default Lifes;