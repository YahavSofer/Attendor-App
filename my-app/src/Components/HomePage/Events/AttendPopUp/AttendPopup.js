import React,{useState } from "react";
import "./attendPopup.css";
import CloseIcon from '@mui/icons-material/Close'

// import PropTypes from "prop-types";   //npm install prop-types --save


export default function AttendPopUp(props){
  const handleClose =() =>{
    props.setTrigger(false)
    props.setAttendValue(false)
  }
  return( (props.trigger) ?
    <div className="popup">
      <div className="popup-inner">
      <CloseIcon className=".close-btn"  onClick={handleClose}/>
        {props.children}
      </div>
    </div>
    : ""


  )
}