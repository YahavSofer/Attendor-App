import * as React from 'react';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';


export default function FeedFilters() {
  return (
    <>
    <Stack direction="row" spacing={2} paddingBottom='10px'>
      <Button variant="outlined" endIcon={<FavoriteIcon/>} style={{marginRight:'10px'}}>Liked Events</Button>
      
      <Button variant="outlined"  endIcon={<UpdateIcon/>}>Upcoming Events</Button>
    </Stack>
    </>
  );
}
