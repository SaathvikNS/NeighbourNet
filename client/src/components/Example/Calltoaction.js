import React from 'react'
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', height:'100vh', width: '100vw',}}>
        <Typography variant="h5" gutterBottom>
            Ready to join the community?
        </Typography>
        <Button variant="contained" color="secondary" component={Link} to="/register">
            Sign Up Now
        </Button>
    </div>
  )
}

export default CallToAction