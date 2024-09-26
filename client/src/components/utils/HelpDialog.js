import { Box, Dialog, DialogContent, DialogTitle, List, ListItem, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../../Global/localhost';

const HelpDialog = ({ open, handleClose, data }) => {
    const [responders, setResponders] = useState([]);

    const fetchResponders = async () => {
        if (!data?._id) return;
        try {
            const response = await axios.get(`${api}/actions/get-responders/${data._id}`);
            console.log('responders: ', response.data);
            setResponders(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchResponders();
        }
    }, [open, data]);

    if (!data) {
        return null;
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ background: '#697565', color: 'white' }}>
                {data.title}
            </DialogTitle>
            <DialogContent>
                <Typography sx={{ padding: '1rem 0' }}>{data.description}</Typography>
                <Typography>
                    Posted on: {data.createdAt ? data.createdAt.substring(0, 10).split('-').reverse().join('-') : 'Date not available'}
                </Typography>
                <Typography>Location: {data.location || 'Location not available'}</Typography>
                <Typography>Contact: {data.contact || 'Contact not available'}</Typography>
                <Typography>Responders:</Typography>
                <Box sx={{ maxHeight: '10rem', overflowY: 'auto', background: '#00000011', marginTop: '1rem'}}>
                    <List>
                        {responders.length > 0 ? (
                            responders.map((responder) => (
                                <ListItem key={responder._id} sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography>{responder.name || 'Unnamed Responder'}</Typography>
                                    -
                                    <Typography>{responder.phone|| 'Contact Not Found'}</Typography>
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <Typography>No responders Yet</Typography>
                            </ListItem>
                        )}
                    </List>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default HelpDialog;
