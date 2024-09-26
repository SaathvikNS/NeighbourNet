import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import './style.css';
import Header from '../Header';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Footer from '../Footer';

const Contact = () => {
  return (
    <div>
      <section id='title'>
        <Header />
        <img src='/assets/contactbg.jpg' style={{ position: 'absolute', width: '100vw', objectFit: 'cover', zIndex: '-10' }} alt='Contact Background'></img>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh', width: '100vw', paddingTop: '6rem' }}>
          <Typography sx={{ fontSize: '5rem', display: 'flex', paddingTop: '8rem', color: 'white' }}>Contact Us</Typography>
          <IconButton className='action' href='#form'>
            <KeyboardArrowDownIcon sx={{ color: 'white', fontSize: '3rem', paddingTop: '2rem' }} />
          </IconButton>
        </Box>
        <div className='bottom'></div>
      </section>

      <section id='form' className='a'>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '2rem' }}>
          <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: '4rem', color: '#ECDFCC' }}>Get in Touch</Typography>
            <Typography sx={{ color: 'white', fontSize: '1.5rem', textAlign: 'justify', marginTop: '1rem' }}>
              We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out using the form below or through our contact details.
            </Typography>
            <Divider sx={{ margin: '2rem 0', backgroundColor: 'white' }} />
            <form>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                sx={{ marginBottom: '1rem' }}
                required
                InputProps={{
                  style: { color: 'white' }
                }}
                InputLabelProps={{
                  style: { color: '#ECDFCC' }
                }}
              />
              <TextField
                fullWidth
                label="Your Email"
                variant="outlined"
                sx={{ marginBottom: '1rem' }}
                required
                InputProps={{
                  style: { color: 'white' }
                }}
                InputLabelProps={{
                  style: { color: '#ECDFCC' }
                }}
              />
              <TextField
                fullWidth
                label="Your Message"
                variant="outlined"
                multiline
                rows={4}
                required
                InputProps={{
                  style: { color: 'white' }
                }}
                InputLabelProps={{
                  style: { color: '#ECDFCC' }
                }}
              />
              <Button variant="contained" color="primary" sx={{ marginTop: '1rem' }} type="submit">
                Send Message
              </Button>
            </form>
          </Box>

          <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '40rem', alignSelf: 'center' }} />
          
          <Box sx={{ width: '30%', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
            <Typography sx={{ fontSize: '2rem', color: 'white', paddingBottom: '1rem' }}>Contact Details</Typography>
            <Typography sx={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Email: contact@neighbournet.com</Typography>
            <Typography sx={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Phone: +123 456 7890</Typography>
            <Typography sx={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Address: 123 Community Lane, Neighbourhood City, NC 12345</Typography>
          </Box>
        </Box>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
