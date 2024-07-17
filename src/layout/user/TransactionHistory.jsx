import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('auth'))?.token;
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axiosInstance.get('/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTransactions(response.data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <TableContainer component={Paper} className='h-screen'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Sender</TableCell>
            <TableCell>Recipient</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
              <TableCell>{transaction.senderId}</TableCell>
              <TableCell>{transaction.recipientId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionHistory;
