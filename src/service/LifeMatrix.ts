import { getRandomMatrix } from "./util/random";

export default class LifeMatrix {
    constructor (private _numbers: number[][]) {

    }

    get numbers() {
        return this._numbers;
    }

    next(): number[][] {
        this._numbers = getRandomMatrix(this._numbers.length, this._numbers[0].length, 0 , 2);
        return this._numbers;
    }
}