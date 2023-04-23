import React from 'react'
import {Button,Stack,Box} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {login} from '../data_providers/user_data_provider'





function StartingPage() {
    const navigate = useNavigate()
    async function handleAdminClick(){
      await login("admin")
      navigate('/admin')
    }
    
    async function handleBusinessClick(){
      await login("business")
      navigate('/business')
    }
    
    async function handleCustomerClick(){
      await login("customer")
      navigate('/customer')
    }
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
        <Button variant="contained" size="medium" sx={{ color: 'white'}} onClick={()=>handleAdminClick()} >Admin</Button>
        <Button variant="contained" size="medium" sx={{ color: 'white' }} onClick={()=>handleBusinessClick()}  >Bussiness</Button>
        <Button variant="contained" size="medium" sx={{ color: 'white' }} onClick={()=>handleCustomerClick()} >Customer</Button>
        </Stack>
        </Box>
  )
}

export default StartingPage