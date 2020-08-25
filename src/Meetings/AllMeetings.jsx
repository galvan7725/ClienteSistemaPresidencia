import React, { useState, useEffect,Fragment } from 'react';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import Callendar from './Callendar';
import { Link } from 'react-router-dom';
import MeetingsTable from './MeetingsTable';
import moment from 'moment';
import 'moment/locale/es-us';


 const AllMeetings = () =>{
    const [view, setView] = useState("table");
    const [date, setDate] = useState(moment().toDate());
    const [range, setRange] = useState("week")


    const handleChange = () => event =>{
        setDate(event.target.value);
    }
    const handleChangeRange = () => event =>{
        console.log(event.target.value);
        setRange(event.target.value);
    }

        return (
            <div className="wrapper active">

            <NavBar />

            <div className="main_body">

            <SideBar/>

            <div className="container" id="contenedor">

                    <div className="row">
                    <div className="col-md-4">
                            <p>Agenda</p>
                    </div>
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4">
                        <Link to={`/Agenda/nuevo`} className="btn btn-raised btn-success">Nuevo</Link>
                    </div>
                    </div>
                    <div className="meeting-options">
                            <span>Fecha :</span>
                            <input type="date" style={{paddingTop:"0px"}} onChange={handleChange()}/>
                            <span>Rango:</span>
                            <select name="range" id="range" onChange={handleChangeRange()}>
                                <option value="day">Dia</option>
                                <option value="week" selected="selected">Semana</option>
                                <option value="month">Mes</option>
                            </select>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {view === "table" ? (<MeetingsTable date={date} range={range}/>) : (<Callendar/>)}
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
        )
    
}

export default AllMeetings;