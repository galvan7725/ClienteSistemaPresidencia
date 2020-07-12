import React, { Component } from 'react';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import Callendar from './Callendar';

 class AllMeetings extends Component {
    render() {
        return (
            <div className="wrapper active">

            <NavBar />

            <div className="main_body">

            <SideBar/>

            <div className="container" id="contenedor">
                <div className="row">
                    <div className="col-md-4">
                        <h1>Meetings</h1>
                    </div>
                    <div className="col-md-4">
                        <h1>c2</h1>
                    </div>
                    <div className="col-md-4">
                        <h1>c3</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                        <Callendar />
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        )
    }
}

export default AllMeetings;