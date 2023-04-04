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
    function sidePanel(plant) {
        console.log(plant)
        console.log(form)
        const side_panel = document.querySelector('.side_panel')
        if (plant === undefined || Object.keys(plant).length === 0) {
            console.log('New Plant')
            setCurrentPlant({})
            console.log('Clearing')
            clearForm()
        } else if (currentPlant !== plant){
            console.log('here')
            setCurrentPlant(plant)
        }
        if (!side_panel.classList.contains('show')) {
            showPanel()
        }
    }
    function waterAllPlants() {
        fetch('http://127.0.0.1:8000/water_all', {
            method:'PUT'
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            document.querySelector('.water_animation').style.animationPlayState = 'running'
            reload()
        })
    }
    
    return (
        <div onClick = {searching ? search : undefined} className='main_container'>
            <div className='water_animation' />
            <Search 
                sidePanel = {sidePanel} 
                searching = {searching} 
                setSearch = {search}
                waterAllPlants = {() => waterAllPlants()}/>
            <div className='content_container'>
                <Rooms 
                    reload={() => reload()}
                    seed={seed}
                    sidePanel={sidePanel}
                    setForm={setForm}
                    />

                <AddPlant 
                    currentPlant={currentPlant}
                    showPanel = {showPanel}
                    reload={reload}
                    form={form}
                    setForm={setForm}/>
            </div>
        </div>
    )
}