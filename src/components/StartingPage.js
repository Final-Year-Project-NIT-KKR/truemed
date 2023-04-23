import React from 'react'
import {Button,Stack,Box} from '@mui/material'
import { useNavigate } from 'react-router-dom'
function StartingPage() {
    const navigate = useNavigate()
  return (
        <Box sx={{
          m: 'auto',
          width: 500,
          p: 1,
          
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
          
        }}>
        <Stack spacing={5}  >
        <Button variant="contained" size="medium" sx={{ color: 'white'}} onClick={()=>navigate('/admin')} >Admin</Button>
        <Button variant="contained" size="medium" sx={{ color: 'white' }} onClick={()=>navigate('/business')}  >Bussiness</Button>
        <Button variant="contained" size="medium" sx={{ color: 'white' }} onClick={()=>navigate('/customer')} >Customers</Button>
        </Stack>
        </Box>
  )
}

export default StartingPage