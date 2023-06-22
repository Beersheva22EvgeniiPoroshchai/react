import { useEffect } from "react";
import LifeGame from "./components/LifeGame";
import { useDispatch } from "react-redux";
import { sizeActions } from "./redux/slices/cellSizeSlice";
import { directionActions } from "./redux/slices/flexDirection";
import Lifes from "./components/Lifes";

const App: React.FC = () => {
const dispatch = useDispatch<any>();

useEffect(() => {
    window.addEventListener('resize', () => {
    dispatch (sizeActions.setSize());
    dispatch(directionActions.setDirection()); 
    });
  
}, []);

return <div> <Lifes/>
  </div>
    

}

export default App;