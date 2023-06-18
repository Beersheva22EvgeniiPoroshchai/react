import { useEffect, useState } from "react";
import { Clock } from "./Clock"
import { cities } from '../config/zones';
import Input from "./common/Input";
import InputResult from "../model/InputResult";
import { timeZones } from '../config/time-zones';



const Clocks:React.FC = () => {
    const [time, setTime] = useState<Date>(new Date())
    useEffect(() => {
        const intervalId = setInterval(() => {
       setTime(new Date());
      
   }, 1000 );
   return () => clearInterval(intervalId)
   }, [])

  

 return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      {cities.map((elmn) => (
        <div> 
          <Clock
           time={time}
           cityCountry={elmn.name}
           />
        
        </div>
      ))}
    </div>
  );
};


export default Clocks










