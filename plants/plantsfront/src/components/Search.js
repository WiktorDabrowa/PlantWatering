import React from "react"

export default function Search({sidePanel, searching, setSearch}) {
    // States:
    let [plants,setPlants] = React.useState([])
    let [filtered_plants, setFilteredPlants] = React.useState([])

    // Search outside database:
    function search(event){
        // Starts search if query is longer than 3 characters
        if (event.target.value.length < 3) {
            // Do nothing
        }
        else if ( event.target.value.length === 3) {
            // Freeze until response???
            console.log(event.target.value)
            // Send request to server and save data
            let data = new FormData()
            data.append('json', JSON.stringify({data: event.target.value}))
            fetch('http://127.0.0.1:8000/external_api',{
                method: 'POST',
                body: data,
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data)
                setPlants(data.data)
            })
        } else {
            let query = event.target.value.toLowerCase()
            const contains_query = (element) => element.toLowerCase().includes(query)
            setFilteredPlants(plants.filter((obj) => {
                let response = false
                if (obj.common_name.toLowerCase().includes(query)) {
                    response = true
                } else if (obj.scientific_name.some(contains_query)) {
                    response = true
                } else if (obj.other_name !== null) {
                    if (obj.other_name.some(contains_query)) {
                        response = true
                    }
                }
                return response
            })
            ) 
            
        }
    }
    
    // Create elements in popup window
    const items = filtered_plants.map(item => {
        function image() {
            // Kazdy zawiera default_image
            let src = ''
            if (item.default_image === null) {
                src = '/outline_plant.webp'
            } else if (!Object.keys(item.default_image).includes('thumbnail')) {
                src = '/outline_plant.webp'
            } else  {
                src = item.default_image.thumbnail
            }
            return src
            
        }
        return (
            <div key={item.id} onClick={(e) => sidePanel(e, item)} className="plant_autofill">
                <img className='plant_autofill_photo' src={image()}/>
                <div className='plant_autofill_data'>
                    <div className='common_name'>{item.common_name.slice(0,1).toUpperCase() + item.common_name.slice(1)}</div>
                </div>
            </div>
        )
    })

    return (
        <div className="search_container">
            <input onFocus={setSearch} className='search_input' onKeyUp={search} placeholder='Look for your plant...'></input>
            { searching && 
                <div className='search_autofill'>
                    <div onClick={sidePanel} className='plant_autofill new_plant'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="new_plant_svg" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        <div className="new_plant_text">
                            CREATE A NEW PLANT
                        </div>
                    </div>
                    {items}
                </div>    
            }
            
        </div>
    )
}