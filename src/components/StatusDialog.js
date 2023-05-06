import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updateDeliveryStatus } from '../data_providers/shipment_data_provider';
export default function StatusDialog() {
  const [open, setOpen] = React.useState(false);
    const [chainId,setChainId] = React.useState('')
    const [shipmentId,setShipmentId] = React.useState('')
    const [status,setStatus] = React.useState('')
    
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    const response = await updateDeliveryStatus(chainId,shipmentId,status);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" size="small" sx={{ color: 'white'}} onClick={handleClickOpen}>
            Change Status
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add Chain Id,Shipment Id and Updated status in the respected fields
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="chainId"
            label="Chain Id"
            type="number"
            fullWidth
            variant="standard"
            value={chainId}
            onChange={(e)=>setChainId(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="shipmentId"
            label="Shipment Id"
            type="number"
            fullWidth
            variant="standard"
            value={shipmentId}
            onChange={(e)=>setShipmentId(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="status"
            label="Status"
            type="name"
            fullWidth
            variant="standard"
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}