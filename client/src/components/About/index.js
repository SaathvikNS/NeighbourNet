import { Box, Divider, IconButton, Typography } from '@mui/material'
import React from 'react'
import './style.css'
import Header from '../Header'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Footer from '../Footer';

const About = () => {
  return (
    <div>
        <section id='title'>
            <Header/>
            <img src='/assets/aboutbg.jpg' style={{position: 'absolute', width: '100vw', objectFit: 'cover', zIndex: '-10'}}></img>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh', width: '100vw', paddingTop: '6rem' }}>
                <Typography sx={{fontSize: '5rem',display: 'flex', paddingTop: '8rem', color: 'white'}}>About Us</Typography>
                <IconButton className='action' href='#welcome'>
                    <KeyboardArrowDownIcon sx={{color: 'white', fontSize: '3rem', paddingTop: '2rem'}}/>
                </IconButton>
            </Box>
            <div className='bottom'></div>
        </section>
        <section id='welcome' className='a'>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontSize: '4rem',color: '#ECDFCC'}}>Welcome to<br/> NeighbourNet.</Typography>
                    <IconButton className='action' href='#story'>
                        <KeyboardArrowDownIcon sx={{color: '#ECDFCC', fontSize: '3rem', paddingTop: '2rem'}}/>
                    </IconButton>
                </Box>
                <Divider  orientation='vertical' sx={{backgroundColor: 'white', height: '40rem'}} />
                <Typography sx={{width: '50%', color: 'white', fontSize: '2rem', textAlign: 'justify'}}>
                    At NeighborNet, we are dedicated to fostering a vibrant and supportive community through innovative solutions. Our goal is to create a platform that brings neighbors together, enabling them to help one another, share resources, and engage in local events.
                </Typography>
            </Box>
        </section>
        <section id='story' className='a'>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <Typography sx={{width: '50%', color: 'white', fontSize: '2rem', textAlign: 'justify'}}>
                Founded in 2024, NeighborNet began with a simple vision: to connect people within neighborhoods and enhance community living. Inspired by the growing need for local support networks, we set out to build a comprehensive platform that could serve as a hub for assistance, resource sharing, and community engagement. From our initial concept to our current platform, we’ve grown thanks to the dedication of our team and the support of our users.
                </Typography>
                <Divider  orientation='vertical' sx={{backgroundColor: 'white', height: '40rem'}} />
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontSize: '4rem',color: '#ECDFCC'}}>Our Story</Typography>
                    <IconButton className='action' href='#things'>
                        <KeyboardArrowDownIcon sx={{color: '#ECDFCC', fontSize: '3rem', paddingTop: '2rem'}}/>
                    </IconButton>
                </Box>
            </Box>
        </section>
        <section id='things' className='a'>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontSize: '4rem',color: '#ECDFCC'}}>What we do !</Typography>
                    <IconButton className='action' href='#visionvalue'>
                        <KeyboardArrowDownIcon sx={{color: '#ECDFCC', fontSize: '3rem', paddingTop: '2rem'}}/>
                    </IconButton>
                </Box>
                <Divider  orientation='vertical' sx={{backgroundColor: 'white', height: '40rem'}} />
                <Typography sx={{width: '50%', color: 'white', fontSize: '1.5rem', textAlign: 'justify'}}>
                NeighborNet specializes in creating connections within communities. Our platform offers features such as:
                <ul>
                    <li style={{paddingBottom: '1rem'}}>Help Requests: Users can post and respond to requests for help within their neighborhood, creating a network of support.</li>
                    <li style={{paddingBottom: '1rem'}}>Resource Sharing: Community members can borrow and lend items like books, tools, and more, promoting a culture of sharing.</li>
                    <li style={{paddingBottom: '1rem'}}>Community Events: Discover and participate in local events and gatherings, fostering a sense of community and belonging.</li>
                    <li style={{paddingBottom: '1rem'}}>Volunteer Coordination: Organize and find volunteers for neighborhood activities, making it easier to get involved and contribute.</li>
                </ul>

                </Typography>
            </Box>
        </section>
        <section id='visionvalue' className='a'>
            <Box sx={{height: '100%', width: '100%', display: 'flex', justifyContent: 'space-evenly'}}>
                <Box sx={{maxWidth: '40%', display: 'flex', alignItems: 'center', flexDirection: 'column', paddingTop: '2rem'}}>
                    <Typography variant='h3' sx={{color: '#ECDFCC', paddingBottom: '2rem'}}> Our Values</Typography>
                    <Typography sx={{color: 'white', fontSize: '1.5rem', textAlign: 'justify'}}>
                    At NeighborNet, we believe in:
                    <ul>
                        <li>Community: Building strong, supportive networks where everyone feels connected.</li>
                        <li>Empathy: Understanding and responding to the needs of our neighbors with kindness and respect.</li>
                        <li>Innovation: Continuously improving our platform to better serve our users and adapt to changing needs.</li>
                        <li>Inclusivity: Ensuring our platform is accessible and welcoming to all members of the community.</li>
                    </ul>

                    </Typography>
                </Box>
                <Divider  orientation='vertical' sx={{backgroundColor: 'white', height: '100%', alignSelf: 'center'}} />
                <Box sx={{maxWidth: '40%', display: 'flex', alignItems: 'center', flexDirection: 'column', paddingTop: '2rem'}}>
                    <Typography variant='h3' sx={{color: '#ECDFCC', paddingBottom: '2rem'}}> Our Vision</Typography>
                    <Typography sx={{color: 'white', fontSize: '1.5rem', textAlign: 'justify'}}>
                    We envision a future where every neighborhood is a thriving, supportive community. Through NeighborNet, we are working towards a world where people can easily connect, share resources, and make a positive impact on those around them. We are excited about the possibilities ahead and are committed to making this vision a reality.
                    </Typography>
                </Box>
            </Box>
            <Footer />
        </section>
    </div>
  )
}

export default About