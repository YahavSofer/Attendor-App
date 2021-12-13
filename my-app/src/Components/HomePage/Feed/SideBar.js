import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import UpdateIcon from '@mui/icons-material/Update';
import { Link } from 'react-router-dom'


const buttons = [
  <Button key="one" style={{background:'rgb(159, 255, 200,0.7)',fontWeight:'bold'}} endIcon={<AddCircleIcon/>}><Link to='user/create-event' style={{ textDecoration: 'none' }}>Create Event</Link></Button>,
  <Button key="two" endIcon={<ThumbUpAltIcon/>}>Liked Events</Button>,
  <Button key="three" endIcon={<UpdateIcon/>}>Upcoming Events</Button>,
];

export default function GroupOrientation() {
  return (
    <Box
      sx={{
        display: 'flex',
        width:'150%',
        '& > *': {
          m: 1,
        //https://mui.com/system/typography/
        },
      }}
      
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        size="medium"
        
      >
        {buttons}
      </ButtonGroup>
      
    </Box>
  );
}
