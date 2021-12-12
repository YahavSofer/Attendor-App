import React, {useState,useEffect} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {db,storage} from '../../../firebaseConfig'
import { ref, getDownloadURL } from "firebase/storage";
import { addDoc,doc,getDoc,collection, query, where,Timestamp } from "firebase/firestore"
import Button from '@mui/material/Button';
import logoImage from'../../../images/logo11.png'

const AttendUnClickedButtonStyle ={
  backgroundColor:"#83c5be",
};

const AttendClickedButtonStyle ={
  backgroundColor: 'gray' ,
};

const LikeClickedButtonStyle ={
  color:red[500],
};


export default function Event({event: { id,description,title,eventDate,eventImage,location,eventMinParti,userid }}) {

  function keepOnFormatStr(str)  {
    return str.replaceAll("\\\\n", '\n').replaceAll("\\\\r", '\r').replaceAll('\\\\t', '\t');
}  


  const [profileImage,setProfileImage] = useState()
  const [isProfilePic,setIsProfilePic] = useState(false)
  const [userName,setUserName] = useState()
useEffect(() => {
  // onload - get all events from firestore

  const getUserProfileImg = async () => {
    const userDoc = await getDoc(doc(db,'users',userid))
    .then( u =>{
                setProfileImage(u.data().profileImage);
                setUserName(u.data().first +' '+u.data().last);
                console.log(userName ,profileImage);
    } )
      
  };

  getUserProfileImg();
  
  if (profileImage !== ""){
    setIsProfilePic(true)
  } 
}, []);



  const descriptionText = {description}.description
  const descFormated = keepOnFormatStr(descriptionText) ;
  const newText = descFormated.split('\n').map(str => <>{str}<br/></>);
  
  const dateTime =eventDate.toDate()

  const [attend, setAttend] = useState(false) // check if the button is clicked
  const [like, setLike] = useState(false) // check if the button is clicked
  const [isImg,setIsImg] = useState(false)
  

  const handleLoadPicture =() =>{
    if(eventImage !== ""){
      setIsImg(true)
    }
    
  }



  const handleAttendClick=()=>{
    setAttend(!attend)
  };
  const handleLikeClick=()=>{
    setLike(!like)
  };


  //// get event image ///
  ///////////////////////////

  //// set subtitle in cardHedaer of time and location ////
  const subheader =
          <Typography style={{fontSize: '14px'}}>
              {userName}<br/>{(dateTime.getDate()+ '-'+(dateTime.getMonth()+1)+'-'+dateTime.getFullYear()+'  ' 
        +dateTime.toLocaleTimeString('en-US'))}
        <br/>{location}
          </Typography>



  //// read more option ////
  const ReadMore = ({ children }) => {

    const text = children

    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
 
    return (
      <p className="text" >

        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} style={{color:'blue' ,textDecoration:'underline'}}>
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };
 ///////////////////////////


  return (

    <Card sx={{ maxWidth: '100%',marginBottom:'16px' }} key={id}>
      <CardHeader
        avatar={
          isProfilePic?
          <Avatar src={profileImage} aria-label="user-name"/>   
          :
          <Avatar src="" aria-label="user-name"/>    

      }
      
      action={
        <>
        <IconButton aria-label="Like icon" >
        {/* icon like */}
        <FavoriteIcon style={like ? LikeClickedButtonStyle : null} onClick={handleLikeClick}   /> 
        </IconButton>
        <Button variant="contained"  onClick={handleAttendClick} style={attend ? AttendClickedButtonStyle: AttendUnClickedButtonStyle} >
          {!attend ? 'Attend' : 'Disattend'}
        </Button>
        </>

        }

        title={<h4>{title}</h4>}    // event title
        subheader= {subheader}      // event Date&time

      />

      {/* if event pic is True --> place pic ; else --> place null */}
      <CardMedia
        onLoad={handleLoadPicture}
        component="img"        
        image = {isImg ? eventImage : logoImage }
        alt="Event Picture"
        style={{maxWidth:'20%',display:'block', margin:'auto'}}

      />


      <CardContent>
        <Typography component={'span'} variant="body2" color="text.secondary">

        <ReadMore children={newText} />

        </Typography>
      </CardContent>
    </Card>

  );
}
