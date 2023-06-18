
import React, { CSSProperties, useEffect, useState } from 'react';
import { timeZones } from './time-zones';

type Props = {
    time: string
};

type TimeZone = {
    name: string;
    countryName: string;
    mainCities: string[];
   
} 

export const Clock: React.FunctionComponent<Props> = ({time}) => {
    const style: CSSProperties = {display: "flex", flexDirection: "column", alignItems: "center"}
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedTimeZone, setSelectedTimeZone] = useState<TimeZone | null>(null);
    const [currentTime, setCurrentTime] = useState<string>('');
   
    const changeTimeZone = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCity = event.target.value;
        const selectedTimeZone = timeZones.find((zone) => zone.mainCities.includes(selectedCity)) || null;
        setSelectedCity(selectedCity);
        setSelectedTimeZone(selectedTimeZone);
    };
 

    useEffect(() => {
        
        const interval = setInterval(() => {
            if (selectedTimeZone) {
              const currentDateTime = new Date();
              const formatter = new Intl.DateTimeFormat("en-GB", {
                timeZone: selectedTimeZone.name,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
               
              });
              const formattedTime = formatter.format(currentDateTime);
              setCurrentTime(formattedTime);
            }
          }, 1000);

        return () => {
            clearInterval(interval);
          };
        }, [selectedTimeZone]);

        const groupedTimeZones: { [country: string]: string[] } = {};

        timeZones.forEach((tZone) => {
          const { countryName, mainCities } = tZone;
          if (groupedTimeZones[countryName]) {
            groupedTimeZones[countryName].push(...mainCities);
          } else {
            groupedTimeZones[countryName] = [...mainCities];
          }
        });

        const sortedCountries = Object.keys(groupedTimeZones).sort();

    return (
        <div style={style}>
            <header>
             {selectedTimeZone ? "Time in " + selectedCity + ", " + selectedTimeZone.countryName : 'Сhoose the city of the country'}
          </header>
          <select value={selectedCity} onChange={changeTimeZone}>
            <option value="">--select city-</option>
        {sortedCountries.map((country) => (
                <optgroup key={country} label={country}>
                {groupedTimeZones[country].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <p>{currentTime || time}</p>
        </div>
      );


}

