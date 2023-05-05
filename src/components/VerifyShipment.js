import React from 'react'
import {Button, Stack } from '@mui/material'
import { useState } from 'react';
import JSQR from 'jsqr';
import { verifyShipment } from '../data_providers/shipment_data_provider';
import QrCode2Icon from '@mui/icons-material/QrCode2';

function VerifyShipment(){

  const [qrData, setQrData] = useState('');

  const handleFileUpload = async (event) => {
    try{
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = JSQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          // setQrData(code.data);
          const code_arr = code.data.split("+")
          if(code_arr.length===2){
            const chainId = code_arr[0]
            const shipmentId = code_arr[1]
            const verificationResult = await verifyShipment(chainId, shipmentId)
            console.log(verificationResult)
            // setQrData(verificationResult)
            if(verificationResult===2){
              setQrData('Shipment already verified, if not verified by you, please check with customer care')
            }else if(verificationResult===0){
              setQrData('Shipment is Original')
            }else if(verificationResult===1){
              setQrData('Shipment does not exist')
            }else{
              setQrData('You are not authorized to verify it')
            }
          }else{
            setQrData('Invalid QR');
          }
        } else {
          setQrData('No QR code found.');
        }
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
  catch(err)
  {
    console.log(err)
  }
  };

  return (
    <div>
      
        <Stack direction="column" alignItems="center" spacing={2}>
        
        {/* <input type="file" accept="image/*"  onChange={handleFileUpload}/> */}
        {/* <Button onClick={handleFileUpload} variant="contained" component="label">
        Upload
        </Button> */}
        <Button style={{color:'white'}} variant="contained" component="label">
        <QrCode2Icon/> Upload Qr
        <input hidden accept="image/*" onChange={handleFileUpload} type="file" />
      </Button>
        <p>{qrData}</p>
        </Stack>
    
    </div>
  )
}

export default VerifyShipment