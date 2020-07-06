import React, { Component } from 'react';
import logo from '../logo.svg';
import escudo from '../Images/escudo2.png';
import { Link } from 'react-router-dom';
import '../App.css';
import { isAuthenticated } from '../auth';

 class NavBar extends Component {
    render() {

        const styles = {
            bg_nav:{
                backgroundColor:"#000"
            },
            label_nav :{
                color:"white"
            },
            img_logo:{
                borderRadius:"50%",
                marginLeft:"2px",
                marginRight:"5px"
            }
        }

        return (
            <>
              <nav className="navbar fixed-top navbar-expand-lg navbar-light" style={styles.bg_nav}>
              <Link to={`/Home`} className="navbar-brand separador_nav" style={styles.label_nav}>
                    S. Santiago
                    <img src={escudo} style={styles.img_logo} width="30" height="30" className="d-inline-block align-top" alt="logo"/>
                </Link>
                        
                            <ul className="navbar-nav mr-auto" style={{flexDirection:"row"}}>
                            
                            {!isAuthenticated() && (<>
                                <li className="nav-item separador_nav">
                                <Link className="nav-link link_nav" to={"/Acceso"}><span className="span_nav" >Acceso</span><i className="fas fa-sign-in-alt icon_nav"></i></Link>
                            </li>
                            </>)}
                        
                            
                            </ul>

                            <Link className="nav-link link_nav" to={"/Acceso"}><span className="span_nav" ></span><i className="fas fa-sign-in-alt icon_nav"></i></Link>

                            
                        
                        </nav>  
                                    </>
        )
    }
}


export default NavBar;