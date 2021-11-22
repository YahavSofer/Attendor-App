import React, { useState,useEffect} from 'react'
import NavBar from './NavBar'
import { useLocation } from 'react-router';


export default function MayNavBar() {
    const [isNavbarHidden,setIsNavbarHidden] = useState(false)
    const location = useLocation()

   useEffect(() =>{
        const currentRoute = location.pathname
        // console.log(currentRoute)
        const containsLandingPage = currentRoute.includes("landingPage") //reaturn True if the route is before sign in 
        // console.log(containsLandingPage);
        if  (!containsLandingPage) {
          setIsNavbarHidden(true) 
          console.log("IsNavbarHidden is true" )
        }
        else{
            setIsNavbarHidden(false) 
            console.log("IsNavbarHidden is falase" )
        }
    })

    return (
            <>
            {isNavbarHidden ? <NavBar /> :  null }

            </>
    )
}
