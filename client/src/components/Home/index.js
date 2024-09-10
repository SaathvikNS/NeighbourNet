import React, { useContext, useState, useRef } from 'react'
import './style.css'
import { CssBaseline, Button, Container, Typography, CardContent, Card, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2'
import Header from '../Header'
import { MyContext } from '../../Global/Context';
import Footer from '../Footer';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FestivalIcon from '@mui/icons-material/Festival';
import PeopleIcon from '@mui/icons-material/People';
import { Testi } from '../../Global/testi';

const Home = () => {
    const {dark} = useContext(MyContext);

    const features = {
        "Help Requests": ["Users can post and respond to help requests within the neighborhood.", ContactSupportIcon],
        "Resource Sharing": ["Enables community members to borrow and lend items like books, tools, and more.", VolunteerActivismIcon],
        "Community Events": ["Allows users to discover and participate in local events and gatherings.", FestivalIcon],
        "Volunteer Coordination": ["A platform to organize and find volunteers for neighborhood activities.", PeopleIcon]
    }

    const [hoveredCard, setHoveredCard] = useState(null);
    const [circlePos, setCirclePos] = useState({ x: 0, y: 0 });
    const cardRefs = useRef([]);

    const handleMouseMove = (e, index) => {
        if (cardRefs.current[index]) {
            const rect = cardRefs.current[index].getBoundingClientRect();
            setCirclePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    console.log(Testi);

  return (
    <div>
        <CssBaseline />
        <div className='wrapper'>

            <section id='landing' className='section'>
                <img className='bg' src={dark ? '/assets/bg.jpg' : '/assets/bg1.jpg'} alt='Neighbourhood'></img>
                <Header/>
                <div className="title">
                    <Container className='titlecontainer' sx={{maxWidth: '50rem', width: '50vw', '@media(max-width:600px)':{height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}}>
                        <Typography sx={{fontSize: '3.5vw', '@media(max-width:600px)': {fontSize: '10vw'}}} gutterBottom>
                            Welcome to NeighbourNet.
                        </Typography>
                        <Typography sx={{fontSize: '1.5vw', '@media(max-width: 600px)': {fontSize: '3vw'}}}>
                            Where Helping Hands Meet Close to Home
                        </Typography>
                        <Button variant="contained" style={{ margin: '20px', backgroundColor: '#697565' }} href="#features">
                            Get Started
                        </Button>
                    </Container>
                </div>
                <div className='bottom'></div>
            </section>

            <section id='features' className='section'>
                <Box sx={{height:'10vh', marginBottom: '5vh', display:'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontSize: '3vw',color:'#ECDFCC', '@media(max-width: 1080px)': {fontSize: '5vw'}}}>Explore Our Features</Typography>
                </Box>

                <Grid container justifyContent="center" columnGap={20} rowGap={{xs: 20, sm: 10, md: 15, lg: 15}} style={{ height: 'calc(85vh - 100px)'}}>
                    {Object.entries(features).map(([title, [description, IconComponent]], index)=>{
                        return(
                            <Grid item size={{ xs: 12, lg: 4.5 }} sx={{height: '12vw'}}>
                                <Card sx={{position: 'relative', overflow: 'hidden',minWidth: '520px', minHeight: '160px', height: '100%', width: '100%', borderRadius: '30px', backgroundColor: '#3C3D37', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onMouseMove={(e) => handleMouseMove(e, index)} onMouseEnter={() => setHoveredCard(index)} onMouseLeave={() => setHoveredCard(null)} ref={(el) => cardRefs.current[index] = el} >
                                    <CardContent sx={{display: 'flex', gap: '2rem', width:'90%', position: 'relative'}}>
                                        <Box sx={{height: '100%'}}>
                                            <IconComponent sx={{color: '#ECDFCC', fontSize: '3rem'}} />
                                        </Box>
                                        <Box>
                                            <Typography variant='h4' sx={{color: '#ECDFCC', paddingBottom: '1rem'}}>{title}</Typography>
                                            <Typography sx={{fontSize: '1.2rem', color:'white'}}>{description}</Typography>
                                        </Box>
                                    {hoveredCard === index && (
                                        <div
                                            className="circle"
                                            style={{
                                                position: 'absolute',
                                                height: '20vw',
                                                aspectRatio: '1',
                                                background: 'radial-gradient(#ECDFCC39, transparent, transparent)',
                                                transform: 'translate(-50%, -50%)',
                                                top: `${circlePos.y}px`,
                                                left: `${circlePos.x}px`,
                                                borderRadius: '50%',
                                                cursor: 'default'
                                            }}
                                        />)}
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </section>

            <section id='about' className='section'>
                <Box sx={{height:'10vh', marginBottom: '5vh', display:'flex', justifyContent: 'center'}}>
                    <Typography variant="h2" sx={{color:'#ECDFCC'}}>About Us</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Container className='aboutleft'>
                        <Typography sx={{fontSize: '2rem', color: '#ECDFCC', marginBottom: '2rem', textAlign: 'justify'}}>Discover Neighbourhood</Typography>
                        <Typography sx={{fontSize: '1.2rem', color: 'white', textAlign: 'justify', marginBottom: '5rem'}}>
                        At NeighborNet, our mission is to create a more connected and supportive community. We provide a platform where neighbors can easily connect, share resources, and participate in local events, all with the aim of enhancing the quality of life in your neighborhood.
                        </Typography>
                        <Typography sx={{fontSize: '2rem', color: '#ECDFCC', marginBottom: '2rem', textAlign: 'justify'}}>Why NeighborNet?</Typography>
                        <Typography sx={{fontSize: '1.2rem', color: 'white', textAlign: 'justify', marginBottom: '3rem'}}>
                        We believe that strong communities are built on connection and collaboration. NeighborNet empowers you to make a positive impact right where you live, fostering a sense of belonging and shared purpose.
                        </Typography>
                    </Container>
                    <div className='divider'/>
                    <Container>
                        <Typography sx={{fontSize: '2rem', color: '#ECDFCC', marginBottom: '2rem', textAlign: 'justify'}}>What We Offer ?</Typography>                        
                        <Typography sx={{fontSize: '1.2rem', color: 'white', textAlign: 'justify', marginBottom: '3rem'}}>
                            <ul>
                                <li>Help Requests: Quickly post or respond to help requests, ensuring that support is always close at hand.</li>
                                <li>Resource Sharing: Borrow and lend items such as books, tools, and more, fostering a spirit of generosity and cooperation.</li>
                                <li>Community Events: Find and join local events to stay engaged and involved in your community.</li>
                                <li>Volunteer Coordination: Easily organize and find volunteers for neighborhood activities and projects.</li>
                                <li>Neighborhood Skill Exchange:Exchange skills like tutoring, tech support, or handyman services with neighbors. Offer your expertise or find help nearby</li>
                                <li>Local Business Support: Promote and support local businesses by finding nearby services, restaurants, and shops. Encourage a thriving neighborhood economy by keeping it local.</li>
                                <li>Safety Alerts & Updates: Stay informed about safety updates and community alerts to ensure a safe and well-protected neighborhood.</li>
                            </ul>
                        </Typography>
                    </Container>
                </Box>
            </section>

            <section id='testimonials' className='section'>
                <Box sx={{height:'10vh', marginBottom: '5vh', display:'flex', justifyContent: 'center'}}>
                    <Typography variant="h2" sx={{color:'#ECDFCC'}}>What Our Users Say</Typography>
                </Box>
                <Grid container justifyContent={'space-evenly'} gap={1}>
                    {Testi.map((test, index)=>{
                        return(
                            <Grid size={5}>
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', width: '100%', padding: '2rem', backgroundColor: '#3C3D37', borderRadius: '30px'}}>
                                    <Box sx={{display: 'flex', gap: '1rem'}}>
                                        <Box>
                                            <Typography sx={{fontSize: '1.2rem', color: 'white'}}>{test.text}</Typography>
                                            <Divider variant='middle' sx={{backgroundColor: '#ECDFCC', margin: '1rem 0 .5rem 0'}} />
                                            <Typography variant='h6' sx={{color: '#ECDFCC'}}>- {test.name}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
            </section>

            <section id='calltoaction' className='section'>
                <Box sx={{height:'10vh', marginBottom: '4vh', display:'flex', justifyContent: 'center'}}>
                    <Typography variant="h3" sx={{color:'#ECDFCC'}}>Join Us Today</Typography>
                </Box>
                <Typography sx={{color: 'white', fontSize: '1.5vw'}}>
                    Become a part of the NeighborNet community and experience the benefits of a more connected neighborhood. Explore our platform and see how you can contribute to a vibrant and supportive community.
                </Typography>
                <Box sx={{flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant='h4' sx={{color: '#ECDFCC', width: '30vw'}}>Ready to join the community?</Typography>
                    <Divider orientation='vertical' variant='middle' sx={{margin: '0 2rem', backgroundColor: '#ECDFCC' ,height: '10rem'}} />
                    <Box sx={{width: '30vw', display: 'flex', flexDirection: 'column'}}>
                        <Button variant='contained' sx={{width: '10rem', margin: '1.5rem 10rem', backgroundColor: '#697565'}}>Signup</Button>
                        <Button variant='contained' sx={{width: '10rem', margin: '1.5rem 10rem', backgroundColor: '#697565'}}>Learn More</Button>
                    </Box>
                </Box>
                <Footer />
            </section>
        </div>
    </div>
  )
}

export default Home