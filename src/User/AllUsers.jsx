import React, { Component } from 'react';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import '../App.css';
import { isAuthenticated } from '../auth';
import { allUsers } from './apiUser';
import logo from '../logo.svg';

class AllUsers extends Component {

    constructor(){
        super();
        this.state = {
            redirect:false,
            error:"",
            users:[]
            
        }
    }

    componentDidMount = async () =>{
        const token = isAuthenticated().token;
        const userId = isAuthenticated().user._id;

        try {
            const result = await allUsers(token,userId);
            console.log("Result",result);
            this.setState({users:result});
        } catch (error) {
            console.log(error);
        }
    }

    getBackgroundColor = (active) =>{
       if(active === "true"){
            return "lightgreen"
       }else{
            return "lightcoral"
       }
    }


    render() {
        const { users } = this.state;


        return (
            <div className="wrapper active">

            <NavBar />

            <div className="main_body">

            <SideBar/>

            <div className="container" id="contenedor">
                <div className="row">
                    <div className="col-md-4">
                        <h4>Usuarios.</h4>
                    </div>
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-raised btn-success"><i className="fa fa-user-plus"></i>Agregar</button>
                    </div>
                </div>
                <div className="row">
                    <h5>Todos los usuarios</h5>

                    <div className="col-md-12">
                        {
                            users.map((user,i) =>(
                                <div className="row" key={i}>
                                    <div className="user-container" style={{backgroundColor:this.getBackgroundColor(user.active)}}>
                                        <div className="user-image">
                                            <img src={logo} alt="logo"/>
                                        </div>
                                        <div className="user-information">
                                            <p>{user.name}</p>
                                            <small>{user.email}</small>
                                            <div className="information-footer">
                                             <strong>Creado:{user.created}</strong>
                                                <i className="icon-t"></i>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            </div>
        </div>
        )
    }
}

export default AllUsers;