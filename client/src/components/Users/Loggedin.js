import { Box, Drawer, Fade, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
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
import Dashboard from './InnerPages/Dashboard';
import Helprequests from './InnerPages/HelpRequests';
import Resourcesharing from './InnerPages/ResourceSharing';
import Events from './InnerPages/Events';

const Loggedin = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchor, setAnchor] = useState();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {dark, setdark} = useContext(MyContext)
    const [nowOpen, setNowOpen] = useState(1);

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
        <Box sx={{display: 'flex', height: '4rem', width: '100vw', backgroundColor: '#3C3D37', justifyContent: 'space-between', color: 'white', position: 'fixed', zIndex: '100'}}>
            <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                <IconButton onClick={handleOpenDrawer}>
                    {!drawerOpen ? (
                        <MenuIcon sx={{color: 'white', padding: '1rem', fontSize: '1.7rem'}}/>
                    ) : (
                        <MenuOpenIcon sx={{color: 'white', padding: '1rem', fontSize: '1.7rem'}} />
                    )}
                </IconButton>
                <Typography sx={{fontSize: '1.5rem',  userSelect: 'none'}}>NeighbourNet.</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '2rem'}}>
                <Tooltip title={"Will be updated soon"} arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                    <IconButton>
                        <NotificationsIcon sx={{fontSize: '1.7rem', padding: '.5rem', color: 'white'}} />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Will be updated soon"} arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                    <IconButton>
                        <ChatIcon sx={{fontSize: '1.7rem', padding: '.5rem', color: 'white'}} />
                    </IconButton>
                </Tooltip>
                <IconButton onClick={handleProfileMenu}>
                    <AccountCircleIcon sx={{fontSize: '1.7rem', padding: '.5rem', color: 'white'}} />
                </IconButton>
                <Menu TransitionComponent={Fade} TransitionProps={{timeout: 600}} open={menuOpen} onClose={handleOnMenuClose} anchorEl={anchor}
                 >
                    <MenuItem sx={{backgroundColor: '#3C3D37'}} >
                        <AccountCircleIcon sx={{fontSize: '1.7rem', padding: '.5rem', color: '#fff'}} />
                        <Typography sx={{fontSize: '1.1rem', padding: '0 2rem 0 1rem', color: '#fff'}}>Profile</Typography>
                    </MenuItem>
                    <MenuItem sx={{backgroundColor: '#3C3D37'}}  >
                        <SettingsIcon sx={{fontSize: '1.7rem', padding: '.5rem', color: '#fff'}} />
                        <Typography sx={{fontSize: '1.1rem', padding: '0 2rem 0 1rem', color: '#fff'}}>Settings</Typography>
                    </MenuItem>
                    <MenuItem sx={{backgroundColor: '#3C3D37'}}  >
                        <LogoutIcon sx={{fontSize: '1.7rem', padding: '.5rem', color: '#fff'}} />
                        <Typography sx={{fontSize: '1.1rem', padding: '0 2rem 0 1rem', color: '#fff'}}>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
        <Box sx={{backgroundColor: '#1E201E', display: 'flex', width: '100vw', height: 'calc(100vh - 4rem)'}}>
            <Drawer variant='permanent' open={drawerOpen} onClose={handleDrawerClose} sx={{width: drawerOpen ? '15rem' : '4.5rem', position: 'fixed', top: '4rem', zIndex: '100', height: 'calc(100vh - 4rem)', borderTop: '2px solid #1E201E', transition: 'width 0.5s ease', flexShrink: 0, [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' }}}>
                <div className='userDrawer' style={{height: 'calc(100% - 5rem)', justifyContent: 'center'}}>
                    <Tooltip title={'Dashboard'} placement='right' arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                        <ListItemButton className='listButton' onClick={() => {setNowOpen(1)}} sx={{maxHeight: '5rem'}}>
                            <List sx={{display: 'flex'}}>
                                <ListItemIcon sx={{paddingLeft: '.5rem', alignItems: 'center'}}>
                                    <DashboardIcon sx={{fontSize: '1.7rem', color: '#fff'}} />
                                </ListItemIcon>
                                <ListItemText sx={{color: 'white', textWrap: 'nowrap'}}>
                                    <Typography sx={{fontSize: '1.1rem'}}>Dashboard</Typography>
                                </ListItemText>
                            </List>
                        </ListItemButton>
                    </Tooltip>
                    <Tooltip title={'Help Request'} placement='right' arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                        <ListItemButton className='listButton' onClick={() => {setNowOpen(2)}} sx={{maxHeight: '5rem'}}>
                            <List sx={{display: 'flex'}}>
                                <ListItemIcon sx={{paddingLeft: '.5rem', alignItems: 'center'}}>
                                    <HearingIcon sx={{fontSize: '1.7rem', color: '#fff'}} />
                                </ListItemIcon>
                                <ListItemText sx={{color: 'white', textWrap: 'nowrap'}}>
                                    <Typography sx={{fontSize: '1.1rem'}}>Help Requests</Typography>
                                </ListItemText>
                            </List>
                        </ListItemButton>
                    </Tooltip>
                    <Tooltip title={'Resource Sharing'} placement='right' arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                        <ListItemButton className='listButton' onClick={() => {setNowOpen(3)}} sx={{maxHeight: '5rem'}}>
                            <List sx={{display: 'flex'}}>
                                <ListItemIcon sx={{paddingLeft: '.5rem', alignItems: 'center'}}>
                                    <VolunteerActivismIcon sx={{fontSize: '1.7rem', color: '#fff'}} />
                                </ListItemIcon>
                                <ListItemText sx={{color: 'white', textWrap: 'nowrap'}}>
                                    <Typography sx={{fontSize: '1.1rem'}}>Resource Sharing</Typography>
                                </ListItemText>
                            </List>
                        </ListItemButton>
                    </Tooltip>
                    <Tooltip title={'Events'} placement='right' arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                        <ListItemButton className='listButton' onClick={() => {setNowOpen(4)}} sx={{maxHeight: '5rem'}}>
                            <List sx={{display: 'flex'}}>
                                <ListItemIcon sx={{paddingLeft: '.5rem', alignItems: 'center'}}>
                                    <LocalActivityIcon sx={{fontSize: '1.7rem', color: '#fff'}} />
                                </ListItemIcon>
                                <ListItemText sx={{color: 'white', textWrap: 'nowrap'}}>
                                    <Typography sx={{fontSize: '1.1rem'}}>Events</Typography>
                                </ListItemText>
                            </List>
                        </ListItemButton>
                    </Tooltip>
                </div>
                <div>
                    <ListItemButton className='listButton' onClick={handleDarkTrigger} sx={{maxHeight: '5rem'}}>
                        <Tooltip title={'Will be updated soon'} placement='top' arrow disableInteractive TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                            <List sx={{display: 'flex'}}>
                                <ListItemIcon sx={{paddingLeft: '.5rem', alignItems: 'center'}}>
                                    {dark ? (
                                        <DarkModeIcon sx={{fontSize: '1.7rem', color: '#fff'}} />
                                    ) : (
                                        <ContrastIcon sx={{fontSize: '2rem', color: '#fff'}} />
                                    )}
                                </ListItemIcon>
                                <ListItemText sx={{color: 'white', textWrap: 'nowrap'}}>
                                    <Typography sx={{fontSize: '1.1rem'}}>Switch Theme</Typography>
                                </ListItemText>
                            </List>
                        </Tooltip>
                    </ListItemButton>
                </div>
            </Drawer>
            <Box sx={{position: 'relative', boxSizing: 'border-box', width: drawerOpen ? 'calc(100vw - 15rem)' :'calc(100vw - 4rem)', left: drawerOpen ? '15rem' : '4.5rem', top: '4rem', transition: 'all 0.5s ease'}}>
                {nowOpen === 1 ? (<Dashboard/>) : 
                nowOpen === 2? (<Helprequests/>) :
                nowOpen === 3? (<Resourcesharing/>) :
                nowOpen === 4? (<Events/>) : null}
            </Box>
        </Box>
    </div>
  )
}

export default Loggedin