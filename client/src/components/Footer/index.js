import React from 'react';
import { Container, Box, Typography, Link, IconButton, Tooltip } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <footer style={{width: '100%'}}>
      <Box sx={{ bgcolor: '#1E201E', color: 'white', py: 3, textAlign: 'center' }}>
        <Container>
          <Typography variant="h6">NeighborNet</Typography>

          <Box>
            <Tooltip title="Not yet linked" disableInteractive arrow followCursor>
                <IconButton aria-label="facebook" color="inherit">
                <FacebookIcon />
                </IconButton>
                <IconButton aria-label="twitter" color="inherit">
                <TwitterIcon />
                </IconButton>
                <IconButton aria-label="instagram" color="inherit">
                <InstagramIcon />
                </IconButton>
                <IconButton aria-label="linkedin" color="inherit">
                <LinkedInIcon />
                </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Link href="/about" color="inherit" underline="hover" sx={{ mx: 2 }}>
              About Us
            </Link>
            <Link href="/contact" color="inherit" underline="hover" sx={{ mx: 2 }}>
              Contact
            </Link>
            <Tooltip title="No terms for now">
                <Link color="inherit" underline="hover" sx={{ mx: 2, cursor: 'default' }}>
                Terms of Service
                </Link>
            </Tooltip>
            <Tooltip title="No policies for now">
                <Link color="inherit" underline="hover" sx={{ mx: 2, cursor: 'default' }}>
                Privacy Policies
                </Link>
            </Tooltip>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="inherit">
              &copy; {new Date().getFullYear()} NeighborNet. All Rights Reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
