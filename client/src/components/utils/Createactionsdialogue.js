import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import HelpRequestsDialog from '../ActionDialogs/HelpRequestsDialog'
import ResourceDialog from '../ActionDialogs/ResourceDialog'
import EventDialog from '../ActionDialogs/EventDialog'

const Createactionsdialogue = ({open, handleClose, tabIdentifier, userData}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth >
      <DialogTitle sx={{background: '#697565', color: 'white'}}>
        { tabIdentifier === "help" ? (<Typography sx={{fontSize: '1.2rem'}}>Create Help Requests</Typography>) :
          tabIdentifier === "resource" ? (<Typography sx={{fontSize: '1.2rem'}}>Request Resource</Typography>) :
          tabIdentifier === "event" ? (<Typography sx={{fontSize: '1.2rem'}}>Schedule Event</Typography>) : 
          (<Typography>Nothing Specified</Typography>)}
      </DialogTitle>
      <DialogContent>
        { tabIdentifier === "help" ? (<HelpRequestsDialog userid={userData} />) :
          tabIdentifier === "resource" ? (<ResourceDialog userid={userData} />) :
          tabIdentifier === "event" ? (<EventDialog userid={userData} />) : 
          (<Typography>Nothing found!!</Typography>)}
      </DialogContent>
    </Dialog>
  )
}

export default Createactionsdialogue