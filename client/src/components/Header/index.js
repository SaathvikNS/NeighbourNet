import React, { useState, useEffect } from 'react';
import './style.css';
import { AppBar, Toolbar, Typography, Button, Tooltip, Fade, Menu, MenuItem, IconButton } from '@mui/material';
import DarkModeSharpIcon from '@mui/icons-material/DarkModeSharp';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import LoginRegisterDialog from '../utils/Logindialogue';

const Header = (props) => {
    const [open, setOpen] = useState(false);
    const [scrollingDown, setScrollingDown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const appbarstyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        padding: '0 2rem',
        background: 'linear-gradient(45deg,#54545466, #54545422)',
        borderRadius: '10px',
        backdropFilter: 'blur(5px)',
        maxWidth: '80%',
        margin: 'auto',
        position: 'fixed',
        top: '1rem',
        left: 0,
        right: 0,
        transition: 'transform 0.3s ease',
        transform: scrollingDown ? 'translateY(-7rem)' : 'translateY(0)',
        '@media (max-width:600px)': {
            background: 'none',
            backdropFilter: 'none',
            boxShadow: 'none'
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrollingDown(true);
            } else {
                setScrollingDown(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
        setAnchorEl(null);
    };

    return (
        <div>
            <AppBar className='appbar' sx={appbarstyle}>
                <Toolbar>
                    <Typography sx={{ fontFamily: 'Inder', fontSize: '1.5rem', '@media (max-width:600px)':{display:'none'}}}>
                        NeighbourNet.
                    </Typography>
                </Toolbar>
                <div className='navigation'>
                    <div className='wide'>
                        <Button color='#fff' sx={{ fontSize: '1.1rem' }} component={Link} to={"/"} >Home</Button>
                        <Button color='#fff' sx={{ fontSize: '1.1rem' }} component={Link} to={"/about"} >About</Button>
                        <Button color='#fff' sx={{ fontSize: '1.1rem' }}>Contact Us</Button>
                        <Button color='#fff' sx={{ fontSize: '1.1rem' }} onClick={handleClickOpen} >Login/Register</Button>
                        <Tooltip title="This feature will be available soon" arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                            <Button color='#fff' sx={{ fontSize: '1rem' }} >
                                <DarkModeSharpIcon fontSize='medium' className='theme' />
                            </Button>
                        </Tooltip>
                    </div>
                    <div className='hamburger'>
                        <IconButton onClick={handleMenuOpen}>
                            {menuOpen ? (<CloseIcon sx={{ fontSize: '2rem', color: 'white' }} />) : (<MenuIcon sx={{ fontSize: '2rem', color: 'white' }} />)}
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={menuOpen}
                            onClose={handleMenuClose}
                            PaperProps={{
                                sx: {
                                    marginTop: '0.5rem',
                                    backgroundColor: '#323232',
                                    color: '#fff',
                                    borderRadius: '10px',
                                    boxShadow: 'none',
                                    backdropFilter: 'blur(5px)',
                                },
                            }}
                        >
                            <MenuItem sx={{ padding: '10px 20px' }} onClick={handleMenuClose} component={Link} to={"/about"}>About</MenuItem>
                            <MenuItem sx={{ padding: '10px 20px' }} onClick={handleMenuClose}>Contact Us</MenuItem>
                            <MenuItem sx={{ padding: '10px 20px' }} onClick={handleMenuClose}>Login/Register</MenuItem>
                            <MenuItem sx={{ padding: '10px 20px' }} onClick={handleMenuClose}>Switch Theme</MenuItem>
                        </Menu>
                    </div>
                </div>
            </AppBar>
            <LoginRegisterDialog open={open} handleClose={handleClose} />
        </div>
    );
};

export default Header;
