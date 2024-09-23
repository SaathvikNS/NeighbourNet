import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Box, Select, MenuItem, InputLabel, FormControl, Autocomplete, createFilterOptions, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
import { cities } from './../../Global/cities';
import axios from 'axios';
import { api } from './../../Global/localhost';
import Registerstepper from '../utils/Registerstepper';
import './style.css'

const RegistrationForm = () => {
    const [loading, setLoading] = useState(false);
    const [openStepper, setOpenStepper] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        agreeToTerms: false
    });    

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const filteroptions = createFilterOptions({
        matchFrom: 'any'
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword){
            setSnackbarMessage('Passswords do not match');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }
        if(!formData.agreeToTerms){
            setSnackbarMessage('Please agree to the terms and conditions');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }
        setLoading(true);
        try{
            const response = await axios.post(`${api}/users/register`, formData);
            console.log(response.data);
            setSnackbarMessage('Otp Sent to the registered mail');
            setSnackbarSeverity('success');
            setOpenStepper(true);
        } catch(error){
            setSnackbarMessage(error.response?.data?.message || "Something went wrong");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    return (
        <Box sx={{maxHeight: '50vh'}}>
            <Backdrop open={loading} onClick={console.log("processing")} sx={{zIndex: '10'}}>
                <CircularProgress color='inherit' />
            </Backdrop>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    color='#697565'
                    size="small"
                    required
                />
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    color='#697565'
                    size="small"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    size="small"
                    color='#697565'
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    size="small"
                    color='#697565'
                    required
                />
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    size="small"
                    color='#697565'
                    required
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
                <TextField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    fullWidth
                    margin='dense'
                    size="small"
                    InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth margin='normal' size='small'>
                    <InputLabel id="genderlabel">Gender</InputLabel>
                    <Select
                        labelId="genderlabel"
                        name='gender'
                        value={formData.gender}
                        label="Gender"
                        onChange={handleChange}
                        className='genderSelect'
                    >
                        <MenuItem value={"Male"} className='genderOptions'>Male</MenuItem>
                        <MenuItem value={"Female"} className='genderOptions'>Female</MenuItem>
                        <MenuItem value={"Other"} className='genderOptions'>Others</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    color='#697565'
                    size="small"
                />
                <Autocomplete
                    disablePortal
                    options={cities}
                    renderInput={(params) => <TextField {...params} label="City"/>}
                    filterOptions={filteroptions}
                    onChange={(event, value) => setFormData({ ...formData, city: value })}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            color='#697565'
                        />
                    }
                    label="I agree to the Terms and Conditions"
                />
                <Button type="submit" variant="contained" sx={{backgroundColor: '#697565', alignSelf: 'center', margin: '2rem'}}>Register</Button>
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
            <Registerstepper open={openStepper} onClose={() => setOpenStepper(false)} email={formData.email} />
        </Box>
    );
};

export default RegistrationForm;
