import React from 'react'
import {Container} from 'react-bootstrap'
import {useRouteMatch, Switch} from 'react-router-dom'
import Feed from './HomePage/Feed/Feed'
import UserProfile from './HomePage/UserProfile'
import MayNavBar from './HomePage/NavigationBar/MayNavBar'
import CreateEvent from './HomePage/Events/CreateEvent'
import UpdatePassword from './UserAccount/UpdatePassword'
import PrivateRoute from './PrivateRoute'
import HomePage from './HomePage/HomePage'
import UserRcommendations from './HomePage/Recommendations/UserRcommendations'
import UpdateEvent from './HomePage/Events/UpdateEvent'
// import UpcominEvents from './FilterdEvents/UpcomingEvents'
// import LikedEvents from './FilterdEvents/LikedEvents'

export default function HomePageRoutes(){

    const match = useRouteMatch();

    return (
            <div>
            {/* {console.log({match})} */}
            <div style={{marginBottom:'12%'}}>
            <MayNavBar/>
            </div>
            <Container  >
                    <Switch>
                            <PrivateRoute  exact path={`${match.url}/`} component={HomePage} />
                            <PrivateRoute  exact path={`${match.url}/feed`} component={Feed} />
                            <PrivateRoute  path={`${match.url}/user-rcommendations`} component={UserRcommendations} />
                            <PrivateRoute  path={`${match.url}/update-password`} component={UpdatePassword} />
                            <PrivateRoute  path={`${match.url}/profile`} component={UserProfile} />
                            <PrivateRoute  path={`${match.url}/create-event`} component={CreateEvent} /> 
                            <PrivateRoute  path={`${match.url}/update-event`} component={UpdateEvent} /> 
                            {/* <PrivateRoute  path={`${match.url}/liked-events`} component={LikedEvents} /> 
                            <PrivateRoute  path={`${match.url}/upcoming-events`} component={UpcominEvents} />  */}

                    </Switch>
            </Container>
            </div>
        )
      }
    

