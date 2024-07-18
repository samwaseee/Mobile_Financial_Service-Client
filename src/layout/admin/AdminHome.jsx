import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Typography,
  Box,
  Button,
} from '@mui/material';
import axiosInstance from '../../utils/axiosInstance';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
    fetchAgents();
  }, []);

  const fetchUsers = () => {
    axiosInstance.get('/admins/users')
      .then(response => {
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Expected an array of users but received:', response.data);
          setError('Invalid response format');
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
      });
  };

  const fetchAgents = () => {
    axiosInstance.get('/admins/agents')
      .then(response => {
        if (Array.isArray(response.data)) {
          setAgents(response.data);
        } else {
          console.error('Expected an array of agents but received:', response.data);
          setError('Invalid response format');
        }
      })
      .catch(error => {
        console.error('Error fetching agents:', error);
        setError('Failed to fetch agents');
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEnableUser = (userId) => {
    axiosInstance.put(`/admins/users/${userId}`, { status: 'active' })
      .then(response => {
        fetchUsers(); // Refresh users after updating status
      })
      .catch(error => {
        console.error('Error enabling user:', error);
      });
  };

  const handleBlockUser = (userId) => {
    axiosInstance.put(`/admins/users/${userId}`, { status: 'pending' })
      .then(response => {
        fetchUsers(); // Refresh users after updating status
      })
      .catch(error => {
        console.error('Error blocking user:', error);
      });
  };

  const handleEnableAgent = (agentId) => {
    axiosInstance.put(`/admins/agents/${agentId}`, { status: 'active' })
      .then(response => {
        fetchAgents(); // Refresh agents after updating status
      })
      .catch(error => {
        console.error('Error enabling agent:', error);
      });
  };

  const handleBlockAgent = (agentId) => {
    axiosInstance.put(`/admins/agents/${agentId}`, { status: 'pending' })
      .then(response => {
        fetchAgents(); // Refresh agents after updating status
      })
      .catch(error => {
        console.error('Error blocking agent:', error);
      });
  };

  const sortedUsers = users.slice().sort((a, b) => {
    if (a.email < b.email) return -1;
    if (a.email > b.email) return 1;
    return 0;
  });

  const sortedAgents = agents.slice().sort((a, b) => {
    if (a.email < b.email) return -1;
    if (a.email > b.email) return 1;
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const paginatedAgents = sortedAgents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      
      {/* Users Table */}
      <TableContainer>
        <Typography variant="h5" gutterBottom>
          Users
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
                <TableCell>{user.balance}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  {user.status === 'pending' ? (
                    <>
                      <Button variant="contained" color="primary" onClick={() => handleEnableUser(user._id)}>
                        Enable
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleBlockUser(user._id)}>
                        Block
                      </Button>
                    </>
                  ) : (
                    <Button variant="contained" color="secondary" onClick={() => handleBlockUser(user._id)}>
                      Block
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      {/* Agents Table */}
      <TableContainer>
        <Typography variant="h5" gutterBottom>
          Agents
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAgents.map(agent => (
              <TableRow key={agent._id}>
                <TableCell>{agent.name}</TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell>{agent.mobileNumber}</TableCell>
                <TableCell>{agent.status}</TableCell>
                <TableCell>
                  {agent.status === 'pending' ? (
                    <>
                      <Button variant="contained" color="primary" onClick={() => handleEnableAgent(agent._id)}>
                        Enable
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleBlockAgent(agent._id)}>
                        Block
                      </Button>
                    </>
                  ) : (
                    <Button variant="contained" color="secondary" onClick={() => handleBlockAgent(agent._id)}>
                      Block
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={agents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default AdminHome;
