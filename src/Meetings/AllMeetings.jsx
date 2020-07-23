import React, { useState, useEffect,Fragment } from 'react';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import Callendar from './Callendar';
import { Link } from 'react-router-dom';
import MeetingsTable from './MeetingsTable';
import { getMeetings } from './apiMeetings';
import { isAuthenticated } from '../auth';

 const AllMeetings = () =>{

    const [isLoading, setisLoading] = useState(false);
    const [data, setdata] = useState({});
    const token = isAuthenticated().token;
    useEffect(() =>{
        const getData = async() =>{
            setisLoading(true);
            const result = await getMeetings(token);
            setdata(result);
            setisLoading(false);

        }
        getData();
    },[]);




    
        return (
            <div className="wrapper active">

            <NavBar />

            <div className="main_body">

            <SideBar/>

            <div className="container" id="contenedor">
                {isLoading ? (<Fragment>
                                <h3>Cargando...</h3>
                            </Fragment>) : (
                    <div className="row">
                    <div className="col-md-4">
                            <h1>Agenda,{JSON.stringify(data)}</h1>
                    </div>
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4">
                        <Link to={`/Agenda/nuevo`} className="btn btn-raised btn-success">Nuevo</Link>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <MeetingsTable />
                        </div>
                    </div>
                </div>
                )}
                </div>
            </div>
        </div>
        )
    
}

export default AllMeetings;