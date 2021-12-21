import React ,{useEffect,useState} from 'react'
import { Container } from 'react-bootstrap'
import Event from '../Events/Event'
import {db,storage} from '../../../firebaseConfig'
import {getDocs,collection,limit,startAfter,doc} from "firebase/firestore"
import Button from '@mui/material/Button'
import { Link } from "react-router-dom"
import UndoIcon from '@mui/icons-material/Undo';



export default function Feed() {
    const [eventsData, setEventData] = useState([]);


    useEffect(() => {
      // onload - get all events from firestore

      const getEvents = async () => {
        const AllEvents = await getDocs(collection(db,'Events'))
        .then(function(querySnapshot) {
          return querySnapshot.docs.map(doc => Object.assign(doc.data(), {id: doc.id})
          )})

        setEventData(AllEvents);
        console.log(AllEvents);
      };
  
      getEvents();
    }, []);



    return (
        <>
    <u style={{color:'#1b76d3'}} ><h2 className="text-center mb-4" >Recommended For You!</h2></u>
    <h6 className="text-center mb-4"  style={{color:'#1b7bd3', margin:-20}}>Based on your attend we recommended the follwoing events for you</h6>
    <Button variant="contained" startIcon={<UndoIcon/>} style={{backgroundColor:'#1b76d3',float: "right"}}><Link to='/user/feed' style={{ color: '#FFF', textDecoration: 'none', fontWeight:'bold' }}>Back to Feed</Link></Button>

    <Container style={{paddingRight:'100px'}}>

    {/* this is the way to render the posts */}
    
    {eventsData.map((e) => (
          <Event key={e.id} event={e} />
        ))}    


    </Container>
    </>
    )
}