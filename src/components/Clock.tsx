import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import { timeZones } from '../config/time-zones';
import Input from './common/Input';
import InputResult from '../model/InputResult';
import Alert from './common/Alert';


type Props = {
    time: Date;
    cityCountry: string;
   
};

const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center'
};

    function getTimeZone(cityCountry: string): string|undefined {
    const timeZoneObj =
    timeZones.find(tz => JSON.stringify(tz).toLowerCase().includes(cityCountry.toLowerCase()));
    return timeZoneObj?.name;
}

export const Clock: React.FC<Props> = ({time, cityCountry}) => {
    const timeZone: string|undefined = useMemo(() => getTimeZone(cityCountry),[cityCountry]);
    const [title, setTitle] = useState<string>((timeZone && cityCountry) || 'Israel');
    const [timeStr, setTimeStr] = useState<string>(time.toLocaleTimeString(undefined,
    {timeZone}))
  
    useEffect(() => {
        const intervalId = setInterval(() => {
          setTimeStr(new Date().toLocaleTimeString(undefined, { timeZone }));
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, [timeZone]);


    function handleInputSubmit (inputText: string): InputResult {
    let res: InputResult; 
    const inputCityCountry = inputText;
    const zones = getTimeZone(inputText);
    let newTitle = inputCityCountry;
    let newTimeStr = time.toLocaleTimeString(undefined,
        {timeZone: zones}) 
       if (!zones) {
        newTitle = 'Israel';
        res = {status: "error", message: `there isn't timezone for ${inputText}, set it for ${newTitle} by default`}
       
    } else if (Array.isArray(zones)) {

        res = {status: "warning", message: `there are several timezones for ${inputText}, set first one for ${newTitle}`}
    } else {
        setTitle(newTitle);
        setTimeStr(newTimeStr);
        res = {status: "success", message: `success for ${inputText}`}
       
        
    }
   
    return res;
          
        
       
     };
     
    return <div style={style}>
            <header>
                Time in {title}
            </header>
            <p>{timeStr}</p>


            <Input
            submitFn={handleInputSubmit}
            type="text"
            placeholder="enter the name of the city/country"
            buttonTitle="Submit"
          />


    </div>
}