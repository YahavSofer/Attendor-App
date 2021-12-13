import React,{useState } from "react";
import "./attendPopup.css";
import CloseIcon from '@mui/icons-material/Close'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CancelIcon from '@mui/icons-material/Cancel';
import AssistantIcon from '@mui/icons-material/Assistant';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { db } from "../../../../firebaseConfig";
import {  doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"


// import PropTypes from "prop-types";   //npm install prop-types --save


export default function AttendPopUp(props){
  // const [checkAttending,setCheckAttending] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleClose =() =>{
    props.setTrigger(false)
    if (!props.checkAttending){
      props.setAttendValue(false)
    }
  }

  const handleAttend = async() =>{
    setLoading(true)
    // console.log(props.currentUserID);
    const UserAttendingArray = doc(db, "users", props.currentUserID);
    await updateDoc(UserAttendingArray, {
      eventAttending: arrayUnion(props.eventID)
  }).then(console.log('event added to user attening list'))


    const eventsAttendings = doc(db, "Events", props.eventID);
    await updateDoc(eventsAttendings, {
      eventAttending: arrayUnion(props.currentUserID)
  }).then(console.log('secceed'))

    props.setCheckAttending(true)
    setLoading(false)

  }
  
  const OnLoadPopup =
                    <>
                        <CloseIcon className="close-btn" onClick={handleClose}/>
                        <Typography component={'header'} textAlign={'center'} color="darkcyan">
                            It is time to join to <b>{props.username}</b> 
                        </Typography>
                        
                        <span style={{ marginTop:'20px', display: 'flex',justifyContent:'space-evenly'}}>
                            <Button disabled={loading} variant="contained" startIcon={<EventAvailableIcon />} onClick={handleAttend} >Attend</Button>
                            <Button disabled={loading} variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>Not Now</Button>
                        </span>
                    </>

  const OnConfirmedPopup =

                        <>
                          {/* <CloseIcon className="close-btn" onClick={handleClose}/> */}
                          <Typography component={'header'} textAlign={'center'} fontSize={'25px'} color="darkblue">
                            <b>You have successfully registered for the event!</b><br/><br/>
                          </Typography>
                          <Typography component={'p'} textAlign={'left'} color="darkcyan">
                              <u><b>Event Details</b></u><br/>

                              <ul style={{fontSize:'13px'}} >
                                  <li><b>Event:</b> {props.eventTitle}</li>
                                  <li><b>Date&Time:</b> {props.eventDate} {props.eventTime}</li>
                                  <li><b>Location:</b> {props.eventLocation}</li>
                            </ul> 
                          </Typography>

                          <span style={{ marginTop:'20px', display: 'flex',justifyContent:'space-evenly'}}>
                              <Button disabled={loading} variant="contained" startIcon={<AssistantIcon />} onClick={handleAttend} >Get recommendations</Button>
                              <Button disabled={loading} variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>Close</Button>
                          </span>
                        </>




  return( (props.trigger) ?
    <div className="popup">
      <div className="popup-inner">

      {!props.checkAttending ? OnLoadPopup : OnConfirmedPopup}
      
      </div>
    </div>
    : ""


  )
}