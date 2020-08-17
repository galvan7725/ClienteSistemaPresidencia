export const getMeetings = (token) =>{
    //const userId = isAuthenticated().user._id;
    return fetch(`${process.env.REACT_APP_API_URL}/meetings/all`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    }).catch(error => console.log(error));
 };
 export const newMeeting = (meeting,token) => {
    
    return  fetch(`${process.env.REACT_APP_API_URL}/meetings/new`,{
          method: "POST",
          headers:{
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(meeting)
      }).then(respnse =>{
          return respnse.json();
      }).catch(err => console.log(err));
  };