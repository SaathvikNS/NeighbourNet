import React, { useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert, Backdrop, CircularProgress, Autocomplete, createFilterOptions, Typography } from '@mui/material';
import axios from 'axios';
import { api } from '../../../Global/localhost';
import { category } from './../../../Global/ResourceCategories';

const ResourceDialog = ({userid}) => {
  console.log(userid);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        userid: userid?.userid || userid,
        location: '',
        contact: '',
    });    

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData)
        try{
            const response = await axios.post(`${api}/actions/share-resource`, formData);
            console.log(response.data);
            setSnackbarMessage('Resource Requested Successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch(error){
            setSnackbarMessage(error.response?.data?.message || "Something went wrong");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    const filteroptions = createFilterOptions({
      matchFrom: 'any'
    })

    return (
        <Box sx={{maxHeight: '55vh', paddingTop: '1rem', boxSizing: 'border-box'}}>
            <Backdrop open={loading} onClick={console.log("processing")} sx={{zIndex: '10'}}>
                <CircularProgress color='inherit' />
            </Backdrop>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                <TextField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    color='#697565'
                    size="small"
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    color='#697565'
                    size="small"
                    required
                    multiline
                />
                <Autocomplete
                  disablePortal
                  options={category}
                  renderInput={(params) => <TextField {...params} label="Category" margin='normal' size='small' required/>}
                  filterOptions={filteroptions}
                  fullWidth
                  onChange={(event, value) => setFormData({...formData, category: value})}
                />
                <TextField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    color='#697565'
                    size="small"
                />
                <TextField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    color='#697565'
                    size="small"
                />
                <Typography variant='caption' color='textSecondary'>Note: By default location and contact in your profile would be taken into consideration if not explicitly provided</Typography>
                <Button type="submit" variant="contained" sx={{backgroundColor: '#697565', alignSelf: 'center', margin: '2rem'}}>Submit</Button>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ResourceDialog;
