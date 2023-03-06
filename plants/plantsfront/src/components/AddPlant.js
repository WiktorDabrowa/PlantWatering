import React from "react";

export default function AddPlant({currentPlant, showPanel}) {
    let [form,setForm] = React.useState()
    console.log(currentPlant)
    return (
        <div className='side_panel'>
            <button className='side_panel_closebtn' onClick = {showPanel}>
                Close
            </button>
            <form className='side_panel_form'>
                FORM SOOn
            </form>
        </div>
    )
}