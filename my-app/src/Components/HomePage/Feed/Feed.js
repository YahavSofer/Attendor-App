import React ,{useEffect,useState} from 'react'
import { Container } from 'react-bootstrap'
import Event from '../Events/Event'

import {db,storage} from '../../../firebaseConfig'
import {getDocs,collection,limit,startAfter,doc} from "firebase/firestore"

//  npm install --save react-infinite-scroll-component

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
    <Container style={{paddingRight:'100px'}}>

    {/* this is the way to render the posts */}
    
    {eventsData.map((e) => (
          <Event key={e.id} event={e} />
        ))}    


    </Container>
    </>
    )
}
