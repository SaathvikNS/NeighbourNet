import SentimentDissatisfied from '@mui/icons-material/SentimentDissatisfied'
import { Box, Typography } from '@mui/material'
import React from 'react'

const Notloggedin = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', transform: 'translateY(-20%)'}}>
        <SentimentDissatisfied sx={{fontSize: '10rem', paddingBottom: '2rem', color: '#3C3D37'}} />
        <Typography variant='h3' sx={{paddingBottom: '2rem'}}>
        404: USER NOT FOUND!!
        </Typography>
        <Typography variant='h5'>
        Please make sure you login before accessing the user page
        </Typography>
    </Box>
  )
}

export default Notloggedin