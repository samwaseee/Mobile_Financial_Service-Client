import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import axios from 'axios';

const Registration = () => {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: 'onChange'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        setSuccess('');
        const endpoint = data.role === 'User' ? 'http://localhost:5000/api/users/register' : 'http://localhost:5000/api/agents/register';

        try {
            const response = await axios.post(endpoint, data);
            setSuccess('Registration successful');
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold">Registration</h2>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormControl fullWidth>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Name is required' }}
                        render={({ field }) => (
                            <TextField
                                label="Name"
                                variant="outlined"
                                {...field}
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                            />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth>
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
                                label="5-digit PIN"
                                type="text"
                                inputProps={{
                                    maxLength: 5,
                                    pattern: '[0-9]*'
                                }}
                                variant="outlined"
                                {...field}
                                error={!!errors.pin}
                                helperText={errors.pin ? errors.pin.message : ''}
                            />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <Controller
                        name="mobileNumber"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Mobile Number is required',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Mobile Number must be a number'
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                label="Mobile Number"
                                variant="outlined"
                                {...field}
                                error={!!errors.mobile}
                                helperText={errors.mobile ? errors.mobile.message : ''}
                            />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email address'
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                {...field}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                            />
                        )}
                    />
                </FormControl>

                <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">Role</FormLabel>
                    <Controller
                        name="role"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Role is required' }}
                        render={({ field }) => (
                            <RadioGroup row {...field}>
                                <FormControlLabel
                                    value="User"
                                    control={<Radio />}
                                    label="User"
                                />
                                <FormControlLabel
                                    value="Agent"
                                    control={<Radio />}
                                    label="Agent"
                                />
                            </RadioGroup>
                        )}
                    />
                    {errors.role && <p className="text-red-600">{errors.role.message}</p>}
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isValid || loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </Button>
            </form>
        </Box>
    );
};

export default Registration;
