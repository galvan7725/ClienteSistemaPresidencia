import React, { Component } from 'react'
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import { isAuthenticated } from '../auth';
import { getUser, updateUser } from './apiUser';
import logo from '../Images/escudo2.png';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';

 class EditProfile extends Component {

    constructor(){
        super();
        this.state = {
            redirect:false,
            name:"",
            email:"",
            error:"",
            fileSize:0,
            loading:false,
            about:"",
            newImage:false,
            phone:"",
            password1:"",
            password2:"",
            photo:"",
        }
    }

    componentDidMount = async () =>{
        this.userData = new FormData();
       // console.log(this.props.match.params.userId);
       this.setState({loading:true});
        const userId = isAuthenticated().user._id;
         await this.init(userId);


    }

    init = async (userId) =>{
        const token = isAuthenticated().token;
         try {
             const result = await getUser(token,userId);
            if(result.error || result === undefined){
                this.setState({loading:false,error:"Error en la consulta"});
            }else{
             const { name, email, role, about, noControl,phone,photo } = result;
             this.setState({name,email,role,about,noControl,phone,photo,loading:false});
             console.log(result);
            }
         } catch (error) {
            this.setState({loading:false,error});
             console.log(error);
             
         }

    }
    handleChange = name => event => {
        this.setState({ error: "" });
        const value = name === "photo" ? event.target.files[0] : event.target.value;
    
        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        if(name === "photo"){
            this.loadFile(event);
        }
        this.userData.set(name, value);
        this.setState({ [name]: value, fileSize });
      };

      loadFile = (event) =>{
        
            var reader = new FileReader();
            reader.onload = function(){
              var output = document.getElementById('output');
              output.src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
            this.setState({newImage:true});
            //this.setState({fileSize:event.target.files[0].size});

          
      }

      clickSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true });
    
        if (this.isValid()) {
          const userId = this.props.match.params.userId;
          const token = isAuthenticated().token;

          Swal.fire({
            title: 'Esta seguro?',
            text: "Sus datos se actualizaran",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0f0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, adelante!'
          }).then(async(result) => {
            if (result.value) {
             //continuar

              try {
                  const result = await updateUser(userId,token,this.userData);
                  if(result.error || !result){
                    Swal.fire(
                        'Error!',
                        result.error,
                        'error'
                      )
                      this.setState({loading:false});
                  }else{
                    Swal.fire({
                        type: 'success',
                        title: 'Sus datos han sido modificados',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      this.setState({redirect:true});
                  }
              } catch (error) {
                  console.log(error);
                  Swal.fire(
                    'Error!',
                    error,
                    'error'
                  )
                  this.setState({loading:false});
              }  

              
            }else{
                //calcel

            }
          })

        }
      };

      isValid = () => {
        const { name, email, fileSize } = this.state;
        if (fileSize > 1000000) {
          this.setState({
            error: "La imagen no debe pesar mas de  100kb",
            loading: false
          });
          return false;
        }
        if (name.length === 0) {
          this.setState({ error: "El nombre es obligatorio", loading: false });
          return false;
        }
        // email@domain.com
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          this.setState({
            error: "Es necesario un email valido",
            loading: false
          });
          return false;
        }
        return true;
      };

      

    render() {
        const { name, email, about , error, redirect, loading, newImage, phone, password1, password2 } = this.state;

        const styles = {
            input_group : {
                textAlign:"initial"
            },
            avatar:{
                width:"50%",
                margin:"auto",
                borderRadius:"50%",
                border:"2px solid aqua",
                marginTop:"5px"
            }
        }
        if(redirect){
            return(
                <Redirect to={`/Usuario/${isAuthenticated().user._id}`} />
            )
        }
        return (
            <div className="wrapper active">

            <NavBar />

            <div className="main_body">

           <SideBar/>

        <div className="container" id="contenedor">
            <div className="row">
            {loading ? (<>
                <h3>Cargando...</h3>
            </>) : (<>
                <div className="col-md-2"></div>
                <div className="col-md-8 text-center">
                    
                <form>
                    <label>Editar Perfil</label>
                    <hr/>
                     {newImage ? (<></>) : (<>
                        <img src={`${process.env.REACT_APP_API_URL}/user/photo/${isAuthenticated().user._id}`} onError={i => (i.target.src = `${logo}`)}  alt="logo" style={styles.avatar}/> 
                     </>)}
                        <hr/>
                    <input name="file" id="file" className="inputfile" type="file" accept="image/*"onChange={this.handleChange("photo")} />
                    <label htmlFor="file">Selecciona una imagen</label>
                        <hr/>
                    {newImage ? (<>
                        <img id="output"style={styles.avatar} alt="logo" />
                    </>) : (<></>)}
                    <div className="form-group" style={styles.input_group}>
                        <label htmlFor="userName">Nombre</label>
                        <input type="text" onChange={this.handleChange("name")} value={name} className="form-control" id="userName" placeholder="Nombre" />
                    </div>
                    <div className="form-group text-center" style={styles.input_group}>
                        <label htmlFor="userEmail">Email:</label>
                        <input type="email" onChange={this.handleChange("email")} value={email} className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Ingresa tu email"/>
                        <small id="emailHelp" className="form-text text-muted">Ingresa una direccion de correo valida.</small>
                    </div>
                    <div className="form-group" style={styles.input_group}>
                        <label htmlFor="userAbout">Acerca de ti:</label>
                        <input type="text" onChange={this.handleChange("about")} value={about} className="form-control" id="userAbout" placeholder="Acerca de..." />
                    </div>
                    <div className="form-group" style={styles.input_group}>
                        <label htmlFor="userAbout">Numero de telefono:</label>
                        <input type="number" min="0" onChange={this.handleChange("phone")} value={phone} className="form-control" id="userNumber" placeholder="No. Telefono" />
                    </div>
                    <div className="form-group" style={styles.input_group}>
                        <label htmlFor="pass1">Contraseña actual:</label>
                        <input type="password" min="0" onChange={this.handleChange("password1")} value={password1} className="form-control" id="pass1" />
                    </div>
                    <div className="form-group" style={styles.input_group}>
                        <label htmlFor="pass2">Nueva Contraseña:</label>
                        <input type="password" onChange={this.handleChange("password2")} value={password2} className="form-control" id="pass2" />
                    </div>
                    
                    <button type="submit" onClick={this.clickSubmit} className="btn btn-raised btn-primary">Aceptar</button>
                    </form>
                    { error !== "" ? (<div className="alert alert-danger" role="alert">
                                        {`error : ${error}`}
                                    </div>):(<></>)}
                </div>
                <div className="col-md-2">

                </div>
            </>)}
            </div>
        </div>
</div>
</div>
        )
    }
}

export default EditProfile;