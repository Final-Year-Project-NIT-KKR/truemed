import ResponsiveDrawer from './components/ResponsiveDrawer';
import './App.css';
import * as React from 'react';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Web3 from 'web3'
import { useEffect } from 'react';

async function loadMedicineData(){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const MEDICINE_LIST_ABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "listOfMedicines",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "medicineId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "medicineName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "brandName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "medicineType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ndcNumber",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "numberOfMedicines",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "newMedicineName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "brandName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "medicineType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ndcNumber",
          "type": "string"
        }
      ],
      "name": "addMedicine",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "medicineId",
          "type": "uint256"
        }
      ],
      "name": "deleteMedicine",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  const MEDICINE_LIST_ADDRESS = "0x89622E60c7D4549cf54FFCDF175774eCe1e25010"
  const medicineList = new web3.eth.Contract(MEDICINE_LIST_ABI, MEDICINE_LIST_ADDRESS)
  const medicineCount = await medicineList.methods.numberOfMedicines().call()
  var medicines = []
  for (var i = 1; i <= medicineCount; i++) {
    const medicine = await medicineList.methods.listOfMedicines(i).call()
    medicines.push(medicine);
  }
  return medicines;
}


const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6558',
    },
    secondary: {
      main: '#395B64',
    },
  },
});

function App() {
  return <ThemeProvider theme={theme}>
    <ResponsiveDrawer />
  </ThemeProvider>;
}


// function App() {
//   return (
      
//   );
// }

export {App, loadMedicineData};
