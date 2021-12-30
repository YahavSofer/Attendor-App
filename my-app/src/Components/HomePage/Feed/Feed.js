import React ,{useEffect,useState} from 'react'
import { Container } from 'react-bootstrap'
import Event from '../Events/Event'

import {db} from '../../../firebaseConfig'
import {getDocs,collection,orderBy,query} from "firebase/firestore"


export default function Feed() {
    const [eventsData, setEventData] = useState([]);

    const getAPI= () =>{

      const express = require('express')
      const cors = require('cors')
      const app = express()
       
      const corsOptions = {
        origin: 'https://web-app-jce.web.app',
        optionsSuccessStatus: 200
      }

      app.get('https://recommendapi-amfugs0p.uc.gateway.dev/recommendations', cors(corsOptions), function (req, res, next) {
        console.log(res.json())
      })

      // app.use(express.static('public'))
      
      // app.get('https://recommendapi-amfugs0p.uc.gateway.dev/recommendations', function (req, res) {
      //     res.header("Access-Control-Allow-Origin", "*");
      //     console.log(res);
      // })
       
      // app.listen(3000, () => {
      //     console.log('alive');
      // })

    }

    useEffect(() => {
      // onload - get all events from firestore

      const getEvents = async () => {
        const AllEvents =collection(db,'Events')
        const q = query(AllEvents, orderBy("createdTime", "desc"));
        const querySnapshot = await getDocs(q)
        .then(function(qSanpshot) {
          return qSanpshot.docs.map(doc => Object.assign(doc.data(), {id: doc.id})
          )})

        setEventData(querySnapshot);
        // console.log(querySnapshot);
      };
  
      getEvents();
    }, []);



    return (
        <>
    <button onClick={getAPI}>click here</button>
    <Container>

    {/* this is the way to render the posts */}

    {eventsData.map((e) => (
          <Event key={e.id} event={e} />
        ))}    


    </Container>
    </>
    )
}
