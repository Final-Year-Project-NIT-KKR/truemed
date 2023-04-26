import React from 'react'
import { Button, Stack} from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import '../App.css'
import MuiAlert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createShipment } from '../data_providers/shipment_data_provider';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function CreateShipment() {
  const [ChainId, setChainId] = useState('');
  const [MedicineId, setMedicineId] = useState('');
  const [ReceiverId, setReceiverId] = useState('');
  const [Delivery, setDelivery] = useState('');
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };
    const handleChainIdChange = event => {
        setChainId(event.target.value);
    };

    const handleMedicineIdChange = event => {
      setMedicineId(event.target.value);
  };
  const handleReceiverIdChange = event => {
    setReceiverId(event.target.value);
};
const handleDeliveryChange = event => {
  setDelivery(event.target.value);
};
const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
  const submitOnClick = async()=>{

    await createShipment(checked, checked? 0: parseInt(ChainId) , parseInt(MedicineId), ReceiverId, Delivery);
    setOpen(true);
    setChainId("");
    setMedicineId("");
    setReceiverId('');
    setDelivery('');


  }
  return (
    <div>
        <Box >
        <h2>Create a New Shipment</h2>
        <hr/>
        
        <Stack spacing={2}>
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleCheckChange} />} label="New Chain" />
        {!checked && <TextField id="outlined-basic" value={ChainId} label="ChainId" variant="outlined" onChange={handleChainIdChange} />}
        <TextField required id="outlined-basic" value={MedicineId} label="MedicineId" variant="outlined" onChange={handleMedicineIdChange} />
        <TextField required id="outlined-basic" value={ReceiverId} label="ReceiverId" variant="outlined" onChange={handleReceiverIdChange} />
        <TextField required id="outlined-basic" value={Delivery} label="Delivery Status" variant="outlined" onChange={handleDeliveryChange} />
        <Button type="submit" variant="contained" size="medium" sx={{ color: 'white' }} onClick={submitOnClick} >Sumbit</Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Shipment Created
        </Alert>
        </Snackbar>
        </Stack>
        </Box>
    </div>
  )
}

export default CreateShipment