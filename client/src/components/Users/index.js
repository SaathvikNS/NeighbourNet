import React, { useContext } from 'react'
import { MyContext } from '../../Global/Context';
import { Box, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const Users = () => {
  const { loggedIn} = useContext(MyContext);
  return (
    <div style={{height: '100vh', width: '100vw', display: 'flex'}}>
      {loggedIn ? (
        <div>
          Logged In
        </div>
      ) : (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', transform: 'translateY(-20%)'}}>
          <SentimentDissatisfiedIcon sx={{fontSize: '10rem', paddingBottom: '2rem', color: '#3C3D37'}} />
          <Typography variant='h3' sx={{paddingBottom: '2rem'}}>
            404: USER NOT FOUND!!
          </Typography>
          <Typography variant='h5'>
            Please make sure you lagin before accessing the user page
          </Typography>
        </Box>
      )}
    </div>
  )
}

export default Users