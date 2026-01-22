import { Cell } from "./cell.js";
import { Render } from "./render.js";

export class Worksheet {
    
    constructor({ id = 'worksheet', rows = 0, cols = 0 } = {}) {
        this.id = id;
        this.rows = rows;
        this.cols = cols;
        this.cells = new Map(); 
    }

    _key(row, col) {
        return `${row}:${col}`;
    }

    setCell(row, col, value) {
        if (row < 0 || col < 0) {
            throw new Error("Row y Col deben ser >= 1");
        }

        this.cells.set(this._key(row, col), new Cell(row, col, value));

        this.rows = Math.max(this.rows, row);
        this.cols = Math.max(this.cols, col);
    }

    getCell(row, col) {
        return this.cells.get(this._key(row, col)) ?? new Cell(row, col);
    }

    render(){
        Render.render(this);
    }
}
