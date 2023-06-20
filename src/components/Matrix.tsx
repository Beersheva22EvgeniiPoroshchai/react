import { ReactNode } from "react";
import Row from "./Row";

const Matrix: React.FC <{matrix: number[][]}> = ({matrix}) => {
    
    function getRows(): ReactNode {
        return matrix.map((row, ind) => <Row row={row} key={ind}/>);

    }
    
    return <section style ={{margin: 50, alignItems: "center", display: 'flex', flexDirection: "column"}}>
        {getRows()}
    </section>

}

export default Matrix;