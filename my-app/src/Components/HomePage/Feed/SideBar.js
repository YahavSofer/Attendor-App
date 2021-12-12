import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const buttons = [
  <Button key="one">Create Event</Button>,
  <Button key="two">Liked Events</Button>,
  <Button key="three">Upcoming Events</Button>,
];

export default function GroupOrientation() {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        //https://mui.com/system/typography/
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        size="large"
        
        
      >
        {buttons}
      </ButtonGroup>
      
    </Box>
  );
}
