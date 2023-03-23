import React from "react";
import Search from './Search'
import Rooms from './Rooms'
import AddPlant from "./AddPlant";

export default function Main() {
    let [searching,setSearching] = React.useState(false)
    let [currentPlant, setCurrentPlant] = React.useState({})
    const [seed,setSeed] = React.useState(true)
    const [form,setForm] = React.useState({
        name:'',
        localization:'',
        watering:'',
        sunlight:'',
        photo : null
    })
    function clearForm() { 
        setForm({
            name:'',
            localization:'',
            watering:'',
            sunlight:'',
            photo : null 
        })
    }
    function reload(){
        console.log('Reloading Component')
        setSeed(!seed)
    }
    function search (event) {
        if (event.target.tagName === 'INPUT') {
            setSearching(true)
        }
        else {
            setSearching(false)
        }
    }
    function showPanel() {
        const side_panel = document.querySelector('.side_panel')
        side_panel.classList.toggle('show')
    }
    function sidePanel(event, plant) {
        const side_panel = document.querySelector('.side_panel')
        if (plant === undefined) {
            console.log('New Plant')
            setCurrentPlant({})
            clearForm()
        } else if (currentPlant !== plant){
            setCurrentPlant(plant)
        }
        if (event.target.classList.contains('plant_autofill')) {
            if (!side_panel.classList.contains('show')) {
                showPanel()
            }
        }
    }
    return (
        <div onClick = {searching ? search : undefined} className='main_container'>
            <Search 
                sidePanel = {sidePanel} 
                searching = {searching} 
                setSearch = {search}/>
            <div className='content_container'>
                <Rooms 
                    reload={() => reload()}
                    seed={seed}/>
                <AddPlant 
                    currentPlant={currentPlant}
                    showPanel = {showPanel}
                    reload={() => reload()}
                    form={form}
                    setForm={setForm}/>
            </div>
        </div>
    )
}