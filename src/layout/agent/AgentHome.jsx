import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import AuthContext from '../../context/Authcontext';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

const AgentHome = () => {
  const [agentData, setAgentData] = useState(null);
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');
  const [showBalance, setShowBalance] = useState(false);
  const [openCashInDialog, setOpenCashInDialog] = useState(false);
  const [openCashOutDialog, setOpenCashOutDialog] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('auth'))?.token;
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axiosInstance.get('/agents/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAgentData(response.data);
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    };

    fetchAgentData();
  }, []);

  const handleCashIn = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth'))?.token;
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axiosInstance.post(
        '/agents/cash-in',
        { userId, amount: parseFloat(amount) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactionMessage(response.data.message);
      setAgentData((prevData) => ({
        ...prevData,
        balance: response.data.agentBalance,
      }));
      setOpenCashInDialog(false); // Close the dialog after successful transaction
    } catch (error) {
      console.error('Error cashing in:', error);
      setTransactionMessage('Transaction failed. Please try again.');
    }
  };

  const handleCashOut = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth'))?.token;
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axiosInstance.post(
        '/agents/cash-out',
        { userId, amount: parseFloat(amount) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactionMessage(response.data.message);
      setAgentData((prevData) => ({
        ...prevData,
        balance: response.data.agentBalance,
      }));
      setOpenCashOutDialog(false); // Close the dialog after successful transaction
    } catch (error) {
      console.error('Error cashing out:', error);
      setTransactionMessage('Transaction failed. Please try again.');
    }
  };

  if (!agentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h4" className="text-center">
        Welcome, {agentData.name}
      </Typography>
      <p>Email: {agentData.email}</p>
      <p>Mobile Number: {agentData.mobileNumber}</p>
      <Button variant="contained" onClick={() => setShowBalance(!showBalance)}>
        {showBalance ? 'Hide Balance' : 'Show Balance'}
      </Button>
      {showBalance && <p>Balance: {agentData.balance} Taka</p>}
      <Button variant="contained" onClick={() => setOpenCashInDialog(true)} fullWidth>
        Cash In
      </Button>
      <Dialog open={openCashInDialog} onClose={() => setOpenCashInDialog(false)}>
        <DialogTitle>Cash In</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            label="Amount"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
            label="User ID"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCashIn} color="primary">
            Cash In
          </Button>
          <Button onClick={() => setOpenCashInDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" onClick={() => setOpenCashOutDialog(true)} fullWidth>
        Cash Out
      </Button>
      <Dialog open={openCashOutDialog} onClose={() => setOpenCashOutDialog(false)}>
        <DialogTitle>Cash Out</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            label="Amount"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
            label="User ID"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCashOut} color="primary">
            Cash Out
          </Button>
          <Button onClick={() => setOpenCashOutDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <p>{transactionMessage}</p>
      <Button variant="contained" color="secondary" onClick={logout} fullWidth>
        Logout
      </Button>
    </div>
  );
};

export default AgentHome;
