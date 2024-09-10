import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { CardContent, Card, Grid2 as Grid } from '@mui/material'

const About = () => {
  return (
    <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', height:'100vh', width: '100vw',}}>
      <Container style={{ padding: '40px 0' }}>
        <Typography variant="h4" align="center" gutterBottom>
          About Us
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography>
              NeighborNet is dedicated to fostering a strong, connected community. Our platform helps neighbors support each other by sharing resources, responding to help requests, and organizing events.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={"https://via.placeholder.com/1920x1080"} alt="About Us" style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
        </Grid>
      </Container>

    </div>
  )
}

export default About