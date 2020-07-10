import React, { Component } from 'react';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import '../App.css';
import { isAuthenticated } from '../auth';
import { allUsers,deleteUser,enableUser } from './apiUser';
import logo from '../logo.svg';
import moment from 'moment';
import 'moment/locale/es-us';
import Swal from 'sweetalert2';
import { Link,Redirect } from 'react-router-dom';

class AllUsers extends Component {

    constructor(){
        super();
        this.state = {
            redirect:false,
            error:"",
            users:[],
            loading:false
            
        }
    }

    componentDidMount = async() =>{
        this.setState({ loading:true});
        moment().locale('es-us');
        moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        if(!isAuthenticated().user.role === "admin"){
            this.setState({ redirect:true});
        }
        await this.init();

    }

    init = async()=>{
        const token = isAuthenticated().token;
        const userId = isAuthenticated().user._id;

        try {
            const result = await allUsers(token,userId);
            console.log("Result",result);
            this.setState({users:result,loading:false});
        } catch (error) {
            console.log(error);
            this.setState({error:"Error en la consulta",loading:false});
        }
    }

    getBackgroundColor = (active) =>{
       if(active === "true"){
            return "lightgreen"
       }else{
            return "lightcoral"
       }
    }

    enableUser = async(userId) =>{
        const token = isAuthenticated().token;
        const adminId = isAuthenticated().user._id;
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-raised btn-success',
              cancelButton: 'btn btn-raised btn-danger'
            },
            buttonsStyling: true,
          });
    
          swalWithBootstrapButtons.fire({
            title: 'Continuar?',
            text: "Se activara usuario",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, continuar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          }).then(async(result) => {
            if (result.value) {
                //Realizar la consulta
                try {
                    const result = await enableUser(userId,token,adminId);
                    console.log("Result",result);
                    if(result.error || result === undefined){
                        Swal.fire({
                            type: 'error',
                            title:"Error",
                            text:"No se pudo dar de baja al usuario"
                        });
                        this.setState({loading:false});
                    }else{
                        Swal.fire({
                            type: 'success',
                            title:"Correcto",
                            text:"Se dio de baja al usuario"
                        });
                        this.setState({loading:false});
                       await this.init();
                    }
                } catch (error) {
                    console.log(error);
                }
    
            } else if (
              // Read more about handling dismissals
              result.dismiss === Swal.DismissReason.cancel
            ) {
              console.log("cancel alert");
              
            }
          })  
          
    
        //end alert
    }

    deleteUser = async(userId) => {
        //e.preventDefault();
        console.log(userId);
        const token = isAuthenticated().token;
        const adminId = isAuthenticated().user._id;
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-raised btn-success',
              cancelButton: 'btn btn-raised btn-danger'
            },
            buttonsStyling: true,
          });
    
          swalWithBootstrapButtons.fire({
            title: 'Continuar?',
            text: "Se dara de baja al usuario",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, continuar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          }).then(async(result) => {
            if (result.value) {
                //Realizar la consulta
                try {
                    this.setState({loading:true});
                    const result = await deleteUser(userId,token,adminId);
                    if(result.error || result === undefined){
                        Swal.fire({
                            type: 'error',
                            title:"Error",
                            text:"No se pudo dar de baja al usuario"
                        });
                        this.setState({loading:false});
                    }else{
                        Swal.fire({
                            type: 'success',
                            title:"Correcto",
                            text:"Se dio de baja al usuario"
                        });
                        this.setState({loading:false});
                       await this.init();
                    }
                    console.log("Result",result);
                } catch (error) {
                    console.log(error);
                }
    
            } else if (
              // Read more about handling dismissals
              result.dismiss === Swal.DismissReason.cancel
            ) {
              console.log("cancel alert");
              
            }
          })  
          
    
        //end alert
    }

    isActive = (st,userId) => {
        if(st === "true"){
            return (<>
            <button className="btn btn-raised" onClick={()=>this.deleteUser(userId)}>
             <i className="icon-t fa fa-trash" style={{color:"red"}}> </i>
            </button>
            
            </>)
        }else{
            return (<>
            <button className="btn btn-raised" onClick={()=>this.enableUser(userId)}>
                <i className="icon-t fa fa-user-plus" style={{color:"white"}}></i>
            </button>    
            </>)
        }
    }


    render() {
        const { users,loading,redirect } = this.state;

        if(redirect){
            return (<Redirect to={`/`}/>)
        }

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
                        <Link to={`/Usuario/Nuevo`} className="btn btn-raised btn-success"><i className="fa fa-user-plus"></i>Agregar</Link>
                    </div>
                </div>
                <div className="row">
                    <h5>Todos los usuarios</h5>

                    {
                        loading ? (<>
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        </>) : (<>
                            <div className="col-md-12" style={{maxHeight:"550px",overflow:"auto"}}>
                        {
                            users.map((user,i) =>(
                                <div className="row" key={i} >
                                    <div className="user-container" style={{backgroundColor:this.getBackgroundColor(user.active)}}>
                                        <div className="user-image">
                                            <img src={logo} alt="logo"/>
                                        </div>
                                        <div className="user-information">
                                                <p>{user.name}{user._id === isAuthenticated().user._id ? "(Usted)" : ""}</p>
                                            <small>{user.email}</small>
                                            <div className="information-footer">
                                             <strong>Creado:{moment(user.created).format("dddd, MMMM Do YYYY, h:mm:ss a")}{". "}({moment(user.created).fromNow()})</strong>
                                                {
                                                    
                                                    this.isActive(user.active,user._id)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                        </>)
                    }
                </div>
            </div>
            </div>
        </div>
        )
    }
}

export default AllUsers;