// StepperDialog.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Box, Typography, Stepper, Step, StepLabel, TextField } from '@mui/material';

const steps = ['Enter Email', 'Enter OTP', 'Set Password'];

const StepperDialog = ({ open, onClose }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            onClose();
        } else {
            setActiveStep(prevStep => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(prevStep => prevStep - 1);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
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
                            <TextField fullWidth label="Email" variant="outlined" margin="normal" size='small' color='#697565' type='email' required />
                        </Box>
                    )}
                    {activeStep === 1 && (
                        <Box>
                            <Typography>Enter the OTP sent to your email:</Typography>
                            <TextField fullWidth label="OTP" variant="outlined" margin="normal" size='small' color='#697565' required />
                        </Box>
                    )}
                    {activeStep === 2 && (
                        <Box>
                            <TextField fullWidth label="New Password" variant="outlined" margin="normal" size='small' color='#697565' type='password' required />
                            <TextField fullWidth label="Confirm New Password" variant="outlined" margin="normal" size='small' color='#697565' type='password' required />
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <Box display="flex" justifyContent="flex-end" p={2}>
                <Button onClick={handleBack} disabled={activeStep === 0} sx={{color: '#697565'}}>
                    Back
                </Button>
                <Button onClick={handleNext} variant="contained" sx={{backgroundColor: '#697565'}}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </Dialog>
    );
};

export default StepperDialog;
