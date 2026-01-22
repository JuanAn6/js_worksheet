import { Worksheet } from "./src/worksheet.js";

document.addEventListener('DOMContentLoaded', ()=>{
    console.log('start');

    let config = {
        id : 'worksheet',
        rows: 5, 
        cols: 5,
    }

    const sheet = new Worksheet(config);

    sheet.setCell(0, 0, "Nombre");
    sheet.setCell(0, 1, "Edad");
    sheet.setCell(1, 0, "Ana");
    sheet.setCell(1, 1, 30);
    
    sheet.render();

});