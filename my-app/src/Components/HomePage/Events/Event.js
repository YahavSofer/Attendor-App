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
import {db} from '../../../firebaseConfig'
import { doc,getDoc,getDocs,collection,updateDoc ,arrayRemove, where,query} from "firebase/firestore"
import Button from '@mui/material/Button';
import logoImage from'../../../images/logo11.png'
import AttendPopUp from './AttendPopUp/AttendPopup'
import {  useAuth } from '../../../context/AuthContext'


////////// styling ////////////////////

const AttendUnClickedButtonStyle ={
  backgroundColor:"#83c5be",
};

const AttendClickedButtonStyle ={
  backgroundColor: 'gray' ,
};

const LikeClickedButtonStyle ={
  color:red[500],

};
////////////////////////////////////////



export default function Event({event: { id,description,title,eventDate,eventImage,location,eventMinParti,userid,eventAttending}}) {

  function keepOnFormatStr(str){
    return str.replaceAll("\\\\n", '\n').replaceAll("\\\\r", '\r').replaceAll('\\\\t', '\t');
    }  


  const [profileImage,setProfileImage] = useState()
  const [isProfilePic,setIsProfilePic] = useState(false)
  const [userName,setUserName] = useState()
  
  const {currentUser} = useAuth()


useEffect(() => {
  // onload - get all events from firestore

  // set user profile in event profile picture. if they dont have, place icon insted
  const getUserProfileImg = async () => {
    const userDoc = await getDoc(doc(db,'users',userid))
    .then( u =>{
                setProfileImage(u.data().profileImage);
                setUserName(u.data().first +' '+u.data().last);
                // console.log(userName ,profileImage);
    } )
      
  };

  const setAttendedToEvents =async () =>{
    
    const EventDoc = await getDoc(doc(db,'Events',id))
    .then( e =>{
                (e.data().eventAttending || []).map((uid)=>{
                  if(uid == currentUser.uid){
                    // console.log("current user is attending to "+id+" event");
                    setAttend(true)

                  }
                });

    } )
   };

  setAttendedToEvents();
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
  
  const [buttonPopup,setButtonPopup] = useState(false)
  const [checkAttending,setCheckAttending] = useState(false)


  const handleLoadPicture =() =>{
    if(eventImage !== ""){
      setIsImg(true)
    }
  }

  const RemoveItemFromArray = async() =>{
    const UserAttendingArray = doc(db, "users", currentUser.uid);
    await updateDoc(UserAttendingArray, {
      eventAttending: arrayRemove(id)
  }).then(console.log('event removed from user attening list'))

  const eventsAttendings = doc(db, "Events", id);
  await updateDoc(eventsAttendings, {
    eventAttending: arrayRemove(currentUser.uid)
}).then(console.log('secceed'))

}


  const handleAttendClick=(e)=>{
    setAttend(!attend)
    // console.log(e.target.innerText);
    if(e.target.innerText ==='DISATTEND'){
      console.log('Disattend clicked');
      setCheckAttending(false)
      RemoveItemFromArray()
    }
    if (attend === false){
      setButtonPopup(true)
    }

  };

  const handleLikeClick=()=>{
    setLike(!like)
  };



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
  <>
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
        <div>
          <Button variant="contained"  onClick={handleAttendClick} style={attend ? AttendClickedButtonStyle: AttendUnClickedButtonStyle} >
            {!attend ? 'Attend Now' : 'Disattend'}
          </Button>
        </div>
          {/* <br/> */}
         <div style={{marginLeft:'30%'}}> 
          <IconButton aria-label="Like icon" >
          {/* icon like */}
          <FavoriteIcon style={like ? LikeClickedButtonStyle : null} onClick={handleLikeClick}   /> 
          </IconButton>
          </div>
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


      <AttendPopUp 
      username={userName}
      trigger={buttonPopup} 
      setTrigger={setButtonPopup} 
      setAttendValue={setAttend}
      currentUserID = {currentUser.uid}
      eventID ={id}
      eventTitle={title}
      eventDate={dateTime.getDate()+ '-'+(dateTime.getMonth()+1)+'-'+dateTime.getFullYear()}
      eventTime={dateTime.toLocaleTimeString('en-US')}
      eventLocation ={location}
      checkAttending = {checkAttending}
      setCheckAttending = {setCheckAttending}
      />


    </>
  );
}
