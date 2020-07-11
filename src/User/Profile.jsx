import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import {isAuthenticated} from '../auth';
import { getUser } from './apiUser';
import moment from 'moment';
import 'moment/locale/es-us';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import logo from '../Images/escudo2.png';

 class Profile extends Component {

    constructor(){
        super();
        this.state = {
            user:{},
            loading:false,
            error:""
        }
    }

    componentDidMount = async () =>{
        const userId = this.props.match.params.userId;
        //console.log(userId);
        this.setState({loading:true});
        moment().locale('es-us');
        moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
         await this.init(userId);
    }

    init = async (userId) =>{
        const token = isAuthenticated().token;

        try {
            const result = await getUser(token,userId);
            if(result.error){
                this.setState({error:result.error,loading:false});
            }else{
                this.setState({user:result,loading:false});

                //console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    getStatus = (status) =>{
        if(status === "true"){
            return (<h6 style={{color:"lightgreen"}}>Activo</h6>)
        }else{
            return (<h6 style={{color:"red"}}>Inactivo</h6>)
        }
    }


    render() {

        const { user, loading } = this.state;

        return (
            <div className="wrapper active">

            <NavBar />

            <div className="main_body">

            <SideBar/>

            <div className="container" id="contenedor">
                    <div className="row">
                        { loading ? (<>
                            <h4>Cargando...</h4>
                        </>) : (<>
                            <div className="container-fluid emp-profile">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src={`${process.env.REACT_APP_API_URL}/user/photo/${isAuthenticated().user._id}`} onError={i => (i.target.src = `${logo}`)} alt="logo"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h5>
                                        {user.name}
                                    </h5>
                                    
                                        {this.getStatus(user.active)}
                                    
                                <p className="proile-rating">Creado :{moment(user.created).format("dddd, MMMM Do YYYY, h:mm:ss a")}{". "}({moment(user.created).fromNow()})</p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Informacion</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2">
                        {user._id === isAuthenticated().user._id ? (<>
                            <Link to={`/Usuario/Editar/${isAuthenticated().user._id}`}  className="btn btn-raised btn-success">Editar Perfil <i className="fa fa-pencil"></i> </Link>
                        </>) : (<></>)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">
                            <p>Acciones</p>
                            <a href="">Website Link</a><br/>
                            <a href="">Bootsnipp Profile</a><br/>
                            <a href="">Bootply Profile</a>
                            
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Nombre:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Correo:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Telefono</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>123 456 7890</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Cargo:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.role}</p>
                                            </div>
                                        </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Experience</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Hourly Rate</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>10$/hr</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Total Projects</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>230</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>English Level</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Availability</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>6 months</p>
                                            </div>
                                        </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Your Bio</label><br/>
                                        <p>Your detail description</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
        </div>
                        </>)}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Profile;