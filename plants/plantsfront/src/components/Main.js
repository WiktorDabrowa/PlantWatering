import React from "react";

export default function Main() {
    let [test,setTest] = React.useState([])
    let [query,setQuery] = React.useState([])
    console.log('Main: ')
    console.log(query[0])
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
    function search(event){
        // Wyszukiwanie: 
            // gdy input.length === 3 v 4 v 5 
            //      -> wyslij zapytanie do serwera
            //      -> response = array możliwych opcji
            //      -> response do state
            // gdy input.lenght > 3 v 4 v 5
            //      -> przeszukaj response 
            // response.lenght = {3=>100,4=>35}
        if (event.target.value.length < 3) {
            // Do nothing
        }
        else if ( event.target.value.length === 3) {
            // Freeze until response???
            console.log(event.target.value)
            // Send request to server and save data
            let data = new FormData()
            data.append('json', JSON.stringify({data: event.target.value}))
            fetch('http://127.0.0.1:8000/external_api',{
                method: 'POST',
                body: data,
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data)
                setQuery(data.data)
            })
        } else {
            console.log('wiecej niz 4')
            query.filter(
                // Common name
                // Other name
                // Scientific name
            ) 
            
        }
    }
    

    return (
        <div>
            <div>
                Main
                <input className='search' placeholder="Look for your plant..." onKeyUp={search}></input>
            </div>
            <div>
                .....
            </div>
        </div>
    )
}