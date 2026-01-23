import { columnNumberToLetter } from "./helpers.js";

export class Render {
    render(worksheet) {
        const container = document.createElement("div");
        container.classList.add('worksheet');
        const table = document.createElement("table");

        if (worksheet.showValueBar) {
            this.generateInputBar(worksheet, container);
        }

        //Column headers
        if (worksheet.showColumnHeaders) {
            this.generateHeaderColumns(worksheet, table);
        }

        for (let r = 0; r < worksheet.rows; r++) {
            const tr = document.createElement("tr");

            // Row number
            if (worksheet.showRowHeaders) {
                const th = document.createElement("th");
                if (worksheet.stickyRowHeader) th.classList.add('sticky-header-rows');
                th.textContent = r + 1;
                tr.appendChild(th);
            }

            for (let c = 0; c < worksheet.cols; c++) {
                const td = document.createElement("td");
                const div = document.createElement("div");
                const cell = worksheet.getCell(r, c);
                div.textContent = cell.value;
                div.classList.add('cell-content');
                td.classList.add('default-td-sieze');
                td.appendChild(div);
                tr.appendChild(td);
                
                worksheet.setCellElement(r, c, div); //Save the element of the cell
            }

            table.appendChild(tr);
        }

        container.appendChild(table)
        document.getElementById(worksheet.id).appendChild(container);
    }

    generateHeaderColumns(worksheet, table) {
        const tr = document.createElement("tr");

        if (worksheet.showRowHeaders) {
            let corner = document.createElement("th");
            if (worksheet.stickyColumnHeader && worksheet.stickyRowHeader) corner.classList.add('sticky-header-corner');
            tr.appendChild(corner); // Empty corner
        }

        for (let c = 1; c <= worksheet.cols; c++) {
            const th = document.createElement("th");
            th.textContent = columnNumberToLetter(c);
            if (worksheet.stickyColumnHeader) th.classList.add('sticky-header-columns');
            tr.appendChild(th);
        }

        table.appendChild(tr);
    }

    generateInputBar(workseet, container) {
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');

        //Cell info
        const cellInfo = document.createElement('span');
        cellInfo.classList.add('cell-info');
        cellInfo.id='cell-info';
        workseet.cellInfo = cellInfo;
        inputContainer.appendChild(cellInfo);
        

        //Input 
        const input = document.createElement('input');
        input.classList.add('input-value');
        input.type = 'text';
        input.id='input-value';
        workseet.inputValue = input;
        inputContainer.appendChild(input);


        container.appendChild(inputContainer);
    }
}
