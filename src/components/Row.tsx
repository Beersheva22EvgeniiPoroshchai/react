import { ReactNode } from "react"

const Row: React.FC<{row: number[]}> = ({row}) => {
    
    function getDivs(): ReactNode {
        return row.map((num, ind) => 
        <div key={ind} style={{border: "solid 1px grey", width: 10, height: 10, backgroundColor: num? 'black' : 'white'}}></div>)
    }

    return <section style={{display: 'flex'}}>
        {getDivs()}
    </section>
}

export default Row;
