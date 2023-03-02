import React from "react"

export default function Search({addPlant}) {
    // States: 
    let [plants,setPlants] = React.useState([])
    let [filtered_plants, setFilteredPlants] = React.useState([])
    console.log(filtered_plants)
    function click() {
        console.log('click')
    }
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
                if (obj.common_name.toLowerCase().includes(query)) {
                    return true
                } else if (obj.scientific_name.some(contains_query)) {
                    return true
                } else if (obj.other_name !== null) {
                    if (obj.other_name.some(contains_query)) {
                        return true
                    }
                }
            })
            ) 
            
        }
    }
    const items = filtered_plants.map(item => {
        return (
            <div key={item.id} onClick={click} className="plant_autofill">
                <img className='plant_autofill_photo' src={item.default_image.thumbnail} />
                <div className='plant_autofill_data'>
                    <div classname='common_name'>Common name : {item.common_name}</div>
                    <div classname='scientific_name'>Scientific name : {item.scientific_name}</div>
                    <div classname='other_name'>Other name : {item.other_name || 'Unknown'}</div>
                    <div classname='watering'>Watering : {item.watering || 'Unknown'}</div>
                    <div classname='sunlight'>Sunlight : {item.sunlight || 'Unknown'}</div>
                </div>
            </div>
        )
    })

    return (
        <div className="search_container">
            <input className='search_input' onKeyUp={search} placeholder='Look for your plant...'></input>
            <div className='search_autofill'>
                {items}
            </div>    
            
        </div>
    )
}