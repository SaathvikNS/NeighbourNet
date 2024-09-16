import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Box, Typography, Stepper, Step, StepLabel, TextField, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
import { api } from './../../Global/localhost';
import axios from 'axios';

const steps = ['Enter Email', 'Enter OTP', 'Set Password'];

const StepperDialog = ({ open, onClose }) => {
    const [loading, setloading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [email, setEmail] = useState();
    const [otp, setOtp] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    const handleEmail = async () => {
        setloading(true);
        try {
            const response  = await axios.post(`${api}/users/forgot-password-send-otp`, {email});
            console.log(response.data);
            setSnackbarMessage('Otp sent to the registered mail');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setActiveStep(activeStep + 1);
        } catch(error){
            setSnackbarMessage(error.response?.data?.message || "Something went wrong");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        setloading(false);
    }
    const handleOtp = async () => {
        setloading(true);
        try{
            const response = await axios.post(`${api}/users/forgot-password-verify-otp`, {email, otp});
            console.log(response.data);
            setSnackbarMessage('Otp verified');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setActiveStep(activeStep + 1);
        } catch(error){
            setSnackbarMessage(error.response?.data?.message || "Something went wrong");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        setloading(false);
    }
    
    const handlePassword = async () => {
        if(password !== confirmPassword){
            setSnackbarMessage('Passswords do not match');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }
        setloading(true);
        try{
            const response = await axios.post(`${api}/users/forgot-password-change-password`, {email, password});
            console.log(response.data);
            setSnackbarMessage('Password set successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setTimeout(() => {
                setActiveStep(0);
                onClose();
            }, 2000);
        } catch (error){
            setSnackbarMessage(error.response?.data?.message || "Something went wrong");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        setloading(false);
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <Backdrop open={loading} onClick={console.log("processing")} sx={{zIndex: '10'}}>
                <CircularProgress color='inherit' />
            </Backdrop>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep} alternativeLabel sx={{'& .Mui-active .MuiStepIcon-root': {color: '#697565'},'& .Mui-completed .MuiStepIcon-root': {color: '#697565'}}} >
                    {steps.map(label => (
                        <Step key={label} >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box mt={2}>
                    {activeStep === 0 && (
                        <Box>
                            <Typography>Enter your email address:</Typography>
                            <TextField onChange={e => {setEmail(e.target.value)}} fullWidth label="Email" variant="outlined" margin="normal" size='small' color='#697565' type='email' />
                        </Box>
                    )}
                    {activeStep === 1 && (
                        <Box>
                            <Typography>Enter the OTP sent to your email:</Typography>
                            <TextField onChange={e => {setOtp(e.target.value)}} fullWidth label="OTP" variant="outlined" margin="normal" size='small' color='#697565' required />
                        </Box>
                    )}
                    {activeStep === 2 && (
                        <Box>
                            <TextField onChange={e => {setPassword(e.target.value)}} fullWidth label="New Password" variant="outlined" margin="normal" size='small' color='#697565' type='password' required />
                            <TextField onChange={e => {setConfirmPassword(e.target.value)}} fullWidth label="Confirm New Password" variant="outlined" margin="normal" size='small' color='#697565' type='password' required />
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <Box display="flex" justifyContent="flex-end" p={2}>
                {activeStep === 0 && (
                    <Button onClick={handleEmail} variant="contained" sx={{backgroundColor: '#697565'}}>
                        Send Otp
                    </Button>
                )}
                {activeStep === 1 && (
                    <Button onClick={handleOtp} variant="contained" sx={{backgroundColor: '#697565'}}>
                        Confirm Otp
                    </Button>
                )}
                {activeStep === 2 && (
                    <Button onClick={handlePassword} variant="contained" sx={{backgroundColor: '#697565'}}>
                        Update Password
                    </Button>
                )}
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
        </Dialog>
    );
};

export default StepperDialog;
