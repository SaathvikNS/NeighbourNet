import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Box} from '@mui/material';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        agreeToTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <Box sx={{maxHeight: '50vh'}}>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
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
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    color='#697565'
                    size="small"
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
                    margin="normal"
                    size="small"
                    color='#697565'
                    InputLabelProps={{ shrink: true }}
                />
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
        </Box>
    );
};

export default RegistrationForm;
