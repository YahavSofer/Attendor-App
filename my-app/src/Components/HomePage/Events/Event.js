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
import img from '../../../images/logo11.png'


export default function Event({event: { discription,title }}) {

  function keepOnFormatStr(str)  {
    return str.replaceAll("\\\\n", '\n').replaceAll("\\\\r", '\r').replaceAll('\\\\t', '\t');
}  
  const discriptionText = {discription}.discription
  const discFormated = keepOnFormatStr(discriptionText) ;
  const newText = discFormated.split('\n').map(str => <>{str}<br/></>);
  // console.log(newText);
  // console.log(discFormated)

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



  return (

    <Card sx={{ maxWidth: '100%',marginBottom:'16px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">    {/*put aria-label=user name*/}
            R         {/* if user have profile pic --> set pic ; else --> place first letter from fisrt name on CapsLock*/}
          </Avatar>
      }
      
      action={
        <IconButton aria-label="add to favorites">
        <FavoriteIcon  />
      </IconButton>  
        }

        title={title}    // event title
        subheader="September 14, 2016"       // event Date&time
      />

      {/* if event pic is True --> place pic ; else --> place null */}
      <CardMedia
        component="img"        
        image = {img}
        alt="Paella dish"
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
