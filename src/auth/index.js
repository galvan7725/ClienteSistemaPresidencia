

export const singup = (user,userId,token) => {
    
    return  fetch(`${process.env.REACT_APP_API_URL}/signup/${userId}`,{
          method: "POST",
          headers:{
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(user)
      }).then(respnse =>{
          return respnse.json();
      }).catch(err => console.log(err));
  };

  export const singin = (user) => {
    console.log("signin",process.env.REACT_APP_API_URL);
  return  fetch(`${process.env.REACT_APP_API_URL}/singin`,{
          method: "POST",
          headers:{
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
      }).then(response =>{
        console.log(response);
          return response.json();
      }).catch(err => console.log(err));
  };



  export const authenticate = (jwt, next)=>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(jwt));
        next();
    }
};

export const singout = (next) =>{
            //Realizar la consulta
            if(typeof window !== "undefined"){localStorage.removeItem("jwt");}
            next();
            return fetch(`${process.env.REACT_APP_API_URL}/singout`,{
                method: "GET"
            }).then(response => {
                console.log('singout', response);
                return response.json();
            }).catch(err => console.log(err));

};
export const singoutDirect = (next) =>{
    //alert
            //Realizar la consulta
            if(typeof window !== "undefined"){localStorage.removeItem("jwt");}
            next();
            return fetch(`${process.env.REACT_APP_API_URL}/singout`,{
                method: "GET"
            }).then(response => {
                console.log('singout', response);
                return response.json();
            }).catch(err => console.log(err));

    //end alert

};

export const isAuthenticated = () =>{
    if(typeof window == "undefined"){
        return false;
    }

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }
};

export const forgotPassword = email => {
    console.log("email: ", email);
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const socialLogin = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};