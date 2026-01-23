import { Worksheet } from "./src/worksheet.js";

document.addEventListener('DOMContentLoaded', ()=>{
    console.log('start');

    let config = {
        id : 'worksheet',
        rows: 100, 
        cols: 50,

        stickyRowHeader: true,
        showRowHeaders: true,
        showColumnHeaders:true,
        stickyColumnHeader:true,
        onSelectCell : (sheet, cell) => {
            console.log('outside', cell);
        }
    }

    const sheet = new Worksheet(config);

    sheet.setCell(0, 0, "Nombre");
    sheet.setCell(0, 1, "Edad");
    sheet.setCell(1, 0, "Ana");
    sheet.setCell(1, 1, 30);
    
    sheet.render();

    console.log(sheet.getCell(1,1));

    

});