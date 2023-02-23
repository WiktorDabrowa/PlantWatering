import React from "react";
import Search from './Search'

export default function Main() {
    let [test,setTest] = React.useState([])
    function internal_data(){
        console.log('Internal data:')
        fetch('http://127.0.0.1:8000/plants')
        .then((response) => response.json())
        .then((data) => console.log(data))
    }
    // Transfer to Seperate Component:
    

    return (
        <div>
            <div>
                Main
            </div>
            <div>
                <Search />
            </div>
        </div>
    )
}