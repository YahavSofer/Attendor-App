import React ,{useState} from "react";
import Signup from "./UserAccount/Signup";
import {Container} from 'react-bootstrap'
import { AuthProvider,useAuth} from "../context/AuthContext";
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom'
import UserProfile from "./HomePage/UserProfile";
import Login from './UserAccount/Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './UserAccount/ForgotPassword'
import UpdateProfile from './UserAccount/UpdateProfile'
import UserForm from './UserAccount/UserForm'
import MessageSignUp from './UserAccount/MessageSignUp'
import CreateEvent from './HomePage/Events/CreateEvent'
import Feed from "./HomePage/Feed";
import MayNavBar from "./HomePage/NavigationBar/MayNavBar";

import AccountRoutes from "./AccountRoutes";
import HomePageRoutes from "./HomePageRoutes"

function App() {

  return (
        <Router>
            <AuthProvider>
                  <Switch>         
                       <Route path='/' component={AccountRoutes} />         
                   </Switch>
            </AuthProvider>
        </Router>




  )
}
export default App;