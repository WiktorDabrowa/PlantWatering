import React from "react";
import Search from './Search'
import Rooms from './Rooms'

export default function Main() {
    return (
        <div className='main_container'>
            <Search />
            <Rooms />
        </div>
    )
}