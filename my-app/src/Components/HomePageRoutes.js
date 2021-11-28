import React from 'react'
import {Container} from 'react-bootstrap'
import {useRouteMatch, Switch} from 'react-router-dom'
import Feed from './HomePage/Feed'
import UserProfile from './HomePage/UserProfile'
import MayNavBar from './HomePage/NavigationBar/MayNavBar'
import CreateEvent from './HomePage/Events/CreateEvent'
import UpdateProfile from './UserAccount/UpdateProfile'
import PrivateRoute from './PrivateRoute'
import HomePage from './HomePage/HomePage'

export default function HomePageRoutes(){
    
    const match = useRouteMatch();

    return (
            <div>
            {console.log({match})}
            <MayNavBar/>
            <Container style={{marginTop:'10%'}}>
                    <Switch>
                            <PrivateRoute  exact path={`${match.url}/`} component={HomePage} />
                            <PrivateRoute  exact path={`${match.url}/feed`} component={Feed} />
                            <PrivateRoute  path={`${match.url}/update-profile`} component={UpdateProfile} />
                            <PrivateRoute  path={`${match.url}/profile`} component={UserProfile} />
                            <PrivateRoute  path={`${match.url}/create-event`} component={CreateEvent} /> 
                    </Switch>
            </Container>
            </div>
        )
      }
    

