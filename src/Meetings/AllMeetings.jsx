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


    const handleChange = () => event =>{
        setDate(event.target.value);
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
                    <div className="row text-center">
                        <div className="col-md-3"></div>
                        <div className="col-md-3"><h4>Vista</h4></div>
                        <input type="date" onChange={handleChange()}/>
                        <div className="col-md-3"></div>
                            
                            
                        
                       
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {view === "table" ? (<MeetingsTable date={date}/>) : (<Callendar/>)}
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
        )
    
}

export default AllMeetings;