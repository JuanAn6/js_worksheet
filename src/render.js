import { columnNumberToLetter } from "./helpers.js";

export class Render {
    static render(worksheet) {
        const container = document.createElement("div");
        container.classList.add('worksheet');
        const table = document.createElement("table");

        //Column headers
        if (worksheet.showColumnHeaders) {
            const tr = document.createElement("tr");

            if (worksheet.showRowHeaders) {
                let corner = document.createElement("th");
                if(worksheet.stickyColumnHeader && worksheet.stickyRowHeader) corner.classList.add('sticky-header-corner');
                tr.appendChild(corner); // Empty corner
            }

            for (let c = 1; c <= worksheet.cols; c++) {
                const th = document.createElement("th");
                th.textContent = columnNumberToLetter(c);
                if(worksheet.stickyColumnHeader) th.classList.add('sticky-header-columns');
                tr.appendChild(th);
            }

            table.appendChild(tr);
        }
        
        for (let r = 0; r < worksheet.rows; r++) {
            const tr = document.createElement("tr");

            // Row number
            if (worksheet.showRowHeaders) {
                const th = document.createElement("th");
                if(worksheet.stickyRowHeader) th.classList.add('sticky-header-rows');
                th.textContent = r+1;
                tr.appendChild(th);
            }

            for (let c = 0; c < worksheet.cols; c++) {
                const td = document.createElement("td");
                const cell = worksheet.getCell(r, c);
                td.textContent = cell.value;
                td.classList.add('default-td-sieze');
                tr.appendChild(td);
            }

            table.appendChild(tr);
        }
        
        container.appendChild(table)
        document.getElementById(worksheet.id).appendChild(container);
    }
}
