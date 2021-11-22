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
import MayNavBar from "./HomePage/MayNavBar";


function App() {

  return (
        <Router>
            <AuthProvider>
            <MayNavBar/>  
            <Switch>
                        
            

                        <Container className = 'd-flex align-items-center justify-content-center' style={{minHeight:"100vh"}}  id="noNavBar" >
                            <div className='w-100'>
                                <Route path="/landingPage/login" component={Login} />
                                <Route path="/landingPage/signup" component={Signup} />
                                <Route path="/landingPage/messagesignup" component={MessageSignUp} />
                                <PrivateRoute path="/landingPage/userform" component={UserForm} />
                                <Route path="forgot-password" component={ForgotPassword} />
                            </div>
                        </Container>
                        {/* <Route component={loginPages} />
                        <Route component={DefaultPages} /> */}
                        
                        <Container style={{marginTop:'15%'}} id="yesNavBar">
                            
                                      <PrivateRoute  exact path="/" component={HomePage} />
                                      <PrivateRoute  path="/update-profile" component={UpdateProfile} />
                                      <PrivateRoute  path="/profile" component={UserProfile} />
                                      <PrivateRoute  path="/create-event" component={CreateEvent} />                     
                              
                        </Container>   
                              
            </Switch>
            </AuthProvider>
        </Router>




  )
}
export default App;