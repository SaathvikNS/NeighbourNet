import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, Typography, Button, Avatar, List, ListItem, Divider, ListItemIcon, Skeleton, TextField, IconButton, Snackbar, Alert, Tabs, Tab } from '@mui/material';
import Chart from 'react-apexcharts'
import TaskIcon from '@mui/icons-material/Task';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { api } from '../../../../Global/localhost';
import Createactionsdialogue from '../../../utils/Createactionsdialogue';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { MyContext } from '../../../../Global/Context';

const Dashboard = () => {
  const {setUserId} = useContext(MyContext)
  const { token } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [info, setInfo] = useState({});
  const [recentActivity, setRecentActivity] = useState();
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [tabIdentifier, setTabIdentifier] = useState();
  const [upcomingEvents, setUpcomingEvents] = useState();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  const [todo, setTodo] = useState();
  const [fetchedTodo, setFetchedTodo] = useState();
  const [overview, setOverview] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [tabValue, setTabValue] = useState(0);

  const fetchData = async () => {
    try {
      const profileResponse = await axios.get(`${api}/users/getinfo/${token}`)
      console.log("Profile Data: ", profileResponse.data)
      setInfo(profileResponse.data)
      setUserId(profileResponse.data.userid)
      
      const recentActivityResponse = await axios.get(`${api}/actions/get-activity/${profileResponse.data.userid}`)
      console.log("Recent Activity Data: ", recentActivityResponse.data)
      setRecentActivity(recentActivityResponse.data)
      
      const upcomingEventsResponse = await axios.get(`${api}/actions/get-upcoming-events`)
      console.log("Upcoming Events: ", upcomingEventsResponse.data)
      setUpcomingEvents(upcomingEventsResponse.data)

      const todoFetchResponse = await axios.get(`${api}/todos/get-todo/${profileResponse.data.userid}`)
      console.log("todo: ", todoFetchResponse.data)
      setFetchedTodo(todoFetchResponse.data)

      const overviewResponse = await axios.get(`${api}/overview/get-overview/${profileResponse.data.userid}`)
      console.log("Overview: ", overviewResponse.data)
      setOverview(overviewResponse.data)

      setLoaded(true);
    }catch(error){
      setSnackbarMessage(error.response?.data?.message || "Something went wrong");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }
  
  const handleAddTodo = async () => {
    if(todo === undefined || todo.length === 0){
      setSnackbarMessage('Please enter a todo');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    try{
      const response = await axios.post(`${api}/todos/add-todo`, {userid: info.userid, title: todo});
      console.log(response.data);
      setSnackbarMessage(response.data.message)
      setSnackbarSeverity('success')
      setSnackbarOpen(true);
      fetchData();
    } catch(error){
      setSnackbarMessage(error.response?.data?.message || "Something went wrong");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }
  
  const handleTodoCheck = async (id) => {
    try{
      console.log(id);
      const todoCheckResponse = await axios.post(`${api}/todos/update-todo`, {id})
      console.log("PendingTodoResponse: ", todoCheckResponse.data)
      fetchData();
    } catch(error){
      setSnackbarMessage(error.response?.data?.message || "Something went wrong");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);    
    }
  }

  useEffect(() => {
    fetchData();
  }, [!info]);
  
  const handleCreateHelpRequest = async () => {
    setTabIdentifier('help');
    setActionDialogOpen(true);
  }

  const handleShareResource = async () => {
    setTabIdentifier('resource');
    setActionDialogOpen(true);
  }

  const handleScheduleEvent = async () => {
    setTabIdentifier('event');
    setActionDialogOpen(true);
  }
  
  const handleClose = async () => {
    setActionDialogOpen(false);
    fetchData();
  }

  const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
  }

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
  }
  
  return (
    <div>
      <Box sx={{ maxHeight: 'calc(100vh - 10rem)',padding: '2rem', backgroundColor: '#1E201E', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>

        {/* Column 1 */}
        <Box sx={{width: 'calc(calc(100% / 3) - 1rem)', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {/* profile */}
          <Box>
            {loaded ? (
              <Card sx={{ padding: '1rem', background: '#3C3D37'}}>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ width: 56, height: 56, marginRight: '1rem' }} />
                  <Box>
                    <Typography sx={{color: '#ffffff', fontSize: '1.1rem', fontWeight: 'bold'}}>{info.name}</Typography>
                    <Typography variant="body2" sx={{color: '#bbbbbb'}}>{info.email}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{color:'white', display: 'flex', flexWrap: 'wrap', '*':{width: '50%', height: '2rem'}}}>
                  <Typography>Ph. number : {info.number}</Typography>
                  <Typography>D.O.B : {info.dob}</Typography>
                  <Typography>Gender : {info.gender}</Typography>
                  <Typography>City : {info.city}</Typography>
                </Box>
              </Card>
            ) : (
              <Skeleton animation='wave' variant='rounded' height={250} width={440} sx={{backgroundColor: '#2e2e2e', borderRadius: '10px'}} />
              )}
          </Box>

          {/* upcoming events */}
          <Box sx={{maxHeight: '31rem'}}>
            {loaded ? (
              <Card sx={{ padding: '1rem', background: '#3C3D37', color: 'white' }}>
                <Typography variant="h6">Upcoming Events</Typography>
                <List>
                  {upcomingEvents.map((event, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CalendarTodayIcon sx={{color: 'white'}} />
                      </ListItemIcon>
                      {event.title} - {event.date.substring(8,10)} {months[event.date.substring(5,7)-1]}, {event.date.substring(0,4)} ( In {parseInt((new Date(event.date) - new Date())/86_400_000)} days )
                    </ListItem>
                  ))}
                </List>
              </Card>
            ) : (
              <Skeleton animation='wave' variant='rounded' height={250} width={440} sx={{backgroundColor: '#2e2e2e', borderRadius: '10px'}} />
              )}
          </Box>
        </Box>

        {/* Column 2 */} 
        <Box sx={{width: 'calc(calc(100% / 3) - 1rem)', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {/* recent activities */}
          <Box>
            {loaded ? (
              <Card sx={{ padding: '1rem', background: '#3C3D37', color: 'white' }}>
                <Typography variant="h6">Recent Activity</Typography>
                <List>
                  {recentActivity.map((activity, index)=>(
                    <ListItem key={index}>{ activity.activity === "ScheduledEvent" ? "Scheduled Event" :
                    activity.activity === "HelpRequest" ? "Posted Help Request" :
                    activity.activity === "RequestedResource" ? "Requested Resource" :
                    activity.activity === "HelpResponse" ? "Responded to Help Request" :
                    activity.activity === "SharedResource" ? "Shared Resource" :
                    activity.activity === "EnrolledToEvent" ? "Enrolled to attend the event" :
                    "I don't know what you did"}: {activity.title}</ListItem>
                    ))}
                </List>
              </Card>
            ) : (
              <Skeleton animation='wave' variant='rounded' height={250} width={440} sx={{backgroundColor: '#2e2e2e', borderRadius: '10px'}} />
              )}
          </Box>

          {/* overview */}
          <Box>
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
                        name: 'Posted',
                        data: [overview.helprequest, overview.requestedresource, overview.scheduledevent]
                      },
                      {
                        name: 'Responded',
                        data: [overview.helpresponse, overview.sharedresource, overview.enrolledevent]
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
          </Box>
        </Box>

        {/* Column 3 */}
        <Box sx={{width: 'calc(calc(100% / 3) - 1rem)', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {/* todo */}
          <Box>
            {loaded ? (
              <Card sx={{ padding: '1rem', background: '#3C3D37', color: 'white' }}>
                <Typography variant="h6">To-Do</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '1rem'}}>
                  <TextField 
                    label="New To-do" 
                    size="small" 
                    variant="outlined"
                    onChange={(event)=>setTodo(event.target.value)}
                    sx={{
                      width: '90%',
                      '& .MuiOutlinedInput-root': {
                        color: '#fefefe',
                        backgroundColor: '#333',
                        '& fieldset': {
                          borderColor: '#777',
                        },
                        '&:hover fieldset': {
                          borderColor: '#fefefe',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#fefefe',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#aaa',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#fefefe',
                      },
                    }}
                  />
                  <IconButton onClick={handleAddTodo} sx={{width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><AddCircleIcon sx={{color: 'white'}} /></IconButton>
                </Box>
                <Box sx={{paddingTop: '1rem'}}>
                  <Tabs value={tabValue} variant='fullWidth' onChange={handleTabValueChange} textColor='inherit' indicatorColor='inherit' sx={{height: '2rem', display:'flex', alignItems: 'center'}} >
                    <Tab icon={<CheckBoxOutlineBlankIcon />} iconPosition='start' label="Pending" />
                    <Tab icon={<CheckBoxIcon/>} iconPosition='start' label="Completed" />
                  </Tabs>
                  <Box sx={{paddingTop: '1rem', height: '18rem', overflowY: 'scroll'}}>
                    {tabValue === 0 ? (
                      <Box>
                        {fetchedTodo.pending.length === 0 ? (
                          <Typography width={'100%'} sx={{textAlign: 'center'}}>Nothing to display here!</Typography>
                        ) : (
                          <List>
                            {fetchedTodo.pending.map((item, index)=>(
                              <ListItem key={index} sx={{display: 'flex', alignItems: 'flex-start'}}>
                                <ListItemIcon>
                                  <IconButton onClick={()=> {handleTodoCheck(item._id)}}>
                                    <CheckBoxOutlineBlankIcon sx={{color:'white'}} />
                                  </IconButton>
                                </ListItemIcon>
                                <Typography sx={{width: '90%', overflowWrap: 'break-word', paddingTop: '0.4rem'}}>{item.title}</Typography>
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </Box>
                    ):(
                      <Box>
                        {fetchedTodo.completed.length === 0 ? (
                          <Typography width={'100%'} sx={{textAlign: 'center'}}>Nothing to display here!</Typography>
                        ) : (
                          <List>
                            {fetchedTodo.completed.map((item, index)=>(
                              <ListItem key={index} sx={{display: 'flex', alignItems: 'flex-start'}}>
                                <ListItemIcon>
                                  <IconButton onClick={()=> {handleTodoCheck(item._id)}}>
                                    <CheckBoxIcon sx={{color:'white'}} />
                                  </IconButton>
                                </ListItemIcon>
                                <Typography sx={{width: '90%', overflowWrap: 'break-word', paddingTop: '0.4rem'}}>{item.title}</Typography>
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Card>
            ) : (
              <Skeleton animation='wave' variant='rounded' height={250} width={440} sx={{backgroundColor: '#2e2e2e', borderRadius: '10px'}} />
              )}
          </Box>

          {/* actions */}
          <Box>
            {loaded ? (
              <Card sx={{ padding: '1rem', background: '#3C3D37', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6">Actions</Typography>
                <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ mt: 2, background: '#697565' }} onClick={handleCreateHelpRequest}>Create Help Request</Button>
                <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ mt: 2, background: '#697565' }} onClick={handleShareResource}>Request Resource</Button>
                <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ mt: 2, background: '#697565' }} onClick={handleScheduleEvent}>Schedule Event</Button>
              </Card>
            ) : (
              <Skeleton animation='wave' variant='rounded' height={250} width={440} sx={{backgroundColor: '#2e2e2e', borderRadius: '10px'}} />
            )}
          </Box>
        </Box>
      </Box>
      <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
      >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{width: '100%'}}>
              {snackbarMessage}
          </Alert>
      </Snackbar>
      <Createactionsdialogue open={actionDialogOpen} handleClose={handleClose} tabIdentifier={tabIdentifier} userData={info} />
    </div>
  );
}

export default Dashboard;
