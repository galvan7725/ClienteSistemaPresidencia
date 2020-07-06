import React, { Component } from 'react';
import { Link, useLocation,useHistory } from 'react-router-dom';
import '../App.css';
import $ from 'jquery';
import Hammer from 'hammerjs';
import logo from '../logo.svg';
import { isAuthenticated } from '../auth';

 class SideBar extends Component {

    constructor(){
        super();
        this.state = {
            open:true
        }
    }



    componentDidMount= () =>{
        const { open } = this.state;
        let window = document.querySelector('#sidebar');
        //console.log(window);
        let hammer = new Hammer(window);
        hammer.get('swipe').set({direction:Hammer.DIRECTION_LEFT});
        hammer.on('swipe',()=>{
            $(".wrapper").toggleClass("active")
            //this.setState({redirectLogin:true});
            console.log("swipe");
        });
        $(document).ready(function(){
			$(".hamburger").click(function(){
              $(".wrapper").toggleClass("active");
              
			})
        });

        //let location = useLocation();
        
    }

    handleChange = name => event => {

    }
    

    render() {
        const { status } = this.props;


        let role = isAuthenticated().user.role;
        //console.log(isAuthenticated().user);
        switch (role) {
            case "admin":
                role= "Administrador"
                break;
            case "teacher":
                role= "Docente"
                break;    
            case "user":
                role= "Estudiante"
            break;
           default:
           break;      
            
        }

       //const photo = user.photo ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}` : logo;

        return (
            <>
                 <div className="sidebar_menu" id="sidebar" style={{marginTop:"-9px",zIndex:"99"}}>
                    <div className="inner__sidebar_menu">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="div_avatar col-md-8 text-center" style={{color:"white"}}>
                                <img className="sidebar_avatar" src={`${process.env.REACT_APP_API_URL}/user/photo/${isAuthenticated().user._id}`} onError={i => (i.target.src = `${logo}`)} alt="logo"/>
                                <div className="user_data">
                                    <h6>{isAuthenticated().user.name}</h6>
                                    <p>
                                        {role}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                            
                        </div>
                        <div className="row_sidebar " style={{color:"white"}}>
                            <div className="colum_4 text-center">
                                    <i className="fas fa-book"></i>
                            </div>
                            <div id="link-profile" className="colum_4 text-center">
                                <Link to={`/User/${isAuthenticated().user._id}`} className="fas fa-user"></Link>
                            </div>
                            <div className="colum_4 text-center">
                                <i className="fas fa-power-off"></i>
                            </div>
                        </div>
                        <hr style={{borderTop:"1px dashed white"}} />
                        <ul>
                        <li>
                            <Link to={"/Principal"} id="link_principal" >
                            <span className="icon">
                                <i className="fas fa-home"></i></span>
                            <span className="list">Inicio</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={`/Grupos/${isAuthenticated().user._id}`} id="link_grupos" >
                            <span className="icon"><i className="fas fa-users"></i></span>
                            <span className="list">Grupos</span>
                            </Link>
                        </li>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fas fa-address-book"></i></span>
                            <span className="list">Contact</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fas fa-address-card"></i></span>
                            <span className="list">About</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fab fa-blogger"></i></span>
                            <span className="list">Blogs</span>
                            </a>
                        </li>
                        { isAuthenticated().user.role ==="admin" ? (<>
                            <li>
                            <a href="#">
                            <span className="icon"><i className="fa fa-shield" aria-hidden="true"></i></span>
                            <span className="list">Administrador</span>
                            </a>
                        </li>
                        </>) : (<></>)
                        
                        }
                        </ul>

                        <div className="hamburger">
                            <div className="inner_hamburger">
                                <span className="arrow">
                                    <i className="fas fa-long-arrow-alt-left"></i>
                                    <i className="fas fa-long-arrow-alt-right"></i>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}


export default SideBar;