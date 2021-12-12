import React, {useState} from 'react'
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
import { addDoc,doc,getDocs,collection, query, where,Timestamp } from "firebase/firestore"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


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

  const descriptionText = {description}.description
  const descFormated = keepOnFormatStr(descriptionText) ;
  const newText = descFormated.split('\n').map(str => <>{str}<br/></>);
  
  const dateTime =eventDate.toDate()

  const [attend, setAttend] = useState(false) // check if the button is clicked
  const [like, setLike] = useState(false) // check if the button is clicked

  const handleAttendClick=()=>{
    setAttend(!attend)
  };
  const handleLikeClick=()=>{
    setLike(!like)
  };

  //// get event image ////
  const starsRef = ref(storage, eventImage);
  console.log(starsRef);
  const img = getDownloadURL(starsRef)
  ///////////////////////////


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
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user-name">    
            R         {/* if user have profile pic --> set pic ; else --> place first letter from fisrt name on CapsLock*/}
          </Avatar>
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

        title={title}    // event title
        subheader= {dateTime.getDate()+ '-'+(dateTime.getMonth()+1)+'-'+dateTime.getFullYear()+'  ' 
        +dateTime.toLocaleTimeString('en-US')}     // event Date&time

      />

      {/* if event pic is True --> place pic ; else --> place null */}
      <CardMedia
        component="img"        
        image = {img}
        alt="Event Picture"
        style={{maxWidth:'30%',display:'block', margin:'auto'}}

      />


      <CardContent>
        <Typography component={'span'} variant="body2" color="text.secondary">

        <ReadMore children={newText} />

        </Typography>
      </CardContent>
    </Card>

  );
}
