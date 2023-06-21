import { matrixSum } from "./util/number-functions";
import { getRandomMatrix } from "./util/random";


export default class LifeMatrix {
    constructor (private _numbers: number[][]) {

    }

    get numbers() {
        return this._numbers;
    }


    next(): number[][] {
        this._numbers = this._numbers.map((__, index) => this.getNewRow(index));
        return this._numbers;

    }

      private getNewRow(index: number): number[] {
        return this._numbers[index].map((__, j) => this.getNewCell(index, j));
      }

      private getNewCell(row: number, column: number): number {
        const cell = this._numbers[row][column];
        const partialMatrix = this.partialMatrix(row, column);
        const sum = matrixSum(partialMatrix) - cell;
        return cell ? getCellFromLive(sum) : getCellFromDead (sum);
      }

      private partialMatrix(row: number, column: number): number[][] {
        const indexStart = !column ? 0 : column - 1;
        const indexEnd = column === this._numbers[row].length - 1 ? column + 1: column + 2;
        return [row - 1, row, row + 1].map(i => this._numbers[i] ?
            this._numbers[i].slice(indexStart, indexEnd) : [0]) 

      }




      //private countLiveNeighbours(row: number, col: number): number {
        // const numRows = this._numbers.length;
        // const numCols = this._numbers[0].length;
        // let count = 0;
      
        // for (let i = -1; i <= 1; i++) {
        //   for (let j = -1; j <= 1; j++) {
        //     const neighbourRow = row + i;
        //     const neighbourCol = col + j;
      
        //     const isValidNeighbour = neighbourRow >= 0 && neighbourRow < numRows &&
        //     neighbourCol >= 0 && neighbourCol < numCols;
            
        //     const isCurrentCell = i === 0 && j === 0;
      
        //     if (isValidNeighbour && !isCurrentCell) {
        //       count += this._numbers[neighbourRow][neighbourCol];
        //     }
        //   }
        // }
      
        // return count;
      }


   // }

      function getCellFromLive (sum: number): number {
        return +(sum >=2 && sum <=3);
      }


      function getCellFromDead (sum: number): number {
        return +(sum === 3);
      }


    // function updateLiveCell(nLives: number): number {
    //     return (nLives === 2 || nLives === 3) ? 1 : 0;
    // }
    // function updateDeadCell(nLives: number): number {
    //     return (nLives === 3) ? 1 : 0;
    // }



    








  //  next(): number[][] {
        // const numsCopy: number[][] = new Array<number[]>();
        // for (let i = 0; i < this.numbers.length; i++) {
        //     numsCopy[i] = [];
        //     for (let j = 0; j < this._numbers[i].length; j++) {
        //         numsCopy[i][j] = this.getNumber(i, j);
        //     }
        // }
        // this._numbers = numsCopy;
        // return this._numbers;

       // this._numbers = getRandomMatrix(this._numbers.length, this._numbers[0].length, 0 , 2);
        
//     }

//     private getNumber(i: number, j: number) {
//         const neighbours: (number|undefined)[] =
//         [...this.rowNeighbours(i-1,j),...this.rowNeighbours(i+1,j),
//             this._numbers[i][j-1], this._numbers[i][j+1]];
//     const nLives = neighbours.reduce((res: number, cur) => {
//         return cur ? res + 1 : res;
//     }, 0)

//     return this._numbers[i][j] ? fromAlive(nLives) : fromDead(nLives);
// }

// private rowNeighbours(i: number, j: number):(number|undefined)[] {
//     return this.numbers[i]===undefined ? [undefined] : [this.numbers[i][j],
//         this.numbers[i][j-1], this.numbers[i][j+1] ];
//  }



//     }



