import React from 'react'
import { Button, Stack} from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import '../App.css'
import MuiAlert from '@mui/material/Alert';
import { addMedicine, deleteMedicine } from '../data_providers/medicine_data_provider';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function AddNewMed() {
  const [Name, setName] = useState('');
  const [Type, setType] = useState('');
  const [Brand, setBrand] = useState('');
  const [NDCNum, setNDCNum] = useState('');
  const [open, setOpen] = React.useState(false);

    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleTypeChange = event => {
      setType(event.target.value);
  };
  const handleBrandChange = event => {
    setBrand(event.target.value);
};
const handleNDCChange = event => {
  setNDCNum(event.target.value);
};
const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
  const submitOnClick = async()=>{

    await addMedicine(Name, Brand, Type, NDCNum);

    setOpen(true);
    setName('');
    setType('');
    setBrand('');
    setNDCNum('');


  }
  return (
    <div>
        <Box >
        <h2>Register New Medicine</h2>
        <hr/>
        <Stack spacing={2}>
        <TextField id="outlined-basic" value={Name} label="Name" variant="outlined" onChange={handleNameChange} />
        <TextField id="outlined-basic" value={Type} label="Type" variant="outlined" onChange={handleTypeChange} />
        <TextField id="outlined-basic" value={Brand} label="Brand" variant="outlined" onChange={handleBrandChange} />
        <TextField id="outlined-basic" value={NDCNum} label="NDCNum" variant="outlined" onChange={handleNDCChange} />
        <Button variant="contained" size="medium" sx={{ color: 'white' }} onClick={submitOnClick} >Sumbit</Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Medicine Added
        </Alert>
        </Snackbar>
        </Stack>
        </Box>
    </div>
  )
}

export default AddNewMed