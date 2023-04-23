import React from 'react'
import { Stack,Button } from '@mui/material'
import {TextField} from '@mui/material'
import Box from '@mui/material/Box'
import { useState } from 'react'

function HomeAdmUsers() {
    const [ userID, setUserID ] = useState('')
    const [userStatus , setUserStatus] = useState('')
    const submitOnClick = ()=>{

        setUserStatus('Your are Admin')       
    }
    const handleIdChange = (event)=>{
        setUserID(event.target.value)
    }
  return (
    <div>
        <Box >
        <h2>Enter User ID</h2>
        <hr/>
        <Stack spacing={2}>
        <TextField id="outlined-basic" value={userID} onChange={handleIdChange} label="UserID" variant="outlined"  />
        <Button variant="contained" size="medium" sx={{ color: 'white' }} onClick={submitOnClick} >Sumbit</Button>
        <h3>{userStatus}</h3>
        </Stack>
        </Box>
    </div>
  )
}

export default HomeAdmUsers