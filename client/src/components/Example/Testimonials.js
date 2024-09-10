import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { CardContent, Card, Grid2 as Grid } from '@mui/material'

const Testimonials = () => {
  return (
    <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', height:'100vh', width: '100vw',}}>
      <Container style={{ padding: '40px 0', backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" align="center" gutterBottom>
            What Our Users Say
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
            <Card>
                <CardContent>
                <Typography variant="body1">
                    "NeighborNet has been a lifesaver. I found help for my move quickly and easily."
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    - Jane Doe
                </Typography>
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={12} md={4}>
            <Card>
                <CardContent>
                <Typography variant="body1">
                    "The resource sharing feature is fantastic. I was able to borrow a tool I needed for a project."
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    - John Smith
                </Typography>
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={12} md={4}>
            <Card>
                <CardContent>
                <Typography variant="body1">
                    "I've met so many wonderful people through the community events organized on NeighborNet."
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    - Emily Johnson
                </Typography>
                </CardContent>
            </Card>
            </Grid>
        </Grid>
        </Container>
    </div>
  )
}

export default Testimonials