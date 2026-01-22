export class Render {
    static render(worksheet) {
        const container = document.createElement("div");
        container.classList.add('worksheet');
        const table = document.createElement("table");
        
        for (let r = 0; r < worksheet.rows; r++) {
            const tr = document.createElement("tr");
            for (let c = 0; c < worksheet.cols; c++) {
                const td = document.createElement("td");
                const cell = worksheet.getCell(r, c);
                td.textContent = cell.value;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        
        container.appendChild(table)
        document.getElementById(worksheet.id).appendChild(container);
    }
}
