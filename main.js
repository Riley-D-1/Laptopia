const { parse } = require('csv-parse'); 
function parse_csv(){
    laptop_data = {}

    localStorage.setItem("laptop_info")
}

function update_table(sort){
    // clear previous tables
    // Styling changes the table to look nicer fyi
    const container = document.getElementById('table-container')
    container.innerHTML = "";
    if (localStorage.getItem("laptop_info").length >= 1){
        console.log("making cards_table");
        flashcards = JSON.parse(localStorage.getItem("Flashcard"))
        // Where the table is going 
        // The actual table
        const table = document.createElement('table')
        // body of table 
        const table_body = document.createElement('table_body')
        table.appendChild(table_body)
        container.appendChild(table)  
        flashcards.forEach(card => {
            // Making back and front of table for each card
            const row_table = document.createElement('tr')
            const front_table = document.createElement('td')
            front_table.textContent = card.front
            row_table.appendChild(front_table)
            const table_back = document.createElement('td')
            table_back.textContent = card.back
            row_table.appendChild(table_back)
            table_body.appendChild(row_table)
        });
        container.appendChild(table);
        
    }
}