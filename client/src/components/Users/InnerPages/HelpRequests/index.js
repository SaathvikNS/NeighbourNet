import React, { useContext, useEffect, useState } from 'react'
import {Alert, Box, Button, Card, Divider, Fab, IconButton, Snackbar, Tab, Tabs, Typography} from '@mui/material'
import axios from 'axios';
import { api } from '../../../../Global/localhost';
import { MyContext } from '../../../../Global/Context';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Createactionsdialogue from '../../../utils/Createactionsdialogue';
import PublishIcon from '@mui/icons-material/Publish';
import HelpDialog from '../../../utils/HelpDialog'

const HelpRequests = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const {userid} = useContext(MyContext)
    const [helpRequests, setHelpRequests] = useState({});
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    const [tabIdentifier, setTabIdentifier] = useState();
    const [openInfoDialogue, setOpenInfoDialogue] = useState(false);
    const [post, setPost] = useState();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleTabIndexChange = (event, newValue) => {
        setTabIndex(newValue);
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    const fetchData = async () => {
        try{
            const fetchResponse = await axios.get(`${api}/actionresponse/get-help-requests/${userid}`);
            console.log(fetchResponse.data)
            setHelpRequests(fetchResponse.data)
        } catch(error){
            setSnackbarMessage(error.response?.data?.message || "Something went wrong");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    }

    useEffect(()=>{
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try{
            const deleteResponse = await axios.delete(`${api}/actions/delete-help/${id}`)
            console.log(deleteResponse.data)
            setSnackbarMessage('Help Request Deleted Successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            fetchData();
        } catch(error){
            setSnackbarMessage(error.response?.data?.message || "Something went wrong");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    }

    const handleClose = async () => {
        setActionDialogOpen(false);
        fetchData();
    }

    const handleCreateHelpRequest = async () => {
        setTabIdentifier('help');
        setActionDialogOpen(true);
    }

    const handleresponse = async (id) => {
        try{
            const response = await axios.post(`${api}/actions/help-response`, {id, userid})
            console.log(response.data)
            setSnackbarMessage('Response Posted Successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            fetchData();
        } catch(error){
            setSnackbarMessage(error.response?.data?.message || "Something went wrong");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    }

    const handleviewrequest = async(post) => {
        if (post) {
            setPost(post);
            setOpenInfoDialogue(true);
        } else {
            console.error("Post is undefined or null.");
        }
    }
    
    const handleRequestDialogClose = async () => {
        setOpenInfoDialogue(false)
        fetchData();
    }

  return (
    <div>
        <Box sx={{ backgroundColor: '#1E201E', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%'}}>
            <Tabs value={tabIndex} variant='fullWidth' onChange={handleTabIndexChange} indicatorColor='inherit' sx={{height: '2rem', position: 'fixed', width: '100%', display:'flex', background: '#1E201E', alignItems: 'center', '.MuiTab-textColorPrimary': {color: '#ffffff55 !important'}, '.Mui-selected': {color: 'white !important'}, zIndex: '1'}} >
                <Tab label="Help Requests" />
                <Tab label="Your Requests" />
            </Tabs>
            <Box sx={{width: '100%', paddingTop: '5rem', height: 'max-content', background: '#1E201E'}}>
            {tabIndex === 0 ? (
                <Box sx={{width: '100%', display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '0 1rem', boxSizing: 'border-box'}}>
                {helpRequests.othersPosts?.length > 0 ? (
                    helpRequests.othersPosts.map((post) => (
                        <Box sx={{width: 'calc(calc(100% / 3) - 1rem)'}}>
                            <Card sx={{ padding: '1rem', background: '#3C3D37', color: 'white'}}>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Typography sx={{fontSize: '1.1rem'}}>{post.title}</Typography>
                                </Box>
                                <Divider sx={{background: '#ffffff44', margin: '1rem 0'}} />
                                <Typography>{post.description}</Typography>
                                <Typography sx={{paddingTop: '1rem'}}>Posted on : {post.createdAt.substring(0,10).split('-').reverse().join('-')}</Typography>
                                <Typography>Location : {post.location}</Typography>
                                <Typography>Contact : {post.contact}</Typography>
                                <Box sx={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                                    <Button onClick={()=>{handleresponse(post._id)}} sx={{background: '#697565', color: 'white'}}>
                                        <PublishIcon sx={{padding: '0 1rem 0 0'}} />
                                        <Typography>Respond</Typography>
                                    </Button>
                                </Box>
                            </Card>
                        </Box>
                    ))
                ) : (
                    <Typography width={'100%'} sx={{color: 'white', textAlign: 'center', fontSize: '1.5rem'}}>No help requests available</Typography>
                )}
                </Box>
            ) : (
                <Box sx={{width: '100%', display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '0 1rem', boxSizing: 'border-box'}}>
                {helpRequests.userPosts?.length > 0 ? (
                    helpRequests.userPosts.map((post) => (
                        <Box sx={{width: 'calc(calc(100% / 3) - 1rem)'}}>
                            <Card onClick={()=> {handleviewrequest(post)}} sx={{ padding: '1rem', cursor: 'pointer', background: '#3C3D37', color: 'white'}}>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Typography sx={{fontSize: '1.1rem'}}>{post.title}</Typography>
                                    <IconButton onClick={()=> {handleDelete(post._id)}}>
                                        <DeleteIcon sx={{color: 'white'}} />
                                    </IconButton>
                                </Box>
                                <Divider sx={{background: '#ffffff44', margin: '1rem 0'}} />
                                <Typography>{post.description}</Typography>
                                <Typography sx={{paddingTop: '1rem'}}>Posted on : {post.createdAt.substring(0,10).split('-').reverse().join('-')}</Typography>
                                <Typography>Location : {post.location}</Typography>
                                <Typography>Contact : {post.contact}</Typography>
                            </Card>
                        </Box>
                    ))
                ) : (
                    <Typography width={'100%'} sx={{color: 'white', textAlign: 'center', fontSize: '1.5rem'}}>No help requests available</Typography>
                )}
                </Box>
            )}
            <Fab onClick={handleCreateHelpRequest} size='small' sx={{position: 'fixed', bottom: 0, right: 0, margin: '2rem' }}>
                <AddIcon />
            </Fab>
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
        <Createactionsdialogue open={actionDialogOpen} handleClose={handleClose} tabIdentifier={tabIdentifier} userData={userid} />
        <HelpDialog open={openInfoDialogue} handleClose={handleRequestDialogClose} data={post || {}} />
    </div>
  )
}

export default HelpRequests