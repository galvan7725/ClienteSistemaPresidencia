import {React} from 'react';
import moment from 'moment';
import 'moment/locale/es-us';
import Swal from 'sweetalert2';


export const servicePopupNames = per =>{
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


export const serviceNames = (persons) => (
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

 export const serviceDay = (date) =>{
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

export const serviceColor = (date,status) =>{
    let color = "";
    if(status === "done"){
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



