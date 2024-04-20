// ForgotPassword.js
import React, { useState } from 'react';
import { auth } from '../../config/firebase'; // Import sendPasswordResetEmail function
import { TextField, Button, Typography } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email); // Use sendPasswordResetEmail function
      console.log("Password reset email sent")
      setMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <Typography variant="h5">Forgot Password</Typography>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" onClick={handleResetPassword}>Reset Password</Button>
      <Typography>{message}</Typography>
    </div>
  );
};

export default ForgotPassword;
