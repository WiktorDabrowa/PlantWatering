import React from "react";

export default function AddPlant({currentPlant, showPanel}) {
    const [form,setForm] = React.useState({
        name:'',
        localization:'',
        watering:'',
        sunlight:'',
        photo:''
    })
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
    function send(plant) {

    }

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
            </div>}
            <form className='side_panel_form'>
                <input className='form_input' name='name'></input>
                <input className='form_input' name='localization'></input>
                <input className='form_input' name='watering'></input>
                <input className='form_input' name='sunlight'></input>
            </form>
        </div>
    )
}