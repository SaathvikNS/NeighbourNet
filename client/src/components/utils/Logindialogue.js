// src/utility/LoginRegisterDialog.js

import React, { useState } from 'react';
import { Dialog, AppBar, Tabs, Tab, Box, DialogContent } from '@mui/material';
import Login from '../Login'; 
import Register from '../Register'; 
import './style.css'; 

const TabPanel = ({ children, value, index }) => {
    return (
        <div hidden={value !== index}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
};

const LoginRegisterDialog = ({ open, handleClose }) => {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth >
            <AppBar position="static" className="customAppBar">
                <Tabs 
                    value={tabValue} 
                    onChange={handleChange} 
                    variant="fullWidth" 
                    indicatorColor="primary" 
                    textColor="inherit"
                    className="customTabs"
                    sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#6A9C89',
                        },
                    }}
                >
                    <Tab label="Login" className="customTab" />
                    <Tab label="Register" className="customTab" />
                </Tabs>
            </AppBar>
            <DialogContent>
                <TabPanel value={tabValue} index={0}>
                    <Login />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Register />
                </TabPanel>
            </DialogContent>
        </Dialog>
    );
};

export default LoginRegisterDialog;
