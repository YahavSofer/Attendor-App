import React ,{useState} from "react";
import Signup from "./Signup";
import {Container} from 'react-bootstrap'
import { AuthProvider,useAuth} from "../context/AuthContext";
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom'
import UserProfile from "./UserProfile";
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import UserForm from './UserForm'
import MessageSignUp from './MessageSignUp'
import CreateEvent from './CreateEvent'
import HomePage from "./HomePage/HomePage";
import NavBar from "./HomePage/NavBar";

function App() {
  return (
        <Router>
            <AuthProvider>
                     
                <Switch>
                {/* <NavBar/> */}
                    <PrivateRoute  exact path="/" component={HomePage} />
                    <PrivateRoute  path="/update-profile" component={UpdateProfile} />
                    <PrivateRoute  path="/profile" component={UserProfile} />
                    <PrivateRoute  path="/create-event" component={CreateEvent} />                     

                <Container className = 'd-flex align-items-center justify-content-center' style={{minHeight:"100vh"}} >   {/**/}
                    <div className='w-100'>
                        <Route path="/signup" component={Signup} />
                        <Route path="/messagesignup" component={MessageSignUp} />
                        <PrivateRoute path="/userform" component={UserForm} />
                        <Route path="/login" component={Login} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                    </div>
                  </Container>




                </Switch>
                        
            </AuthProvider>
        </Router>
  )
}
export default App;