import React, { useState,useEffect } from 'react'
import { getMeetings } from './apiMeetings';
import { isAuthenticated } from '../auth';
import moment from 'moment';
import 'moment/locale/es-us';


const serviceNames = (persons) => (
    <>
    {persons.length === 0 ? (<>
        <small>Sin personas registradas.</small>
    </>): (<>
        {persons.length > 1 ? (<>
        <small>Cita con{" "}{persons[0].name}{" "}y{" "}{persons.length -1 }{" "} personas mas.</small>
        </>) : (<>
            <small>Cita con {persons[0].name}</small>
        </>)} 
    </>)}
    </>
)

const serviceDay = (date) =>{
    if(moment(date).isBetween(moment().startOf('day') , moment().endOf('day'))){
        return(
        <span> El dia de hoy.</span>
        )
    }else{
        return(
            <></>
        )
    }
}

const serviceColor = (date) =>{
    let color = "";

    if(moment(date).isBetween(moment().startOf('day') , moment().endOf('day'))){
        color = "yellow";
    }else if(moment(date).isBefore(moment())){
        color = "gray"
    }else if( moment(date).isAfter(moment())){
        color = "green"
    }
    return color;
}

const renderData = (meeting,index) =>{
  return(
    <div className="container-row" key={index}>
        <div className="row-l">
            <div className="row-l-t">
                <div>
                    <span> {moment(meeting.dateM).format("dddd, MMMM Do")}</span>
                </div>
                <div>
                    <span>({moment(meeting.dateM).fromNow()})</span>
                </div>
            </div>
            <div className="row-l-b">
                <div>
                    <span>{moment(meeting.dateM).format(" h:mm:ss a")}</span>
                </div>
                <div>
                   {serviceDay(meeting.dateM)}
                </div>
            </div>
        </div>
        <div className="row-r" style={{backgroundColor:serviceColor(meeting.dateM)}}>
            <div className="row-r-t">
                {serviceNames(meeting.persons)}
                <p>Asunto :<small>{meeting.description}</small></p>
            </div>
            <div className="row-r-b">
                {meeting.place === "" || meeting.place === undefined ? (<>
                    <small>Sin lugar definido</small>
                </>) : (<>
                    <small>Lugar : {meeting.place}</small>
                </>)}
                {meeting.comments === "" || meeting.comments === undefined ? (<></>) : (<>
                    <small>Comentarios : {meeting.comments}</small>
                </>)}
                <div className="r-b-b">
                    {meeting.status === "pending" ? (<>
                        <small>Status :{" "} pendiente</small>
                        <button className="btn btn-raised btn-success"><i className="fas fa-check "></i></button>   
                    </>) : (<>
                        <small>Status :{" "} realizada</small>
                    </>)}
                </div> 
            </div>
        </div>
        {console.log("Persons",meeting.persons.length)}
    </div>
)}


const MeetingsTable =({date}) =>{

    const [isLoading, setisLoading] = useState(false);
    const [data, setdata] = useState([{persons:[]}]);
    const token = isAuthenticated().token;
    useEffect(() =>{
        moment().locale('es-us');
        moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        const getData = async() =>{
            setisLoading(true);
            const result = await getMeetings(token);
           // console.log(result);
            setdata(result);
            setisLoading(false);

        }
        getData();
    },[]);

    return(
        <div>
            {isLoading ? (<>
                <h3>Cargando...</h3>
            </>) : (<>
                <h2>Proximas citas.</h2>
                {console.log(data)}
                {data.length === 0 ? (<>
                    <h2>Sin citas</h2>
                </>) : (<>
                    <h3>{data.length}citas</h3>
                    <div className="container-m">
                        {data.map((met,index) =>{
                            return(
                            renderData(met,index)
                            )
                        })}
                    </div>
                    
                </>)}
               
            </>)}
            
        </div>
    )
}


export default MeetingsTable;