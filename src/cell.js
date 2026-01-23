export class Cell {
    constructor(config){
        this.row = config.row;
        this.col = config.col;
        this.value = config.value ?? '';
        this.sheet = config.sheet ?? null;
    }

    setElement(element){
        let _this = this;
        this.element = element;
        this.element.addEventListener('click',()=>{
            let items = Array.from(document.querySelectorAll('.worksheet table td.selected'));
            for(let i = 0; i < items.length; i++){
                items[i].classList.remove('selected');
            }
            _this.element.classList.add('selected');
            _this.sheet.selectedCell = _this;
            _this.sheet.onSelectCell(this.sheet, _this);
        });
    }

}