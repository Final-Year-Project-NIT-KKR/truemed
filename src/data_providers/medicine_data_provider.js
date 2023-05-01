import Web3 from 'web3'

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
  const MEDICINE_LIST_ADDRESS = "0x6E586222615b3b034fF316Be6e1AAe63CDEe9934"

async function loadMedicineData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const medicineList = new web3.eth.Contract(MEDICINE_LIST_ABI, MEDICINE_LIST_ADDRESS)
    const medicineCount = await medicineList.methods.numberOfMedicines().call()
    var medicines = []
    for (var i = 1; i <= medicineCount; i++) {
      const medicine = await medicineList.methods.listOfMedicines(i).call()
      medicines.push(medicine);
    }
    return medicines;
  }

async function deleteMedicine(medicineId){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const medicineList = new web3.eth.Contract(MEDICINE_LIST_ABI, MEDICINE_LIST_ADDRESS)
  const gas = await medicineList.methods
      .deleteMedicine(medicineId)
      .estimateGas();
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  await medicineList.methods.deleteMedicine(medicineId).send({from: account, gas})
}
  
async function addMedicine(name, brand, type, ndcNumber){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const medicineList = new web3.eth.Contract(MEDICINE_LIST_ABI, MEDICINE_LIST_ADDRESS)
  const gas = await medicineList.methods
      .addMedicine(name, brand, type, ndcNumber)
      .estimateGas();
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  await medicineList.methods.addMedicine(name, brand, type, ndcNumber).send({from: account, gas});
}

export {loadMedicineData, deleteMedicine, addMedicine}