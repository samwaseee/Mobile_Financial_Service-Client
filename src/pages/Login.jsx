import { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/Authcontext';

const Login = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext);
  const [userType, setUserType] = useState('user'); // Default to 'user' for user login
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const requestBody = {
      pin: data.pin,
      ...(userType === 'user' ? { mobileNumber: data.mobileNumber } : { email: data.email }),
    };

    try {
      await login(requestBody);
      navigate(`/${userType}`); // Redirect based on selected userType
    } catch (err) {
      setError('Failed to login');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" className="text-2xl font-semibold text-center mb-4">Login</Typography>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <FormControl component="fieldset" className="mb-4">
          <FormLabel component="legend">Login as</FormLabel>
          <RadioGroup
            row
            aria-label="user-type"
            name="user-type"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="space-x-4"
          >
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="agent" control={<Radio />} label="Agent" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
        </FormControl>

        {userType === 'user' ? (
          <Controller
            name="mobileNumber"
            control={control}
            defaultValue=""
            rules={{ required: 'Mobile Number is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mobile Number"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber ? errors.mobileNumber.message : ''}
                className="mb-4"
              />
            )}
          />
        ) : (
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                className="mb-4"
              />
            )}
          />
        )}

        <Controller
          name="pin"
          control={control}
          defaultValue=""
          rules={{
            required: 'PIN is required',
            pattern: {
              value: /^[0-9]{5}$/,
              message: 'PIN must be a 5-digit number'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="PIN"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              error={!!errors.pin}
              helperText={errors.pin ? errors.pin.message : ''}
              className="mb-4"
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="mt-2"
        >
          Login
        </Button>

        <div className="text-center mt-3">
          <Typography variant="body2">
            New User? <Link href="/register" className="text-blue-500">Register here</Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default Login;
