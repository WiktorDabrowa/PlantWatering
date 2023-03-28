import React from "react"

export default function Search({sidePanel, searching, setSearch,waterAllPlants, addRoom}) {
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
                <img alt='Not found..'className='plant_autofill_photo' src={image()}/>
                <div className='plant_autofill_data'>
                    <div className='common_name'>{item.common_name.slice(0,1).toUpperCase() + item.common_name.slice(1)}</div>
                </div>
            </div>
        )
    })

    return (
        <div className="search_container">
            
            <input onFocus={setSearch} className='search_input' onKeyUp={search} placeholder='Look for your plant...'></input>
            <div className='buttons_container'>
            <button className='waterAll_btn search_btn' onClick={waterAllPlants}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-water" viewBox="0 0 16 16">
                    <path d="M.036 3.314a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 3.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 6.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 9.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.757-.703a.5.5 0 0 1-.278-.65z"/>
                </svg>
            </button>
            <button className='addRoom_btn search_btn' onClick={addRoom}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-house-add" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h4a.5.5 0 1 0 0-1h-4a.5.5 0 0 1-.5-.5V7.207l5-5 6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 1 0 1 0v-1h1a.5.5 0 1 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"/>
                </svg>
            </button>
            </div>
            
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