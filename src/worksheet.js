import { Cell } from "./cell.js";
import { Render } from "./render.js";

export class Worksheet {
    
    constructor(config) {
        
        this.id = config.id ?? 'workseet';
        this.rows = config.rows ?? 10;
        this.cols = config.cols ?? 10;
        
        this.showRowHeaders = config.showRowHeaders ?? true;
        this.stickyRowHeader = config.stickyRowHeader ?? true;
        
        this.showColumnHeaders = config.showColumnHeaders ?? true;
        this.stickyColumnHeader = config.stickyColumnHeader ?? true;

        this.showValueBar = config.showValueBar ?? true;
        
        this.onSelectCell = config.onSelectCell ?? (() => {});

        this.cells = new Map(); 

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this._setCellStart(r, c, '', this);
            }
        }

        this.render();

        this.selectedCell = this.cells.get('0:0');
        console.log(this.selectedCell);
        this.selectedCell.element.classList.add('selected');

        
    }

    _key(row, col) {
        return `${row}:${col}`;
    }

    setCellElement(row, col, element){
        let cell = this.cells.get(this._key(row, col))
        if(cell){
            cell.setElement(element);
        }else{
            throw new Error("The cell "+row+":"+col+" does not exists");
        }
    }

    _setCellStart(row, col, value) {
        if (row < 0 || col < 0) {
            throw new Error("row and col must be >= 1");
        }

        this.cells.set(this._key(row, col), new Cell({
            row : row,
            col : col,
            value : value,
            sheet : this,
        }));

        this.rows = Math.max(this.rows, row);
        this.cols = Math.max(this.cols, col);
    }

    setCell(row, col, value) {
        if (row < 0 || col < 0) {
            throw new Error("row and col must be >= 1");
        }

        const cell = this.cells.get(this._key(row, col));
        if(cell){
            cell.setValue(value)
        }

    }

    getCell(row, col) {
        return this.cells.get(this._key(row, col)) ?? null;
    }

    render(){
        (new Render()).render(this);

        let _this = this;
        this.inputValue.addEventListener('input', ()=>{
            if(!_this.selectedCell) return;
            _this.selectedCell.element.textContent = _this.inputValue.value; 
            _this.selectedCell.value = _this.inputValue.value;
        })
    }
}
