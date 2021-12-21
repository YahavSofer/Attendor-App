import React ,{useEffect,useState} from 'react'
import { Container } from 'react-bootstrap'
import Event from '../Events/Event'

import {db} from '../../../firebaseConfig'
import {getDocs,collection,orderBy,query} from "firebase/firestore"

//  npm install --save react-infinite-scroll-component

export default function Feed() {
    const [eventsData, setEventData] = useState([]);


    useEffect(() => {
      // onload - get all events from firestore

      const getEvents = async () => {
        const AllEvents =collection(db,'Events')
        const q = query(AllEvents, orderBy("eventDate", "desc"));
        const querySnapshot = await getDocs(q)
        .then(function(qSanpshot) {
          return qSanpshot.docs.map(doc => Object.assign(doc.data(), {id: doc.id})
          )})

        setEventData(querySnapshot);
        console.log(querySnapshot);
      };
  
      getEvents();
    }, []);



    return (
        <>
    <Container>

    {/* this is the way to render the posts */}
    
    {eventsData.map((e) => (
          <Event key={e.id} event={e} />
        ))}    


    </Container>
    </>
    )
}
