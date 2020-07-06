import React, { Component } from 'react'
import NavBar from '../Components/NavBar';
import validator from "validator";
import Swal from 'sweetalert2';
import { singup, singin , authenticate } from '../auth';
import { Redirect } from 'react-router-dom';
import Hammer from 'hammerjs';


 class SignUp extends Component {


    constructor(){
        super();
        this.state = {
            name:"",
            email:"",
            password1:"",
            password2:"",
            error:"",
            loading:"",
            redirect:false,
            redirectLogin:false
        }
    }

    componentDidMount = ()=>{
        let window = document.querySelector('#div_registro');
        //console.log(window);
        let hammer = new Hammer(window);
        hammer.get('swipe').set({direction:Hammer.DIRECTION_RIGHT});
        hammer.on('swipe',()=>{
            this.setState({redirectLogin:true});
            //console.log("swipe");
        })
    }

    handleChange = (name) => (event) =>{
        this.setState({error : ""});
        this.setState({[name] : event.target.value});
    }

    isValid = (user)=>{

        const { name, email , password } = user;
        if(validator.isEmpty(name.trim())){
            this.setState({error:"Se necesita un nombre valido"});
            return false;
        }
        if(!validator.isEmail(email)){
            this.setState({error:"Se necesita un email valido"});
            return false;
        }
        if(!validator.isLength(password.trim(),{min:6,max:255})){
            this.setState({error:"La contraseña debe contener almenos 6 caracteres"});
            return false;
        }

        return true;
    }

    clickSubmit = async event =>{
        event.preventDefault();

        const {name, email, password1,password2} = this.state;
        if(password1 == password2){
            const user = {
                name,
                email,
                password:password1,
                role:'admin'
            };
    
            if(this.isValid(user)){

                try {
                    const result = await singup(user);
                    if(result.error){
                        this.setState({error:result.error});
                    }else{
                        const user2 = { email, password:password1} ;


                        const resLogin = await singin(user2) ;
                        authenticate(resLogin,()=>{});
                        Swal.fire({
                            type: 'success',
                            title: 'Correcto',
                            icon:'success',
                            text: 'Bienvenido',
                            timer: 2000
                          });
                       
                         //const resLogin = await singin(user) ;
                       this.setState({redirect:true});
        
                    }
                    
                    
                    this.setState({redirect:true});

                } catch (error) {
                    console.log(error);
                }

             
            }else{

            }
        }else{
            this.setState({error:"La contraseña no coincide"});

        }
        
    }




    render() {

        const { name, email, password1, password2 , error, redirect,redirectLogin} =  this.state;

        const styles = {
            input_group : {
                textAlign:"initial"
            }
        }
        if(redirect){
            return(
                <Redirect to={"/Principal"} />
            )
        }
        if(redirectLogin){
            return(
                <Redirect to={"/Acceso"} />
            )
        }

        return (
            <>
            <div className="container-fluid">
                <NavBar />
                <div id="div_registro" className="row" style={{marginTop:"25px"}}>
                <div className="col-md-2"></div>
                    <div className="col-md-8 text-center">
                        <h4>Nuevo Registro</h4>
                        <i className="fas fa-user-plus icon_login"></i>
                    <form>
                        <div className="form-group" style={styles.input_group}>

                        <div className="form-group" style={styles.input_group}>
                            <label htmlFor="exampleInputPassword1">Nombre</label>
                            <input type="text" onChange={this.handleChange("name")} value={name} className="form-control" id="userName" placeholder="Nombre" />
                        </div>
                            
                            <label htmlFor="exampleInputEmail1">Email:</label>
                            <input type="email" onChange={this.handleChange("email")} value={email} className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Ingresa tu email"/>
                            <small id="emailHelp" className="form-text text-muted">Ingresa una direccion de correo valida.</small>
                        </div>
                        <div className="form-group" style={styles.input_group}>
                            <label htmlFor="exampleInputPassword1">Contraseña</label>
                            <input type="password" onChange={this.handleChange("password1")} value={password1} className="form-control" id="pass1" placeholder="Contraseña" />
                        </div>
                        <div className="form-group" style={styles.input_group}>
                            <label htmlFor="exampleInputPassword1">Repite la ontraseña</label>
                            <input type="password" onChange={this.handleChange("password2")} value={password2} className="form-control" id="pass2" placeholder="Contraseña" />
                        </div>
                        
                        <button type="submit" onClick={this.clickSubmit} className="btn btn-raised btn-primary">Aceptar</button>
                        </form>
                        { error != "" ? (<div className="alert alert-danger" role="alert">
                                            {`error : ${error}`}
                                        </div>):(<></>)}

                    </div>
                    <div className="col-md-2"></div>    
                </div>    
            </div>                
            </>
        )
    }
}

export default SignUp;
