import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext(null);

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  // console.log({ provider, signer, transactionContract });
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  const [transactions, setTransactions] = useState();

  const handleChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');
      const transactionContract = getEthereumContract();
      const availableTransactions = await transactionContract.getAllTransactions();
      // parse response data
      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / Math.pow(10, 18),
      }));
      setTransactions(structuredTransactions);
    } catch (error) {
      console.error(error);
      throw new Error('Error get transactions.');
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      // console.log(accounts);

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else console.log('No accounts found.');
    } catch (error) {
      console.error(error);
      throw new Error('Error checking wallet.');
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem('transactionCount', transactionCount);
    } catch (error) {
      console.error(error);
      throw new Error('No ethereum object.');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error('Error connecting to wallet.');
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');
      // get the data from form
      const { addressTo, amount, keyword, message } = formData;
      // get ethereum contract
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount); // parse amount to gwei hexadecimal
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208' /* 21000 GWEI, 0.00021 ether */,
            value: parsedAmount._hex,
          },
        ],
      });
      // store transaction
      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);
      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.error(error);
      throw new Error('Error sending transaction.');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ currentAccount, formData, setFormData, transactions, isLoading, connectWallet, handleChange, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => useContext(TransactionContext);
