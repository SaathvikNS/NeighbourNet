import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Box, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
import { IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import StepperDialog from '../utils/stepper';
import { useNavigate } from 'react-router-dom';
import RegisterStepper from '../utils/Registerstepper'
import axios from 'axios'
import { api } from '../../Global/localhost'
import { MyContext } from '../../Global/Context';

const Login = () => {
    const {setLoggedIn} = useContext(MyContext)
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [openStepper, setOpenStepper] = useState(false);
    const [openRegisterStepper, setOpenRegisterStepper] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = () => {
        setOpenStepper(true);
    };

    const handleCloseStepper = () => {
        setOpenStepper(false);
    };

    const handleRegisterStepperClose = () => {
        setOpenRegisterStepper(false);
    }

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await axios.post(`${api}/users/login`, {email, password})
            console.log(response.data);
            if(response.data.message === 'verify'){
                setOpenRegisterStepper(true)
            } else{
                console.log("Logged in");
                setLoggedIn(true);
                navigate('/user');
            }
        } catch (error){
            setSnackbarMessage(error.response?.data?.message || "Something went wrong")
            setSnackbarSeverity('error')
            setSnackbarOpen(true)
            return;
        }
        setLoading(false);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box 
            component="form" 
            onSubmit={handleLogin} 
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400, margin: 'auto', padding: 2, boxSizing: 'border-box'}}>
            <Backdrop open={loading} onClick={console.log("processing")} sx={{zIndex: '10'}}>
                <CircularProgress color='inherit' />
            </Backdrop>
            <TextField label="Email" variant="outlined" type="email" color='#697565' value={email} onChange={(e) => setEmail(e.target.value)} fullWidth size='small' required/>
            <FormControl variant="outlined" fullWidth size='small'>
                <InputLabel htmlFor="password" sx={{color: 'text.secondary','&.Mui-focused': {color: '#697565'}}}>Password *</InputLabel>
                <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    color='#697565'
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <div style={{marginTop: '-10px', alignSelf: 'flex-end'}}>
                <Typography variant="body2" color='#697565' onClick={handleForgotPassword} sx={{cursor: 'pointer'}}>
                    Forgot password?
                </Typography>
            </div>
            <Button variant="contained" type="submit" sx={{ mt: 2, backgroundColor: '#697565', color: '#fff', '&:hover': { backgroundColor: '#3C3D37' } }}>
                Login
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <StepperDialog open={openStepper} onClose={handleCloseStepper} />
            <RegisterStepper open={openRegisterStepper} onClose={handleRegisterStepperClose} email={email} />
        </Box>
    );
};

export default Login;
