// const { default: Web3 } = require("web3");
const contractABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "data",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x73d4a13a"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "ids",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xfac333ac"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getData",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x3bc5de30"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_data",
          "type": "string"
        }
      ],
      "name": "setData",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x47064d6a"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "val",
          "type": "uint256"
        }
      ],
      "name": "addToIds",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x1c0ed7c0"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "position",
          "type": "uint256"
        }
      ],
      "name": "getFromIds",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x8cf91223"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getAllIds",
      "outputs": [
        {
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xaaa44e5c"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getLengthOfIds",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x1c12c93a"
    }
]
const contractAddress = "0x12a1760D4006e11647CE87316F28470C35DEF4Ec"
let accounts = []
let web3;
let advancedContract;
const initWeb3 = () => { // initialazation of web3
    return new Promise((resolve, reject) => {
        //case1: client has new metamask version

        if(typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            window.ethereum.enable() // ask client for logging with metamask
                .then(() => {
                    resolve(new Web3(window.ethereum))
                }).catch((error) => {
                    reject(error)
                })
            return ;
        }

        //case2: client doesn't have new metamask version
        if(typeof window.web3 !== 'undefined') {
            return resolve(new Web3(window.web3.currentProvider))
        }

        //case3: 
        resolve(new Web3('http://127.0.0.1:7545')) 
    })
}

const initContract = () => { // initialazation of the contract
    return new web3.eth.Contract(contractABI, contractAddress)

}

const initApp = () => { // initialazation of the app
    const form1 = document.getElementById('form1')
    const value1 = document.getElementById('value1')
    const form2 = document.getElementById('form2')
    const value2 = document.getElementById('value2')
    web3.eth.getAccounts().then((acc) => accounts = acc)
    const getDataFromBlockchain = () => {
        advancedContract.methods.getData().call().then((result) => {
            value1.innerHTML = result;
        })
        advancedContract.methods.getAllIds().call().then((result) => {
            value2.innerHTML = result.join(', ')
        })
    }

    form1.addEventListener('submit', (e) => {
        const input = e.target.elements[0].value
        advancedContract.methods.setData(input).send({from: accounts[0]}).then(getDataFromBlockchain)
    })
    form2.addEventListener('submit', (e) => {
        const input2 = e.target.elements[0].value
        advancedContract.methods.addToIds(input2).send({from:accounts[0]}).then(getDataFromBlockchain)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    initWeb3()
        .then((_web3) => {
            web3 = _web3
            advancedContract = initContract()
            initApp()
        })
})