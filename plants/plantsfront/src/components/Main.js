import React from "react";
import Search from './Search'
import Rooms from './Rooms'
import AddPlant from "./AddPlant";

export default function Main() {
    let [searching,setSearching] = React.useState(false)
    let [currentPlant, setCurrentPlant] = React.useState({})
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
                <Rooms />
                <AddPlant 
                    currentPlant={currentPlant}
                    showPanel = {showPanel}/>
            </div>
        </div>
    )
}