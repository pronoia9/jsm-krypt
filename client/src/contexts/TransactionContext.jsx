import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext(null);

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log({ provider, signer, transactionContract });
};

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('');

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert('Please install MetaMask.');
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    // console.log(accounts);
    if (accounts.length) {
      setConnectedAccount(accounts[0]);
      // getAllTransactions();
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error('No ethereum object.');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return <TransactionContext.Provider value={{ connectWallet }}>{children}</TransactionContext.Provider>;
};

export const useTransactionContext = () => useContext(TransactionContext);