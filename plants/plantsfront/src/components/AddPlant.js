import React from "react";

export default function AddPlant({currentPlant, showPanel, reload, form, setForm}) {
    const [rooms, setRooms] = React.useState([])
    const [errors,setErrors] = React.useState([])
    const [serverError,setServerError] = React.useState('')
    
    function validateForm() {
        setErrors([])
        let errors = []
        for (const [key,value] of Object.entries(form)) {
            if (value === '' || value === null) {
                errors.push({
                    key:value
                })
            }
        }
        setErrors(errors)
        return errors
    }
    console.log(serverError)
    
    // Fetch room data from the server  
    React.useEffect(() => {
        fetch('http://127.0.0.1:8000/rooms')
        .then((response) => response.json())
        .then((data) => setRooms(data))
    },[])

    // Displays plant data in correct formatting
    function display(item){
        let str = ''
        if (item === null || item === undefined) {
            return str = 'Unknown'
        } else if (typeof(item) === 'string') {
            str = item.slice(0,1).toUpperCase() + item.slice(1)
        } else if (typeof(item) === 'object') {
            str = Object.values(item).join(' | ')
        }
        return <span className='current_plant_data_span'>{str}</span>
    }

    function sendData() {
        console.log('sent')
        const uploadData = new FormData()
        uploadData.append('name', form.name)
        uploadData.append('localization', form.localization)
        uploadData.append('watering', form.watering)
        uploadData.append('sunlight', form.sunlight)
        if (typeof form.photo === 'string') {
            uploadData.append('photo', form.photo)
        } else {
            uploadData.append('photo', form.photo, form.photo.name)
        }
        fetch('http://127.0.0.1:8000/plants', {
            method:'POST',
            body: uploadData
        })
        .then((response) => response.json())
        .then ((data) => {
            console.log(data)
            if (data !== 'Plant created') {
                setServerError(data)
            } else{
                reload()
            }
        })
        
    }
    // Sends form data to the server to create
    // new instance of Plant
    function checkForm(e) {
        e.preventDefault()
        let errors = validateForm()
        if (errors.length === 0) {
            sendData()
        }
    }

    // Handle change of form
    function handleChange(e) {
         setForm(prevForm => {
             const {name, value,files} = e.target
             return {
                 ...prevForm,
                 [name]: e.target.type === 'file' ? files[0] : value 
                 
             }
         })
    }
    // Handle difference in API defaul_photo object structure
    function getSrc(photoObject) {
        let src = ''
        if (photoObject === null) {
            src = '/outline_plant.webp'
        } else if (!Object.keys(photoObject).includes('medium_url')) {
            src = '/outline_plant.webp'
        } else  {
            src = photoObject.medium_url
        }
        return src
    } 
    // Populate form with data from external api
    function populateForm() {

        function handleDifferentDataTypes(data) {
            let result = ''
            if (typeof data === 'string') {
                result = data.split(' ').join('_').toLowerCase()
            } else if (typeof data === 'object' && data.length !== undefined){
                result = data[0].split(' ').join('_').toLowerCase()
            }
            return result
        }
        const photo_url = currentPlant.default_image.original_url
        setForm({
            name:`${currentPlant.common_name.slice(0,1).toUpperCase() + currentPlant.common_name.slice(1)}`,
            localization:'',
            watering:`${handleDifferentDataTypes(currentPlant.watering)}`,
            sunlight:`${handleDifferentDataTypes(currentPlant.sunlight)}`,
            photo:photo_url !== null && photo_url.lenght !== 0 ? photo_url : ''
        })
    }
    
    const errorField = errors.map(error =>{
        return <li key={error} className='error'>{error.slice(0,1).toUpperCase() + error.slice(1)}</li>
    })
    const room_options = rooms.map(room => {
        return <option key={room.id} value={room.id}>{room.name}</option>
    })

    return (
        <div className='side_panel_wrapper'>
        <div className='side_panel'>
            <button className='side_panel_closebtn' onClick = {showPanel}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 15 15">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
            { (Object.keys(currentPlant).length !== 0) &&
            <div className='side_panel_current_plant'>
                <img alt='...'className='current_plant_photo' src={getSrc(currentPlant.default_image)}/>
                <div className='current_plant_data'>Common Name : {display(currentPlant.common_name)}</div>
                <div className='current_plant_data'>Scientific Name : {display(currentPlant.scientific_name)}</div>
                <div className='current_plant_data'>Other names : {display(currentPlant.other_name)}</div>
                <div className='current_plant_data'>Preffered watering : {display(currentPlant.watering)}</div>
                <div className='current_plant_data'>Preffered sunlight : {display(currentPlant.sunlight)}</div>
                <button className='populate_form_btn'onClick={populateForm}>Use this data</button>
            </div>}
            {(Object.keys(currentPlant).length === 0) && 
            <h2 className='side_panel_newplant'>New Plant</h2> 
            }
            <form onSubmit={checkForm} className='side_panel_form'>
                <input placeholder='Name of plant'onChange={handleChange} value={form.name} className='form_input' autoComplete='off' name='name'></input>
                <select onChange={handleChange} value={form.localization} className='form_input' autoComplete='off' name='localization'>
                    <option value='' disabled selected hidden>Choose a room...</option> 
                    {room_options}
                </select>
                <select placeholder='watering'onChange={handleChange} value={form.watering} className='form_input' autoComplete='off' name='watering'>
                    <option value='' disabled selected hidden>How often does it need to be watered?</option>
                    <option value='none'>None</option>
                    <option value='minimum'>Minimum</option>
                    <option value='average'>Average</option>
                    <option value='frequent'>Frequent</option>
                </select>
                <select name='sunlight' onChange={handleChange} value={form.sunlight} className="form_sunlight">
                    <option value='' disabled selected hidden>What position does it like?</option>
                    <option value='full_shade'>Full Shade</option>
                    <option value='part_shade'>Part shade</option>
                    <option value='sun-part_shade'>Indirect sunlight</option>
                    <option value='full_sun'>Full sunlight</option>
                </select>
                <label className='photo_input_label'for='photo_input'>
                    <input id='photo_input' type='file' onChange={handleChange} className='form_input' autoComplete='off' name='photo'></input>
                    Select photo
                </label>
                {errors.length !== 0 && 
                    <div className="errors">
                        <h3 className='errors_caption'>These fields are required:</h3>
                        <ul>
                            {errorField}
                        </ul>
                    </div>
                }
                {serverError && 
                <div className='server_error'>
                    <p className='server_error_label'>Server Error:</p>
                    {serverError.map(error => {
                        return (
                            <p>{error[0].slice(0,1).toUpperCase() + error[0].slice(1)} : {error[1]}</p>
                        )
                    })}
                </div>}
                <button className='form_submit'>Send</button>
            </form>
        </div>
        </div>
    )
}