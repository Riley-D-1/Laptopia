function parse_csv(){
    console.log("Starting") 
    Papa.parse("../data/handmade_data.csv", { download : true,header: true, dynamicTyping: true,complete: function(result){
        try{
            localStorage.setItem("laptop_info",JSON.stringify(result.data))
            console.log("Found data and saved to local storage")
            console.log(result)
        }catch (error) {
            console.log("Error",error)
        }
    }});

}

function update_table(sort){
    // clear previous tables
    // Styling changes the table to look nicer fyi
    const container = document.getElementById('table-container')
    container.innerHTML = "";
    if (localStorage.getItem("laptop_info").length >= 1){
        console.log("making laptop_database");
       
        // Where the table is going 
        // The actual table
        const table = document.createElement('table')
        // body of table 
        const table_body = document.createElement('table_body')
        table.appendChild(table_body)
        container.appendChild(table)
        if(sort === "price"){
            laptop_db_old = JSON.parse(localStorage.getItem("laptop_info"))
            laptop_db = dataArray.sort((a, b) => a.price_aud - b.price_aud);
        }else if (sort === "brand"){
            laptop_db_old = JSON.parse(localStorage.getItem("laptop_info"))
            dataArray.sort((a, b) => {
                const brand_a = a.brand.toLowerCase();
                const brand_b = b.brand.toLowerCase();
                if (brand_a < brand_b) {
                    return -1;
                }
                if (brand_a > brand_b) {
                    return 1;
                }
                return 0;
            });
        }
        else{
            laptop_db = JSON.parse(localStorage.getItem("laptop_info"))
        }
        laptop_db.forEach(laptop => {
            // Making the row itself to append
            const row_table = document.createElement('tr')
            // Index
            const index = document.createElement('td')
            index.textContent = laptop.Index
            row_table.appendChild(index)
            // Brand
            const brand = document.createElement('td')
            brand.textContent = laptop.Brand
            row_table.appendChild(brand)
            // Product Name
            const product_name = document.createElement('td')
            product_name.textContent = laptop.Product_Name
            row_table.appendChild(product_name)
            // Screen Size
            const screen_size = document.createElement('td')
            screen_size.textContent = laptop.screen_size
            row_table.appendChild(screen_size)
            // Display Type
            const display_type = document.createElement('td')
            display_type.textContent = laptop.display_type
            row_table.appendChild(display_type)
            // Resolution
            const resolution = document.createElement('td')
            resolution.textContent = laptop.resolution
            row_table.appendChild(resolution)
            // Processor
            const processor = document.createElement('td')
            processor.textContent = laptop.processor
            row_table.appendChild(processor)
            // Core count
            const core_count = document.createElement('td')
            core_count.textContent = laptop.core_count
            row_table.appendChild(core_count)
            // Graphics
            const graphics = document.createElement('td')
            graphics.textContent = laptop.graphics
            row_table.appendChild(graphics)
            // ram gb
            const ram_gb = document.createElement('td')
            ram_gb.textContent = laptop.ram_gb
            row_table.appendChild(ram_gb)
            // Total Storage gb
            const storage = document.createElement('td')
            storage.textContent = laptop.storage
            row_table.appendChild(storage)
            // Wifi
            const wifi = document.createElement('td')
            wifi.textContent = laptop.wifi
            row_table.appendChild(wifi)
            // OS
            const os = document.createElement('td')
            os.textContent = laptop.os
            row_table.appendChild(os)
            // Weight
            const weight = document.createElement('td')
            weight.textContent = laptop.weight
            row_table.appendChild(weight)
            // Waranty
            const waranty = document.createElement('td')
            waranty.textContent = laptop.waranty
            row_table.appendChild(waranty)
            // Price AUD
            const price_aud = document.createElement('td')
            price_aud.textContent = laptop.price_aud
            row_table.appendChild(price_aud)
            // Appending the row
            table_body.appendChild(row_table)
            });
        container.appendChild(table);
        
    }
}
function search_(){

}
window.onload = function() {
    parse_csv()
}