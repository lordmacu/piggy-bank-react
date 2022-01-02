import styles from '../styles/Home.module.scss'
import React, { useState, useEffect } from 'react';
import { faDollarSign, faMoneyCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'react-moment';
import swal from 'sweetalert';
import Router from 'next/router';

var abi = [{ "inputs": [], "stateMutability": "payable", "type": "constructor" }, { "inputs": [{ "internalType": "uint256", "name": "time", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "depositBaks", "outputs": [{ "internalType": "uint256", "name": "date", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "typeTransaction", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getDeposits", "outputs": [{ "components": [{ "internalType": "uint256", "name": "date", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "typeTransaction", "type": "uint256" }], "internalType": "struct PiggyBank.Deposit[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "transactions", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "time", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]


export default function Home() {

  let Web3 = require('web3');
  
  const [balancePiggy, setBalancePiggy] = useState(0)
  const [balancePiggyWei, setBalancePiggyWei] = useState(0)
  const [depositsPiggy, setDepositsPiggy] = useState([])


 
  const url = new Web3.providers.HttpProvider(
    'wss://ropsten.infura.io/ws/v3/4c3357c4588344919337836ff9cd1934'
  );
  let w3 = new Web3(url);

  let contract = new w3.eth.Contract(abi, "0x3c5e41ea3decb88dfce1c3ba97464aea68ec3634")

  const depositValue = async (value) => {

    var accountsFromMetaMask = await window.ethereum.send('eth_requestAccounts');
    console.log("sadf asd ", accountsFromMetaMask["result"][0]);

   // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    //console.log("aquiii estoy ", accounts);

    contract.methods.deposit(parseInt(new Date().getTime() / 1000)).send({ from: accountsFromMetaMask["result"][0], value: w3.utils.toWei(value, 'ether'), gas: 3000000 },
      function (error, result) {
        if (error) {
          console.log("error:" + error);
        } else {
          balance();
        }
      });
  }

  const deposit = async () => {
    swal("¿Cuando quieres ahorrar?", {
      content: {
        element: "input",
        attributes: {
          placeholder: "Ingresa un valor",
          type: "number",
          require: true
        },
      },
    })
      .then((value) => {
        if (!!value) {
          depositValue(value);
        } else {
          swal("Error en ahorro", "Ingresa un valor", "error")
        }
      });
  };
  
  const balance = async () => {

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
 
    contract.methods.getBalance().call({ from: accounts[0]},
      function (error, result) {
        if (error) {
          console.log("error:" + error);
        } else {
           
          setBalancePiggy(w3.utils.fromWei(result, 'ether'))
          setBalancePiggyWei(result);
          deposits();
        }
      });
  };

  const deposits = async () => {
    contract.methods.getDeposits().call({},
      function (error, result) {
        if (error) {
          console.log("error:" + error);
        } else {
          var depositLocal = [];
          for (var i = 0; i < result.length; i++){
            depositLocal.push({
              date: result[i].date*1000,
              value: w3.utils.fromWei(result[i].value, 'ether'),
              typeTransaction: result[i].typeTransaction
            })
          }
          const sortedDeposits = depositLocal.sort((a, b) => b.date - a.date)
          setDepositsPiggy(sortedDeposits)
        }
      });


  };

  const withdrawValue = async (value) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    contract.methods.withdraw(w3.utils.toWei(value, 'ether'), parseInt(new Date().getTime() / 1000)).send({ from: accounts[0], gas: 3000000 },
      function (error, result) {
        if (error) {
          console.log("error:" + error);
        } else {
          balance();
        }
      });
  };

 

  const withdraw = async () => {
    swal("¿Cuando quieres retirar?", {
      content: {
        element: "input",
        attributes: {
          placeholder: "Ingresa un valor",
          type: "number",
          require: true
        },
      },
    })
      .then((value) => {
        if (!!value) {
          if (balancePiggy >= value) {
             withdrawValue(value);
          } else {
            swal("Error en ahorro", "No hay suficiente", "error")
          }
        } else {
          swal("Error en ahorro", "Ingresa un valor", "error")
        }
      });
  };

   
  useEffect(() => {

    balance();
 }, [])
  

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.headerApp}>
          <button title='Depositar' className={styles.buttonCicle} onClick={deposit}>
            <FontAwesomeIcon icon={faDollarSign} />
          </button>
          <button title='Retirar' className={styles.buttonCicle} onClick={withdraw}>
            <FontAwesomeIcon icon={faMoneyCheck} />
          </button>
          <span>Alcancia</span>
        </div>
        <div className={styles.balance}>
          <h1>{balancePiggy} Eth</h1>
          <span>{balancePiggyWei} Wei</span>
        </div>
      
        <div className="d-grid gap-2 mt-4">
          <button className="btn btn-light" type="button" onClick={() => {
            Router.push("/contact");
          }}>Contacto</button>
        </div>
        <h3 className={styles.titleDeposit}>Transacciones</h3>
        {depositsPiggy.map(function (object, i) {
          
          return <div className={styles.panelWhite} key={i}>
            
            <p>{object.typeTransaction == 0 ? "Retiro" : "Deposito"} {object.value} Eth </p>
            <Moment className={styles.dateText} format="MMMM Do YYYY, h:mm:ss a">
            {object.date}
          </Moment> </div>;
        })}
      </div>
    </div>
  )
}
