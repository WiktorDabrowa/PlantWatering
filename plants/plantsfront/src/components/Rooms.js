import React from "react";
import Plant from "./Plant";


export default function Rooms() {

    const [rooms,setRooms] = React.useState([])
    const [plants,setPlants] = React.useState([])
    const [seed,setSeed] = React.useState(true)
    function reload(){
        console.log('Reloading Component')
        setSeed(!seed)
    }

    console.log(plants)
    console.log(rooms)
    React.useEffect(() => {
            fetch('http://127.0.0.1:8000/rooms')
            .then((response) => response.json())
            .then((data) => setRooms(data))
            fetch('http://127.0.0.1:8000/plants')
            .then((response) => response.json())
            .then((data) => setPlants(data))
        },[seed]
    )
    function toggleShow(id){
        let container = document.querySelector(`#room_container_${id}`)
        container.classList.toggle('not_shown') 
    }
    const containers = rooms.map((room) => {
        let room_plants = plants.map((plant) => {
            if (plant.localization === room.id) {
                return (
                    <Plant plant={plant} key={plant.id} reload={() => reload()}/>
                )
            }
        })
        return (
            <div className='room_container' key={room.id} id={`room_container_${room.id}`}>
                <h2 onClick={() => toggleShow(room.id)}>{room.name}</h2>
                <button className='hide_btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </button>
                <div className='room_plants'> 
                    {room_plants}
                </div>
            </div>
        )
    })

    return (
        <div className='rooms'>
            {containers}
        </div>
    )

}