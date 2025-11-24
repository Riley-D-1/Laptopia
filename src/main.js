function parse_csv(){
    console.log("Starting") 
    Papa.parse("../data/final_dataset.csv", { download : true,header: true, dynamicTyping: true,complete: function(result){
        try{
            localStorage.setItem("laptop_info",JSON.stringify(result.data))
            console.log("Found data and saved to local storage")
            console.log(result)
        }catch (error) {
            console.log("Error",error)
        }
    }});

}

function get_sort_type(){
  return document.getElementById('Sort_by').value
}
function update_table(sort){
    let saved_laptop_info  = JSON.parse(localStorage.getItem("laptop_info"))
    // clear previous tables
    // Styling changes the table to look nicer fyi
    const container = document.getElementById('table-container')
    container.innerHTML = "";
    if (saved_laptop_info.length >= 1){
        console.log("making laptop_database");
        console.log(saved_laptop_info)
        const headings = Object.keys(saved_laptop_info[0]);
        console.log(headings)
        // Where the table is going 
        // The actual table
        const table = document.createElement('table')
        const table_head = document.createElement('thead')
        const header_row = document.createElement('tr')
        headings.forEach(val => {
            let heading = document.createElement('th')
            heading.textContent = val
            header_row.appendChild(heading)
        });
        table_head.appendChild(header_row)
        table.appendChild(table_head)  
        console.log("done headings")  
        // body of table 
        const table_body = document.createElement('tbody')
        table.appendChild(table_body)
        container.appendChild(table)
        let laptop_db
        if(sort === "price_high"){
            laptop_db = saved_laptop_info.sort((a, b) =>  b["Price (AUD)"] - a["Price (AUD)"]);
        }else if(sort === "price_low"){
            laptop_db = saved_laptop_info.sort((a, b) => a["Price (AUD)"] - b["Price (AUD)"]);
        }else if (sort === "brand"){
            laptop_db = saved_laptop_info.sort((a, b) => a.Brand.localeCompare(b.Brand));
        }else if(sort === "product_name"){
            laptop_db = saved_laptop_info.sort((a, b) => a["Product Name"].localeCompare(b["Product Name"]));
        }else if(sort === "cpu_ghz"){
            filtered_vals = saved_laptop_info.filter((b) => b["Clock Speed (GHz)"]);
            laptop_db = filtered_vals.sort((a, b) => a["Clock Speed (GHz)"] - b["Clock Speed (GHz)"]);
        }else if(sort === "ram_amount"){
            laptop_db = saved_laptop_info.sort((a, b) => a["RAM (GB)"] - b["RAM (GB)"]);
        }else if(sort === "screen_size"){  
            filtered_vals = saved_laptop_info.filter((b) => b["Screen Size (Inches)"]);
            laptop_db = filtered_vals.sort((a, b) => a["Screen Size (Inches)"] - b["Screen Size (Inches)"]);
        }else{
            laptop_db = saved_laptop_info
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
            product_name.textContent = laptop["Product Name"]
            row_table.appendChild(product_name)
            // Screen Size
            const screen_size = document.createElement('td')
            screen_size.textContent = laptop["Screen Size (Inches)"]+'"'
            row_table.appendChild(screen_size)
            // Display Type
            const display_type = document.createElement('td')
            display_type.textContent = laptop["Display type"]
            row_table.appendChild(display_type)
            // Resolution
            const resolution = document.createElement('td')
            resolution.textContent = laptop["Resolution (Pixels)"]
            row_table.appendChild(resolution)
            // Processor
            const processor = document.createElement('td')
            processor.textContent = laptop.Processor
            row_table.appendChild(processor)
            // Clock Speed
            const clock_speed = document.createElement('td')
            clock_speed.textContent = laptop["Clock Speed (GHz)"]+" GHz"
            row_table.appendChild(clock_speed)
            // Core count
            const core_count = document.createElement('td')
            core_count.textContent = laptop["Core Count"]
            row_table.appendChild(core_count)
            // Graphics
            const graphics = document.createElement('td')
            graphics.textContent = laptop.Graphics
            row_table.appendChild(graphics)
            // ram gb
            const ram_gb = document.createElement('td')
            if (brand.textContent  === "Framework"){
                ram_gb.textContent = laptop["RAM (GB)"]+"+ GB (Upgradable)"
            }else{
                ram_gb.textContent = laptop["RAM (GB)"]+" GB"
            }
            row_table.appendChild(ram_gb)
            // Ram type
            const ram_type = document.createElement('td')
            ram_type.textContent = laptop["RAM type"]
            row_table.appendChild(ram_type)
            // Total Storage gb
            const storage = document.createElement('td')
            if (brand.textContent === "Framework"){
                storage.textContent = laptop.Storage+"+ GB (Upgradable)"
            }else{
                storage.textContent = laptop.Storage
            }

            row_table.appendChild(storage)
            // Wifi
            const wifi = document.createElement('td')
            wifi.textContent = laptop["Wi-Fi"]
            row_table.appendChild(wifi)
            // OS
            const os = document.createElement('td')
            os.textContent = laptop["OS"]
            row_table.appendChild(os)
            // Weight
            const weight = document.createElement('td')
            weight.textContent = laptop["Weight (kg)"]
            row_table.appendChild(weight)
            // Waranty
            const waranty = document.createElement('td')
            waranty.textContent = laptop.Warranty
            row_table.appendChild(waranty)
            // Price AUD
            const price_aud = document.createElement('td')
            price_aud.textContent = "$"+laptop["Price (AUD)"]
            row_table.appendChild(price_aud)
            // Link
            const link_cell = document.createElement('td')
            // Create the link itself
            const linky_part = document.createElement('a')
            linky_part.href = laptop.Link 
            linky_part.textContent = laptop.Link
            // Ensures that it opens in an new tab
            linky_part.target = "_blank"
            link_cell.appendChild(linky_part)
            row_table.appendChild(link_cell)
            // Appending the entire row
            table_body.appendChild(row_table)
            });
    }   
}
window.onload = function() {
    parse_csv()
    update_table(get_sort_type())
}