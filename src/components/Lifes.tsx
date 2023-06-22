import { useEffect } from "react";
import { useSelectorDirection } from "../redux/store"
import { useDispatch } from "react-redux";
import LifeGame from "./LifeGame";
import { countActions } from "../redux/slices/lifesCountSlice";

const Lifes: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(countActions.setCount(2));

    }, []) 

    const flexDirection = useSelectorDirection();
    return <section style = {{display: 'flex', flexDirection, alignItems: "center", justifyContent: "space-around", height: "100vh"}}>
            <LifeGame/><LifeGame/>
    </section>
}

export default Lifes;