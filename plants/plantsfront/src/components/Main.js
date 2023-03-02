import React from "react";
import Search from './Search'
import Rooms from './Rooms'
import AddPlant from "./AddPlant";

export default function Main() {
    let [adding,setAdding] = React.useState(false)
    function addPlant() {
        setAdding(!adding)
        console.log('changed state')
    }
    return (
        <div className='main_container'>
            <Search addPlant = {addPlant}/>
            <Rooms />
            {adding && <AddPlant />}
        </div>
    )
}