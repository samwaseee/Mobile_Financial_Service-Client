import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import AuthContext from '../../context/Authcontext';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

const UserHome = () => {
  const [userData, setUserData] = useState(null);
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [agentId, setAgentId] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');
  const [showBalance, setShowBalance] = useState(false);
  const [openSendMoneyDialog, setOpenSendMoneyDialog] = useState(false);
  const [openCashInDialog, setOpenCashInDialog] = useState(false);
  const [openCashOutDialog, setOpenCashOutDialog] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('auth'))?.token;
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axiosInstance.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSendMoney = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth'))?.token;
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axiosInstance.post(
        '/send-money',
        { recipientId, amount: parseFloat(amount), pin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactionMessage(response.data.message);
      setUserData((prevData) => ({
        ...prevData,
        balance: response.data.userBalance,
      }));
      setOpenSendMoneyDialog(false); // Close the dialog after successful transaction
    } catch (error) {
      console.error('Error sending money:', error);
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
        '/cash-out',
        { agentId, amount: parseFloat(amount), pin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactionMessage(response.data.message);
      setUserData((prevData) => ({
        ...prevData,
        balance: response.data.userBalance,
      }));
      setOpenCashOutDialog(false); // Close the dialog after successful transaction
    } catch (error) {
      console.error('Error cashing out:', error);
      setTransactionMessage('Transaction failed. Please try again.');
    }
  };

  const handleCashIn = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth'))?.token;
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axiosInstance.post(
        '/cash-in',
        { agentId, amount: parseFloat(amount) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactionMessage(response.data.message);
      setUserData((prevData) => ({
        ...prevData,
        balance: response.data.userBalance,
      }));
      setOpenCashInDialog(false); // Close the dialog after successful transaction
    } catch (error) {
      console.error('Error cashing in:', error);
      setTransactionMessage('Transaction failed. Please try again.');
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h4" className="text-center">
        Welcome, {userData.name}
      </Typography>
      <p>Email: {userData.email}</p>
      <p>Mobile Number: {userData.mobileNumber}</p>
      <Button variant="contained" onClick={() => setShowBalance(!showBalance)}>
        {showBalance ? 'Hide Balance' : 'Show Balance'}
      </Button>
      {showBalance && <p>Balance: {userData.balance} Taka</p>}
      <Button variant="contained" onClick={() => setOpenSendMoneyDialog(true)} fullWidth>
        Send Money
      </Button>
      <Dialog open={openSendMoneyDialog} onClose={() => setOpenSendMoneyDialog(false)}>
        <DialogTitle>Send Money</DialogTitle>
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
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            placeholder="Recipient ID"
            label="Recipient ID"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            label="PIN"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSendMoney} color="primary">
            Send Money
          </Button>
          <Button onClick={() => setOpenSendMoneyDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            placeholder="Agent ID"
            label="Agent ID"
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
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            placeholder="Agent ID"
            label="Agent ID"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            label="PIN"
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
      {transactionMessage && <p>{transactionMessage}</p>}
      <Button variant="contained" onClick={() => logout()} fullWidth>
        Logout
      </Button>
    </div>
  );
};

export default UserHome;
