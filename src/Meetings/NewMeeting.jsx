import React, {useState,useEffect,Fragment} from 'react';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import { isAuthenticated } from '../auth';
import Swal from 'sweetalert2';



const NewMeeting = ()=>{

    const [isLoading, setisLoading] = useState(false);
    const [meetingData, setmeetingData] = useState({
        date:"",
        description:"",
        persons:[],
        status:"",
        comments:"",
        userId:isAuthenticated().user._id
    })

    useEffect(()=>{

    },[]);

    const handleChange = name => event =>{
        setmeetingData({
            ...meetingData,
            [name]:event.target.value
        })
    }

    const clickSubmit = (event) =>{
        event.preventDefault();

    }
    const styles = {
        input_group : {
            textAlign:"initial"
        }
    }

    const addUser = (e) => {
        e.preventDefault();
        console.log("Add user");
        Swal.fire({
            title: 'Nombre',
            input:'text',
            showCancelButton: true,
            inputValidator:(value) =>{
                if (!value || value.trim().length === 0){
                    return 'Se necesita un nombre valido'
                }else{
                    setmeetingData({
                        ...meetingData,
                        person: meetingData.persons.push(value)
                    })
                }
            }
        })
    }

    const removeUser = (user,e) => {
        e.preventDefault();
        console.log("Remove user",user);
        let aux = meetingData.persons.splice(user,1);
        //aux[user] = undefined;
        setmeetingData({
            ...meetingData,
            person:meetingData.persons = aux

        })
    }


    return (
        <div className="wrapper active">
    
        <NavBar />
    
        <div className="main_body">
    
        <SideBar/>
    
        <div className="container" id="contenedor">
            {isLoading ? (<Fragment>
                            <h3>Cargando...</h3>
                        </Fragment>) : (
                <div className="row">
                    <p>Nueva cita. <i className="fa fa-book"></i></p>
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                    <form >
                    <div className="form-group" style={styles.input_group}>
                        <label htmlFor="mDate">Fecha y hora :</label>
                        <input type="datetime-local" onChange={handleChange("date")} className="form-control" id="mDate"  />
                    </div>
                    <div className="form-group" style={styles.input_group}>
                        <label htmlFor="mDesc">Descripcion : </label>
                        <input type="text" onChange={handleChange("description")} className="form-control" id="mDesc"  />
                    </div>
                    <div className="form-group" style={styles.input_group}>
                        <label>Personas :</label>
                            <div className="container-persons">
                                <div className="cont-users">
                                    {
                                        meetingData.persons.length === 0 ?
                                         <p>Sin personas</p> :
                                          
                                            meetingData.persons.map((person, index) =>(
                                                <div className="row" style={{marginLeft:"auto",marginRight:"0px"}} key={index} >
                                                    <p>{person}</p> <button className="btn btn-raised btn-danger" onClick={(e)=>removeUser(index,e)}><i className="fa fa-trash"></i></button>
                                                </div>
                                            )
                                            )
                                        
                                            
                                    }
                                </div>
                                <div className="cont-r">
                                    <button className="btn btn-raised btn-primary" onClick={addUser}><i className="fa fa-user-plus"></i></button>
                                </div>
                            </div>
                    </div>
                    </form>
                </div>
                <div className="col-md-2">
                </div>
            </div>
            )}
            </div>
        </div>
    </div>
    )
}


export default NewMeeting;