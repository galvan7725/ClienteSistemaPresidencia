import React, { Component } from 'react';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import '../App.css';


 class Home extends Component {

    render() {
        return (
            <div className="wrapper active">

            <NavBar />

            <div className="main_body">

            <SideBar/>

            <div className="container" id="contenedor">
                <div className="row">
                    <div className="col-md-4">
                        <h1>c1</h1>
                    </div>
                    <div className="col-md-4">
                        <h1>c2</h1>
                    </div>
                    <div className="col-md-4">
                        <h1>c3</h1>
                    </div>
                </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Home;