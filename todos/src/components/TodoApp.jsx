import React, { useEffect } from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { BlockWalletInfo } from './BlockWalletInfo';
import { abi, contractAddress } from '../config';
import {
  addTodo,
  getTodos,
  removeTodo,
  updateTodoStatus,
} from '../services/http';

if (window.ethereum) {
  window.provider = new ethers.BrowserProvider(window.ethereum);
} else {
  console.error(
    'Ethers.js: Web3 provider not found. Please install a wallet with Web3 support.'
  );
}

export const TodoApp = () => {
  const [wallet, setWallet] = useState({
    accounts: [],
    balance: '',
  });
  const [readContract, setReadContract] = useState();
  const [writeContract, setWriteContract] = useState();
  const [todos, setTodos] = useState([]);

  // UseEffect =============================================
  useEffect(() => {
    // console.log(todos);
    const getProvider = async () => {
      // Make read contract - for just reading stuff on the blockchain
      const todoReadContract = new ethers.Contract(
        contractAddress,
        abi,
        window.provider
      );
      setReadContract(todoReadContract);

      // Make write contract - for changing stuff to the blockchain
      const signer = await provider.getSigner();
      const todoWriteContract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      setWriteContract(todoWriteContract);

      updateAccountData();
    };
    getProvider();
  }, []);

  const updateAccountData = async () => {
    let accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    updateWallet(accounts);
  };

  // UseEffect 2 =============================================
  useEffect(() => {
    if (readContract) {
      (async () => {
        setTodos(await getTodos(readContract));
      })();
    }
  }, [readContract]);

  // Update Wallet =============================================
  const updateWallet = async (accounts) => {
    const balance = formatBalance(
      await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      })
    );
    setWallet({ accounts, balance });
  };

  // Format Balance =============================================
  const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(5);
    return balance;
  };

  // Todo Form Handler =============================================
  const todoFormHandler = async (e) => {
    e.preventDefault();
    if (await addTodo(writeContract, e.target[0].value)) {
      setTodos(await getTodos(readContract));
      updateAccountData();
    }
  };

  // Todo Delete Handler =============================================
  const deleteHandler = async (e, id) => {
    e.preventDefault();
    console.log('delete this:', id);
    if (await removeTodo(writeContract, id)) {
      setTodos(await getTodos(readContract));
    }
  };

  // Todo Checkbox Handler =============================================
  const checkboxHandler = async (id) => {
    console.log('update this', id);
    if (await updateTodoStatus(writeContract, id)) {
      setTodos(await getTodos(readContract));
    }
  };

  return (
    <div>
      <h1>Todo Block</h1>
      <BlockWalletInfo wallet={wallet} />
      <TodoForm todoFormHandler={todoFormHandler} />
      <TodoList
        todos={todos}
        deleteHandler={deleteHandler}
        checkboxHandler={checkboxHandler}
      />
    </div>
  );
};
