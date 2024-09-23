import React, { useState } from 'react';
import { Box, Card, Typography, Button, Avatar, List, ListItem, ListItemText, Divider, IconButton, ListItemIcon, Skeleton } from '@mui/material';
import Chart from 'react-apexcharts'
import Grid from '@mui/material/Grid2';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TaskIcon from '@mui/icons-material/Task';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useParams } from 'react-router-dom'

const Dashboard = () => {
  const { token } = useParams();
  const [loaded, setLoaded] = useState(true);
  
  return (
    <div>
      <Box sx={{ padding: '2rem', backgroundColor: '#1E201E', minHeight: '100vh' }}>
        <Grid container spacing={2}>
          {/* profile */}
          <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
            {loaded ? (
              <Card sx={{ padding: '1rem', background: '#3C3D37'}}>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ width: 56, height: 56, marginRight: '1rem' }} />
                  <Box>
                    <Typography sx={{color: '#ffffff', fontSize: '1.1rem', fontWeight: 'bold'}}>John Doe</Typography>
                    <Typography variant="body2" sx={{color: '#bbbbbb'}}>johndoe@example.com</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{color:'white', display: 'flex', flexWrap: 'wrap', '*':{width: '50%', height: '2rem'}}}>
                  <Typography>Ph. number : 123456789</Typography>
                  <Typography>D.O.B : 12/12/1234</Typography>
                  <Typography>Gender : Male</Typography>
                  <Typography>City : Bengaluru</Typography>
                </Box>
              </Card>
            ) : (
              <Skeleton animation='wave' variant='rounded' height={250} width={440} sx={{backgroundColor: '#2e2e2e', borderRadius: '10px'}} />
            )}
          </Grid>

          {/* recent activities */}
          <Grid item size={{xs:12, sm: 6, md: 4}}>
            {loaded ? (
              <Card sx={{ padding: '1rem', background: '#3C3D37', color: 'white' }}>
                <Typography variant="h6">Recent Activity</Typography>
                <List>
                  <ListItem><ListItemText primary="John posted a new Help Request" /></ListItem>
                  <ListItem><ListItemText primary="Emily shared a food resource" /></ListItem>
                  <ListItem><ListItemText primary="Anna attended a neighborhood event" /></ListItem>
                </List>
              </Card>
            ) : (
              <Skeleton animation='wave' variant='rounded' height={250} width={440} sx={{backgroundColor: '#2e2e2e', borderRadius: '10px'}} />
            )}
          </Grid>

          {/* actions */}
          <Grid item size={{xs:12, sm: 6, md: 4}}>
            {loaded ? (
              <Card sx={{ padding: '1rem', background: '#3C3D37', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6">Actions</Typography>
                <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ mt: 2, background: '#697565' }}>Create Help Request</Button>
                <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ mt: 2, background: '#697565' }}>Share a Resource</Button>
                <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ mt: 2, background: '#697565' }}>Schedule Event</Button>
              </Card>
            ) : (
              <Skeleton animation='wave' variant='rounded' height={250} width={440} sx={{backgroundColor: '#2e2e2e', borderRadius: '10px'}} />
            )}
          </Grid>

          {/* upcoming events */}
          <Grid item size={{xs:12, sm: 6, md: 4}}>
            {loaded ? (
              <Card sx={{ padding: '1rem', background: '#3C3D37', color: 'white' }}>
                <Typography variant="h6">Upcoming Events</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarTodayIcon sx={{color: 'white'}} />
                    </ListItemIcon>
                    <ListItemText primary="Community Cleanup - Sept 21" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarTodayIcon sx={{color: 'white'}} />
                    </ListItemIcon>
                    <ListItemText primary="Charity Run - Oct 1" />
                  </ListItem>
                </List>
              </Card>
            ) : (
              <Skeleton animation='wave' variant='rounded' height={250} width={440} sx={{backgroundColor: '#2e2e2e', borderRadius: '10px'}} />
            )}
          </Grid>

          {/* notifications */}
          <Grid item size={{xs:12, sm: 6, md: 4}}>
            {loaded ? (
              <Card sx={{ padding: '1rem', background: '#3C3D37', color: 'white' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Notifications</Typography>
                  <IconButton><NotificationsIcon sx={{color: 'white'}} /></IconButton>
                </Box>
                <List>
                  <ListItem><ListItemText primary="New help request from Emily" /></ListItem>
                  <ListItem><ListItemText primary="Event reminder: Community Cleanup" /></ListItem>
                </List>
              </Card>
            ) : (
              <Skeleton animation='wave' variant='rounded' height={250} width={440} sx={{backgroundColor: '#2e2e2e', borderRadius: '10px'}} />
            )}
          </Grid>

          {/* todo */}
          <Grid item size={{xs:12, sm: 6, md: 4}}>
            {loaded ? (
              <Card sx={{ padding: '1rem', background: '#3C3D37', color: 'white' }}>
                <Typography variant="h6">To-Do</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <TaskIcon sx={{color: 'white'}} />
                    </ListItemIcon>
                    <ListItemText primary="Respond to John's help request" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TaskIcon sx={{color: 'white'}} />
                    </ListItemIcon>
                    <ListItemText primary="Prepare for upcoming event" />
                  </ListItem>
                </List>
              </Card>
            ) : (
              <Skeleton animation='wave' variant='rounded' height={250} width={440} sx={{backgroundColor: '#2e2e2e', borderRadius: '10px'}} />
            )}
          </Grid>

          {/* overview */}
          <Grid item size={{xs: 12, sm: 6, md: 4}}>
            {loaded ? (
              <Card sx={{ padding: '1rem', background: '#3C3D37', color: 'white' }}>
                <Typography variant="h6">Overview</Typography>
                <Box display="flex" justifyContent="space-around" mt={2}>
                  <Chart
                    options={{
                      xaxis: {
                        categories: ['Help Requests', 'Resources', 'Events']
                      },
                      theme: {
                        mode: 'dark'
                      },
                      chart: {
                        background: 'none',
                        fontFamily: 'inder',
                        toolbar: {
                          show: false
                        }
                      },
                      legend:{
                        fontFamily: 'Inder',
                        markers: {
                          size: 5,
                          strokeWidth: 0,
                          offsetX: -5
                        }
                      }
                    }}
                    series={[
                      {
                        name: 'Offered',
                        data: [5,10,51]
                      },
                      {
                        name: 'Received',
                        data: [10,5,31]
                      }
                    ]}
                    type='bar'
                    width={500}
                  />
                </Box>
              </Card>
            ) : (
              <Skeleton animation='wave' variant='rounded' height={250} width={440} sx={{backgroundColor: '#2e2e2e', borderRadius: '10px'}} />
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;
