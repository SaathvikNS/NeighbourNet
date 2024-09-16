import { Box, Drawer, Fade, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import './style.css';
import React, { useContext, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HearingIcon from '@mui/icons-material/Hearing';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ContrastIcon from '@mui/icons-material/Contrast';
import { MyContext } from '../../Global/Context';

const Loggedin = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchor, setAnchor] = useState();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {dark, setdark} = useContext(MyContext)

    const handleOpenDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    }
    const handleOnMenuClose = () => {
        setMenuOpen(false);
    }
    const handleProfileMenu = (event) => {
        setMenuOpen(true);
        setAnchor(event.currentTarget)
    }
    const handleDarkTrigger = () => {
        // setdark(!dark);
    }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', height: '4rem', width: '100vw', backgroundColor: '#3C3D37', justifyContent: 'space-between', color: 'white'}}>
            <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                <IconButton onClick={handleOpenDrawer}>
                    {!drawerOpen ? (
                        <MenuIcon sx={{color: 'white', padding: '1rem', fontSize: '2rem'}}/>
                    ) : (
                        <MenuOpenIcon sx={{color: 'white', padding: '1rem', fontSize: '2rem'}} />
                    )}
                </IconButton>
                <Typography sx={{fontSize: '1.5rem', fontWeight: 'bold', userSelect: 'none'}}>NeighbourNet.</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '2rem'}}>
                <Tooltip title={"Will be updated soon"} arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                    <IconButton>
                        <NotificationsIcon sx={{fontSize: '2rem', padding: '.5rem', color: 'white'}} />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Will be updated soon"} arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                    <IconButton>
                        <ChatIcon sx={{fontSize: '2rem', padding: '.5rem', color: 'white'}} />
                    </IconButton>
                </Tooltip>
                <IconButton onClick={handleProfileMenu}>
                    <AccountCircleIcon sx={{fontSize: '2rem', padding: '.5rem', color: 'white'}} />
                </IconButton>
                <Menu TransitionComponent={Fade} TransitionProps={{timeout: 600}} open={menuOpen} onClose={handleOnMenuClose} anchorEl={anchor} >
                    <MenuItem sx={{backgroundColor: '#3C3D37'}} >
                        <AccountCircleIcon sx={{fontSize: '2rem', padding: '.5rem', color: '#fff'}} />
                        <Typography sx={{fontSize: '1.2rem', padding: '0 2rem 0 1rem', color: '#fff'}}>Profile</Typography>
                    </MenuItem>
                    <MenuItem sx={{backgroundColor: '#3C3D37'}}  >
                        <SettingsIcon sx={{fontSize: '2rem', padding: '.5rem', color: '#fff'}} />
                        <Typography sx={{fontSize: '1.2rem', padding: '0 2rem 0 1rem', color: '#fff'}}>Settings</Typography>
                    </MenuItem>
                    <MenuItem sx={{backgroundColor: '#3C3D37'}}  >
                        <LogoutIcon sx={{fontSize: '2rem', padding: '.5rem', color: '#fff'}} />
                        <Typography sx={{fontSize: '1.2rem', padding: '0 2rem 0 1rem', color: '#fff'}}>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
        <Box sx={{backgroundColor: '#1E201E', display: 'flex', width: '100vw', height: 'calc(100vh - 4rem)'}}>
            <Drawer variant='permanent' open={drawerOpen} onClose={handleDrawerClose} sx={{width: !drawerOpen ? '5rem' : '17rem',height: 'calc(100vh - 4rem)', borderTop: '2px solid #1E201E', transition: 'width 0.5s ease', flexShrink: 0, [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' }}}>
                <div style={{height: 'calc(100% - 5rem)'}}>
                    <Tooltip title={'Dashboard'} placement='right' arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                        <ListItemButton className='listButton' sx={{maxHeight: '5rem'}}>
                            <List sx={{display: 'flex'}}>
                                <ListItemIcon sx={{paddingLeft: '.5rem'}}>
                                    <DashboardIcon sx={{fontSize: '2rem', color: '#fff'}} />
                                </ListItemIcon>
                                <ListItemText sx={{color: 'white', textWrap: 'nowrap'}}>
                                    <Typography sx={{fontSize: '1.2rem'}}>Dashboard</Typography>
                                </ListItemText>
                            </List>
                        </ListItemButton>
                    </Tooltip>
                    <Tooltip title={'Help Request'} placement='right' arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                        <ListItemButton className='listButton' sx={{maxHeight: '5rem'}}>
                            <List sx={{display: 'flex'}}>
                                <ListItemIcon sx={{paddingLeft: '.5rem'}}>
                                    <HearingIcon sx={{fontSize: '2rem', color: '#fff'}} />
                                </ListItemIcon>
                                <ListItemText sx={{color: 'white', textWrap: 'nowrap'}}>
                                    <Typography sx={{fontSize: '1.2rem'}}>Help Requests</Typography>
                                </ListItemText>
                            </List>
                        </ListItemButton>
                    </Tooltip>
                    <Tooltip title={'Resource Sharing'} placement='right' arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                        <ListItemButton className='listButton' sx={{maxHeight: '5rem'}}>
                            <List sx={{display: 'flex'}}>
                                <ListItemIcon sx={{paddingLeft: '.5rem'}}>
                                    <VolunteerActivismIcon sx={{fontSize: '2rem', color: '#fff'}} />
                                </ListItemIcon>
                                <ListItemText sx={{color: 'white', textWrap: 'nowrap'}}>
                                    <Typography sx={{fontSize: '1.2rem'}}>Resource Sharing</Typography>
                                </ListItemText>
                            </List>
                        </ListItemButton>
                    </Tooltip>
                    <Tooltip title={'Events'} placement='right' arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                        <ListItemButton className='listButton' sx={{maxHeight: '5rem'}}>
                            <List sx={{display: 'flex'}}>
                                <ListItemIcon sx={{paddingLeft: '.5rem'}}>
                                    <LocalActivityIcon sx={{fontSize: '2rem', color: '#fff'}} />
                                </ListItemIcon>
                                <ListItemText sx={{color: 'white', textWrap: 'nowrap'}}>
                                    <Typography sx={{fontSize: '1.2rem'}}>Events</Typography>
                                </ListItemText>
                            </List>
                        </ListItemButton>
                    </Tooltip>
                </div>
                <div>
                    <ListItemButton className='listButton' onClick={handleDarkTrigger} sx={{maxHeight: '5rem'}}>
                        <Tooltip title={'Will be updated soon'} placement='top' arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                            <List sx={{display: 'flex'}}>
                                <ListItemIcon sx={{paddingLeft: '.5rem'}}>
                                    {dark ? (
                                        <DarkModeIcon sx={{fontSize: '2rem', color: '#fff'}} />
                                    ) : (
                                        <ContrastIcon sx={{fontSize: '2rem', color: '#fff'}} />
                                    )}
                                </ListItemIcon>
                                <ListItemText sx={{color: 'white', textWrap: 'nowrap'}}>
                                    <Typography sx={{fontSize: '1.2rem'}}>Switch Theme</Typography>
                                </ListItemText>
                            </List>
                        </Tooltip>
                    </ListItemButton>
                </div>
            </Drawer>
        </Box>
    </div>
  )
}

export default Loggedin