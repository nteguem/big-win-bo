import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/user/actions';
import { toast } from 'react-toastify';
import { Container, Typography, TextField, Button, Box, Paper, CircularProgress } from '@mui/material';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ phoneNumber: '', password: '' });
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.usersReducer);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}
    >
      <Paper
        elevation={6}
        sx={{ padding: 4, width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box component="img" src="/logo.png" alt="Logo" sx={{ width: 100, marginBottom: 2 }} />
        <Typography variant="h5" component="h1" sx={{ marginBottom: 3 }}>
          Connexion
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            name="phoneNumber"
            label="Numéro de téléphone"
            variant="outlined"
            fullWidth
            value={credentials.phoneNumber}
            onChange={handleChange}
            required
            autoFocus
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="password"
            label="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            value={credentials.password}
            onChange={handleChange}
            required
            sx={{ marginBottom: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: '#008000',
              '&:hover': { backgroundColor: '#339933' },
              marginBottom: 2,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Se connecter'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
