import React from 'react'
import { Stack} from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import '../App.css'
function AddNewMed() {
  return (
    <div>
        <Box >
        <h2>Register WW New Medicine</h2>
        <hr/>
        <Stack spacing={2}>
        <TextField id="outlined-basic" label="WMedicineId" variant="outlined" />
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <TextField id="outlined-basic" label="type" variant="outlined" />
        <TextField id="outlined-basic" label="Brand" variant="outlined" />
        <TextField id="outlined-basic" label="NDCNum" variant="outlined" />
            

        </Stack>
        </Box>
    </div>
  )
}

export default AddNewMed