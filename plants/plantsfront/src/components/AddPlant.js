import React from "react";

export default function AddPlant({currentPlant, showPanel}) {
    const [rooms, setRooms] = React.useState([])
    const [form,setForm] = React.useState({
        name:'',
        localization:'',
        watering:'',
        sunlight:'',
        photo : null
    })

    // Fetch room data from the server  
    React.useEffect(() => {
        fetch('http://127.0.0.1:8000/rooms')
        .then((response) => response.json())
        .then((data) => setRooms(data))
    },[])

    // Displays plant data
    function display(item){
        let str = ''
        if (item === null || item === undefined) {
            return str = 'Unknown'
        }else if (typeof(item) === 'string') {
            str = item.slice(0,1).toUpperCase() + item.slice(1)
        } else if (typeof(item) === 'array') {
            str = item.join('/')
        } else if (typeof(item) === 'object') {
            str = Object.values(item).join(' | ')
        }
        return <span className='current_plant_data_span'>{str}</span>
    }

    // Sends form data to the server to create
    // new instance of Plant
    function send(e) {
        const uploadData = new FormData()
        uploadData.append('name', form.name)
        uploadData.append('localization', form.localization)
        uploadData.append('watering', form.watering)
        uploadData.append('sunlight', form.sunlight)
        uploadData.append('photo', form.photo, form.photo.name)
        e.preventDefault()
        fetch('http://127.0.0.1:8000/plants', {
            method:'POST',
            body: uploadData
        })
        .then((response) => response.json())
        .then ((data) => console.log(data))
    }

    // Handle change of form
    function handleChange(e) {
         setForm(prevForm => {
             const {name, value} = e.target
             return {
                 ...prevForm,
                 [name]: e.target.type === 'file' ? e.target.files[0] : e.target.value 
                 
             }
         })
    }

    // Populate form with data from external api
    function populateForm() {
        setForm({
            name:`${currentPlant.common_name}`,
            localization:'',
            watering:`${currentPlant.watering}`,
            sunlight:`${currentPlant.sunlight}`,
            photo:''
        })
    }
    const room_options = rooms.map(room => {
        return <option key={room.id} value={room.id}>{room.name}</option>
    })

    return (
        <div className='side_panel'>
            <button className='side_panel_closebtn' onClick = {showPanel}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-x" viewBox="0 0 20 20">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
            { (Object.keys(currentPlant).length !== 0) &&
            <div className='side_panel_current_plant'>
                <img className='current_plant_photo' src={currentPlant.default_image.medium_url}/>
                <div className='current_plant_data'>Common Name : {display(currentPlant.common_name)}</div>
                <div className='current_plant_data'>Scientific Name : {display(currentPlant.scientific_name)}</div>
                <div className='current_plant_data'>Other names : {display(currentPlant.other_name)}</div>
                <div className='current_plant_data'>Preffered watering : {display(currentPlant.watering)}</div>
                <div className='current_plant_data'>Preffered sunlight : {display(currentPlant.sunlight)}</div>
                <button onClick={populateForm}>Use this data</button>
            </div>}
            {(Object.keys(currentPlant).length === 0) && 
                <h2>New Plant</h2> 
            }
            <form onSubmit={send} className='side_panel_form'>
                <input placeholder='Name of plant'onChange={handleChange} value={form.name} className='form_input' autoComplete='off' name='name'></input>
                <select onChange={handleChange} value={form.localization} className='form_input' autoComplete='off' name='localization'>
                    {room_options}
                </select>
                <select placeholder='watering'onChange={handleChange} value={form.watering} className='form_input' autoComplete='off' name='watering'>
                    <option value='none'>None</option>
                    <option value='minimum'>Minimum</option>
                    <option value='average'>Average</option>
                    <option value='frequent'>Frequent</option>
                </select>
                <select name='sunlight' onChange={handleChange} value={form.sunlight} className="form_sunlight_choiceoptions">
                    <option value='full_shade'>Full Shade</option>
                    <option value='part_shade'>Part shade</option>
                    <option value='sun-part_shade'>Indirect sunlight</option>
                    <option value='full_sun'>Full sunlight</option>
                </select>
                <input type='file' onChange={handleChange} className='form_input' autoComplete='off' name='photo'></input>
                <button className='form_submit'>Send</button>
            </form>
        </div>
    )
}