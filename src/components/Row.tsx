import { ReactNode, useEffect, useState } from "react"
import configLife from "../config/life-game-config.json"

function getSize() {
       return Math.min(window.innerHeight, window.innerWidth) / configLife.dimension - 2;
    }

const Row: React.FC<{row: number[]}> = ({row}) => {
     const [size, setSize] = useState(getSize()); 
    useEffect(() => {
        window.addEventListener('resize', () => setSize(getSize()) );
    
    }, []) 


    function getDivs(): ReactNode {
       
        return row.map((num, ind) => 
        <div key={ind} style={{width: size, height: size, border: "solid 1px grey",  backgroundColor: num? 'black' : 'white'}}></div>)
    }

    return <section style={{display: 'flex'}}>
        {getDivs()}
    </section>
}

export default Row;
