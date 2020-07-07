import React, { Component } from 'react'
import NavBar from '../Components/NavBar';
import { Link, Redirect } from 'react-router-dom';
import { singin, authenticate } from '../auth';
import Swal from 'sweetalert2';
import Hammer from 'hammerjs';


 class SignIn extends Component {


    constructor(){
        super();
        
            this.state = {
                email:"",
                password:"",
                error:"",
                loading:"",
                redirect:false,
                redirectSignUp:false
            }
        
    }

    componentDidMount = ()=>{
        let window = document.querySelector('#div_login');
        //console.log(window);
        let hammer = new Hammer(window);
        hammer.get('swipe').set({direction:Hammer.DIRECTION_LEFT});
        hammer.on('swipe',()=>{
            this.setState({redirectSignUp:true});
            //console.log("swipe");
        })
    }

    handleChange = (name) => (event) =>{
        this.setState({error : ""});
        this.setState({[name] : event.target.value});
    }

    clickSubmit = async event =>{
        event.preventDefault();

        const { email, password} = this.state;
            const user = {

                email,
                password,
                
            };
            console.log(user);
    
            if(email == "" || password == ""){
                this.setState({error:"Los dos campos son necesarios"});     
        }else{
            try {
                const result = await singin(user);
               // console.log(result);
                if(result.error){
                    this.setState({error:result.error});
                }else{
                    authenticate(result,()=>{});
                    Swal.fire({
                        type: 'success',
                        title: 'Correcto',
                        text: 'Bienvenido',
                        timer: 2000
                      });
                   
                     //const resLogin = await singin(user) ;
                   this.setState({redirect:true});
    
                }
                
                
            } catch (error) {
                console.log(error);
                this.setState({error});
            }
        }
        
    }


    render() {

        const { email, password, error, redirect, redirectSignUp } = this.state;

        const styles = {
            input_group : {
                textAlign:"initial"
            }
        }
        if(redirect){
            return(
                <Redirect to={"/"} />
            )
        }
        if(redirectSignUp){
            return(
                <Redirect to={"/Registro"} />
            )
        }

        return (
            <div className="container-fluid" >
            <NavBar />
            <div id="div_login" className="row" style={{marginTop:"25px"}}>
                
                    <div className="col-md-2"></div>
                    <div className="col-md-8 text-center">
                        <h4>Ingresa a la plataforma</h4>
                        <i className="fas fa-sign-in-alt icon_login"></i>
                    <form>
                        <div className="form-group" style={styles.input_group} >
                            
                            <label htmlFor="exampleInputEmail1">Email:</label>
                            <input type="email" onChange={this.handleChange("email")} value={email} className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Ingresa tu email"/>
                            <small id="emailHelp" className="form-text text-muted">Ingresa una direccion de correo valida.</small>
                        </div>
                        <div className="form-group" style={styles.input_group}>
                            <label htmlFor="exampleInputPassword1">Contraseña</label>
                            <input type="password" onChange={this.handleChange("password")} value={password} className="form-control" id="userPass" placeholder="Contraseña" />
                        </div>
                        
                        <button type="submit" onClick={this.clickSubmit} className="btn btn-raised btn-primary">Aceptar</button>
                        <div className="form-group">
                        <small>No tienes cuenta?<Link to={"/Registro"} >Crea una cuenta</Link></small>

                        </div>
                        { error != "" ? (<div className="alert alert-danger" role="alert">
                                            {`error : ${error}`}
                                        </div>):(<></>)}
                        </form>

                    </div>
                    <div className="col-md-2"></div>    
                </div>   
                            
            </div>
        )
    }
}


export default SignIn;