import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Box, Typography, Stepper, Step, StepLabel, TextField, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import { api } from '../../Global/localhost'

const steps = ['Enter OTP', 'Confirmation'];

const StepperDialog = ({ open, onClose, email }) => {
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [otp, setOtp] = useState();

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    const handleConfirm = async (data) => {
        console.log(otp);
        if(!otp){
            setSnackbarMessage("OTP is required");
            setSnackbarSeverity('error');
            return;
        }
        setLoading(true);
        try{
            const response = await axios.post(`${api}/users/verify-otp`, {email, otp});
            console.log(response.data);  
            console.log(activeStep)
            setActiveStep(activeStep+1)            
        } catch(error){
            setSnackbarMessage(error.response?.data?.message || "Something went wrong");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <Backdrop open={loading} onClick={console.log("processing")} sx={{zIndex: '10'}}>
                <CircularProgress color='inherit' />
            </Backdrop>
            <DialogTitle>Registration Confirmation</DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep} alternativeLabel sx={{'& .Mui-active .MuiStepIcon-root': {color: '#697565'},'& .Mui-completed .MuiStepIcon-root': {color: '#697565'}}} >
                    {steps.map(label => (
                        <Step key={label} >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box mt={1}>
                    {activeStep === 0 && (
                        <Box>
                            <Typography>Enter the OTP sent to your email:</Typography>
                            <TextField fullWidth label="OTP" variant="outlined" margin="normal" size='small' color='#697565' required onChange={(e) => setOtp(e.target.value)}/>
                        </Box>
                    )}
                    {activeStep === 1 && (
                        <Box>
                            <Typography>User verification successful!!<br/> You can continue logging in using your email and password </Typography>
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <Box display="flex" justifyContent="flex-end" p={2}>
                {activeStep === 0 && (
                    <Button onClick={handleConfirm} sx={{color: '#697565'}}>
                        Confirm
                    </Button>
                )}
                {activeStep === 1 && (
                    <Button onClick={onClose} variant="contained" sx={{backgroundColor: '#697565'}}>
                        Finish
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
