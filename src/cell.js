import { columnNumberToLetter } from "./helpers.js";

export class Cell {
    constructor(config){
        this.row = config.row;
        this.col = config.col;
        this.value = config.value ?? '';
        this.sheet = config.sheet ?? null;
        this.element = null;
    }

    setElement(element){
        let _this = this;
        this.element = element;
        this.element.parentElement.addEventListener('click',()=>{
            _this._selectCell()
        });
    }

    _selectCell(){
        let _this = this;
        if(_this.sheet.selectedCell == _this) return;
            
        _this.sheet.selectedCell.toggleActive(false);

        let items = Array.from(document.querySelectorAll('.worksheet table td.selected'));
        for(let i = 0; i < items.length; i++){
            items[i].classList.remove('selected');
        }

        _this.element.parentElement.classList.add('selected');
        _this.sheet.selectedCell = _this;
        _this.sheet.inputValue.value = _this.value;
        _this.toggleActive(true);
        _this.sheet.cellInfo.textContent = columnNumberToLetter(_this.col+1)+''+(_this.row+1);
        _this.sheet.onSelectCell(this.sheet, _this);
    }

    setValue(value){
        this.value = value;
        this.element.textContent = value;
    }

    toggleActive(active){
        let _this = this;
        // Contenteditable method
        if(active){
            _this.element.contentEditable = 'true';
            _this.element.addEventListener("keydown", (evt) => { _this._handleCellKeyDownChange(evt); });
            _this.element.addEventListener("input", () => { _this._handleCellContetChange(); });
            _this.element.classList.add('inside_cell_input');
            _this.element.focus();
        }else{
            _this.element.contentEditable = 'false';
        }
        //Input method
        /*
        if(active){
            let input = document.createElement('input');
            input.type = 'text';
            input.id = 'inside_cell_input';
            input.value = _this.value;
            _this.element.textContent = '';
            _this.element.append(input);
            input.focus();
        }else{
            let input = document.getElementById('inside_cell_input');
            if (input) {
                _this.setValue(input.value);
                input.remove();
            }
        }
        */

    }

    _handleCellContetChange(){
        _this.sheet.inputValue.value = _this.element.textContent;
    }

    _handleCellKeyDownChange(evt){
        let _this = this;
        if(evt.key === 'Enter'){
            evt.preventDefault();
            //Apply formats

            //Change selectedCell
            _this.sheet.setSelection(_this.row+1, _this.col);
        }
    }

}