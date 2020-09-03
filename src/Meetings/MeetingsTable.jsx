import React, { useState,useEffect } from 'react'
import { getMeetings,meetingSetDone, meetingSePending, meetingSeCancel, getMeetingsByDate } from './apiMeetings';
import { isAuthenticated } from '../auth';
import moment from 'moment';
import 'moment/locale/es-us';
import Swal from 'sweetalert2';



   



const MeetingsTable =({date, range}) =>{
    console.log(date)
    const [isLoading, setisLoading] = useState(false);
    const [data, setdata] = useState([{persons:[]}]);
    const [refresh, setRefresh] = useState(false);
    const token = isAuthenticated().token;

    useEffect(() =>{
        moment().locale('es-us');
        moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        const getData = async() =>{
            setisLoading(true)
            const result = await getMeetingsByDate(token,date,range);
           // console.log(result);
            setdata(result);
            setisLoading(false);
        }
        getData();
    },[date,range]);

    useEffect(() =>{
        const getData = async() =>{
            setisLoading(true)
            const result = await getMeetingsByDate(token,date,range);
           // console.log(result);
            setdata(result);
            setisLoading(false);
        }
        getData();
    },[refresh]);

   
    const confirmationDialog = (message,type)=>{
        Swal.fire({
            type:type,
            title:"Informacion",
            text:message
        })
      
      }
      
      const changeSatusM = async(topic,meetingId) =>{
          
          try {
              switch (topic) {
                  case "done":
                      setisLoading(true);
                      const result = await meetingSetDone(token,meetingId);
                          if(result.error || result === undefined){
                              console.error("Error put meeting");
                              confirmationDialog("No se pudo completar la accion","error");

                              setisLoading(false);
                          }else{
                              console.log("Result:", result);
                              confirmationDialog("Modificacion exitosa","success");
                            //setdata(result);
                            refresh ? setRefresh(false) : setRefresh(true);
                              setisLoading(false);
                          }
                      break;
                      case "pending":
                      setisLoading(true);
                      const res2 = await meetingSePending(token,meetingId);
                          if(res2.error || res2 === undefined){
                              console.error("Error put meeting");
                              confirmationDialog("No se pudo completar la accion","error");

                              setisLoading(false);
                          }else{
                              console.log("Result:", res2);
                              confirmationDialog("Modificacion exitosa","success");
                              //setdata(res2);
                              refresh ? setRefresh(false) : setRefresh(true);
                              setisLoading(false);
                          }
                      break;
                      case "cancel":
                      setisLoading(true);
                      const res3 = await meetingSeCancel(token,meetingId);
                          if(res3.error || res3 === undefined){
                              console.error("Error put meeting");
                              confirmationDialog("No se pudo completar la accion","error");

                              setisLoading(false);
                          }else{
                              console.log("Result:", res3);
                              confirmationDialog("Modificacion exitosa","success");
                              //setdata(res3);
                              refresh ? setRefresh(false) : setRefresh(true);
                              setisLoading(false);
                          }
                      break;
              
                  default:
                      break;
              }
      
              
      
          } catch (error) {
              console.error(error);
          }
      
      }
      
       const servicePopupNames = per =>{
          let aux = "";
          console.log("Persons",per);
          for (let index = 1; index < per.length; index++) {
              if(index+1 === per.length){
                  aux += per[index].name+".";
              }else{
              aux += per[index].name+", ";
              }
          }
          
          Swal.fire({
              type:"info",
              title:'Personas',
              text:aux
          })
          
      }
      
      
       const serviceNames = (persons) => (
          <>
          {persons.length === 0 ? (<>
              <small>Sin personas registradas.</small>
          </>): (<>
              {persons.length > 1 ? (<>
              <span>Cita con{" "}{persons[0].name}{" "}y{" "}<small onClick={()=>servicePopupNames(persons)} >{persons.length -1 }{" "} personas mas.</small> </span>
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
          }else if(moment(date).isBefore(moment())){
              return(
                  <span>{moment(date).fromNow()}</span>
              )
          }
      }
      
       const serviceColor = (date,status) =>{
          let color = "";
          if(status === "cancel"){
            color ="lightgray"
          }else if(status === "done"){
              color = "#72b95b"
          } else if(moment(date).isBetween(moment().startOf('day') , moment().endOf('day'))){
              color = "#ffff6d";
          }else if(moment(date).isBefore(moment())){
              color = "#ff7777"
          }else if( moment(date).isAfter(moment())){
              color = "#8ad2d4"
          }
          return color;
      }
      
      const renderData = (meeting,index) =>{
          return(
            <div className="container-row" key={index} style={{backgroundColor:serviceColor(meeting.dateM,meeting.status)}}>
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
                <div className="row-r" >
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

                            {meeting.status === "cancel" ? (<>
                                <small>Status :{" "} Cancelada</small>
                                <button className="btn btn-raised btn-success" onClick={()=>changeSatusM("pending",meeting._id)}><i className="fas fa-plus "></i></button>
                            </>) : (<>
                                {meeting.status === "pending" ? (<>
                                <small>Status :{" "} pendiente</small>
                                <button className="btn btn-raised btn-success " onClick={()=>changeSatusM("done",meeting._id)}><i className="fas fa-check "></i></button>   
                                <button className="btn btn-raised " onClick={()=>changeSatusM("cancel",meeting._id)} style={{marginLeft:"auto",backgroundColor:"black",color:"white"}}><i className="fas fa-trash" ></i></button>   
                                        </>) : (<>
                                <small>Status :{" "} realizada</small>
                                <button className="btn btn-raised btn-warning " onClick={()=>changeSatusM("pending",meeting._id)}><i className="fas fa-history "></i></button>   
                                    </>)}
                            </>)}

                            
                        </div> 
                    </div>
                </div>
                {console.log("Persons",meeting.persons.length)}
            </div>
          )
      }

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