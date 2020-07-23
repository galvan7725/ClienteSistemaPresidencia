import React, {useState,useEffect,Fragment} from 'react';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import { isAuthenticated } from '../auth';

const NewMeeting = ()=>{

    const [isLoading, setisLoading] = useState(false);
    const [meetingData, setmeetingData] = useState({
        date:"",
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
                    <p>Nueva cita.</p>
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                    <form >
                    <div className="form-group" style={styles.input_group}>
                        <label htmlFor="userName">Fecha y hora</label>
                        <input type="datetime-local" onChange={handleChange("date")} className="form-control" id="mDate"  />
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