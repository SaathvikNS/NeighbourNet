import React from 'react';
import { Box, Card, Typography, Button, Grid, Avatar, List, ListItem, ListItemText, Divider, IconButton, ListItemIcon } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TaskIcon from '@mui/icons-material/Task';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Dashboard = () => {
  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Grid container spacing={2}>

        {/* Profile Summary */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: '1rem' }}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: 56, height: 56, marginRight: '1rem' }} />
              <Box>
                <Typography variant="h6">John Doe</Typography>
                <Typography variant="body2" color="textSecondary">johndoe@example.com</Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">Recent Activity:</Typography>
            <List>
              <ListItem><ListItemText primary="Shared a resource" /></ListItem>
              <ListItem><ListItemText primary="Attended an event" /></ListItem>
              <ListItem><ListItemText primary="Made a help request" /></ListItem>
            </List>
          </Card>
        </Grid>

        {/* Quick Statistics/Overview */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: '1rem' }}>
            <Typography variant="h6">Overview</Typography>
            <Box display="flex" justifyContent="space-around" mt={2}>
              <Box textAlign="center">
                <Typography variant="h4">5</Typography>
                <Typography variant="body2">Help Requests</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h4">10</Typography>
                <Typography variant="body2">Resources Shared</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h4">3</Typography>
                <Typography variant="body2">Events Attended</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Recent Activity Feed */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: '1rem' }}>
            <Typography variant="h6">Recent Activity</Typography>
            <List>
              <ListItem><ListItemText primary="John posted a new Help Request" /></ListItem>
              <ListItem><ListItemText primary="Emily shared a food resource" /></ListItem>
              <ListItem><ListItemText primary="Anna attended a neighborhood event" /></ListItem>
            </List>
          </Card>
        </Grid>

        {/* Shortcut Buttons */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h6">Actions</Typography>
            <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ mt: 2 }}>Create Help Request</Button>
            <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ mt: 2 }}>Share a Resource</Button>
            <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ mt: 2 }}>Schedule Event</Button>
          </Card>
        </Grid>

        {/* Calendar Widget */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: '1rem' }}>
            <Typography variant="h6">Upcoming Events</Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText primary="Community Cleanup - Sept 21" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText primary="Charity Run - Oct 1" />
              </ListItem>
            </List>
          </Card>
        </Grid>

        {/* Notifications Panel */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: '1rem' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Notifications</Typography>
              <IconButton><NotificationsIcon /></IconButton>
            </Box>
            <List>
              <ListItem><ListItemText primary="New help request from Emily" /></ListItem>
              <ListItem><ListItemText primary="Event reminder: Community Cleanup" /></ListItem>
            </List>
          </Card>
        </Grid>

        {/* Task List */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: '1rem' }}>
            <Typography variant="h6">To-Do</Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <TaskIcon />
                </ListItemIcon>
                <ListItemText primary="Respond to John's help request" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TaskIcon />
                </ListItemIcon>
                <ListItemText primary="Prepare for upcoming event" />
              </ListItem>
            </List>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}

export default Dashboard;
