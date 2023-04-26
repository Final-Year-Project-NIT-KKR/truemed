import Web3 from 'web3'

const USER_LIST_ABI =[
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "userType",
        "type": "string"
      }
    ],
    "name": "login",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getType",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "getUserType",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "verifyUser",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]
  const USER_LIST_ADDRESS = "0xEC351568678582a0AD5654A4b447A2025B11c8E5"

async function getUserType(userAddress){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const userList = new web3.eth.Contract(USER_LIST_ABI, USER_LIST_ADDRESS)
    const userType = await userList.methods.getUserType(userAddress).call()
    return userType
}

async function login(userType){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const userList = new web3.eth.Contract(USER_LIST_ABI, USER_LIST_ADDRESS)
    const gas = await userList.methods
      .login(userType)
      .estimateGas();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    await userList.methods.login(userType).send({from: account, gas})
}


export {getUserType, login}