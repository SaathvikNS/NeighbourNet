import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import StepperDialog from '../utils/stepper';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [openStepper, setOpenStepper] = useState(false);

    const handleForgotPassword = () => {
        setOpenStepper(true);
    };

    const handleCloseStepper = () => {
        setOpenStepper(false);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Add login logic here
        console.log("Logging in with", email, password);
    };

    const handleforgot = (e) => {

    }

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
            <TextField label="Email" variant="outlined" type="email" color='#697565' value={email} onChange={(e) => setEmail(e.target.value)} fullWidth size='small' required/>
            <FormControl variant="outlined" fullWidth size='small'>
                <InputLabel htmlFor="password" sx={{color: 'text.secondary','&.Mui-focused': {color: '#697565'}}}>Password *</InputLabel>
                <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
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
            <Typography variant="body2" align="center" style={{ marginTop: '-10px', alignSelf: 'flex-end'}}>
                    <Typography variant="body2" color='#697565' onClick={handleForgotPassword} sx={{cursor: 'pointer'}}>
                        Forgot password?
                    </Typography>
                </Typography>
            <Button variant="contained" type="submit" sx={{ mt: 2, backgroundColor: '#697565', color: '#fff', '&:hover': { backgroundColor: '#3C3D37' } }}>
                Login
            </Button>

            <StepperDialog open={openStepper} onClose={handleCloseStepper} />
        </Box>
    );
};

export default Login;
