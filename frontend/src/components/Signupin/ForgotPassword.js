// ForgotPassword.js
import React, { useState } from 'react';
import { auth } from '../../config/firebase'; 
import { TextField, Button, Typography ,Box, Container, CssBaseline, Avatar, Grid } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';

const defaultTheme = createTheme();

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
    // <div>
    //   <Typography variant="h5">Forgot Password</Typography>
    //   <TextField
    //     label="Email"
    //     variant="outlined"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <Button variant="contained" onClick={handleResetPassword}>Reset Password</Button>
    //   <Typography>{message}</Typography>
    // </div>

    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot password
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          
        <TextField
        margin='normal'
        fullWidth
        label="Email"
        variant="outlined"
        
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
         

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleResetPassword}
          >
            Forgot Password
          </Button>
        
          <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Back to Sign In
                </Link>
              </Grid>
            </Grid>

        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  );
};

export default ForgotPassword;
