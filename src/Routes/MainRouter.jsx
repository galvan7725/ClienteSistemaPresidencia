import React from 'react';
import {Route , Switch} from 'react-router-dom';
import PrivateRoute from '../auth/PrivateRoute';
import SignUp from '../User/SignUp';
import SignIn from '../User/SignIn';
import Home from '../Views/Home';
import AllUsers from '../User/AllUsers';
import NewUser from '../User/NewUser';
import Profile from '../User/Profile';
import EditProfile from '../User/EditProfile';
import AllMeetings from '../Meetings/AllMeetings';
import NewMeeting from '../Meetings/NewMeeting';

const MainRouter = () =>(
    <div>
        <Switch>
            <Route exact path="/Acceso" component={SignIn}></Route>
            <PrivateRoute exact path="/Registro" component={SignUp}></PrivateRoute>
            <PrivateRoute exact path="/" component={Home}></PrivateRoute>
            <PrivateRoute exact path="/Usuarios/" component={AllUsers}></PrivateRoute>
            <PrivateRoute exact path="/Usuario/Nuevo" component={NewUser}></PrivateRoute>
            <PrivateRoute exact path="/Usuario/:userId" component={Profile}></PrivateRoute>
            <PrivateRoute exact path="/Usuario/Editar/:userId" component={EditProfile}></PrivateRoute>
            <PrivateRoute exact path="/Agenda/" component={AllMeetings}></PrivateRoute>
            <PrivateRoute exact path="/Agenda/nuevo" component={NewMeeting} ></PrivateRoute>

        </Switch>
    </div>
)
    
export default MainRouter;


