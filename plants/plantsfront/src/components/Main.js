import React from "react";

export default function Main() {
    let [test,setTest] = React.useState([])
    console.log('Main: ')
    async function getData() {
        console.log('sent request')
        fetch('http://127.0.0.1:8000/external_api',
        {
            method: 'POST'
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
    }   
    function internal_data(){
        console.log('Internal data:')
        fetch('http://127.0.0.1:8000/plants')
        .then((response) => response.json())
        .then((data) => console.log(data))
    }
    

    return (
        <div>
            <div>
                Main
                <button onClick={getData}>Get data</button>
                <button onClick={internal_data}>Get internal data</button>
            </div>
            <div>
                .....
            </div>
        </div>
    )
}