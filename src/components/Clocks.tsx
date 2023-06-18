import { useEffect, useState } from "react";
import { Clock } from "./Clock"


const Clocks: React.FC = () => {
    const [time, setTime] = useState <string> (new Date().toLocaleTimeString("en-GB"))   //starting value
    useEffect(() => {
        const intervalId = setInterval(() => {
        setTime(new Date().toLocaleTimeString("en-GB"));
       
    }, 1000);
    return () => clearInterval(intervalId);
    }, [])

    return <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", margin: "5vh"}}>
        <Clock time={time}/>
        <Clock time={time}/>
        <Clock time={time}/>
        <Clock time={time}/>
      
            </div>
}
export default Clocks










