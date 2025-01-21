import React, { useEffect, useState } from 'react';
import { TextField, Button, Stack, FormControlLabel, Checkbox } from '@mui/material';
import LayoutForm from '../../components/Layout/LayoutForm';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, fetchUser } from '../../redux/user/actions';
import { useNavigate, useParams } from 'react-router-dom';

export default function FormUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const user = useSelector((state) => state.usersReducer.user); 
  const [formData, setFormData] = useState({
    pseudo: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    role: false,
  });

  const [error, setError] = useState({ passwordMismatch: false });

  useEffect(() => {
    if (userId) {
      // Si un ID est présent, récupérer les données de l'utilisateur
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user && userId) {
      // Met à jour le formulaire avec les données de l'utilisateur
      setFormData({
        pseudo: user.pseudo || '',
        phoneNumber: user.phoneNumber || '',
        password: '',
        confirmPassword: '',
        fullname: user.fullname || '',
        role: user.role === 'admin', // Convertit 'admin' en booléen
      });
    }
  }, [user, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError({ passwordMismatch: true });
      return;
    }

    setError({ passwordMismatch: false });

    const userData = {
      pseudo: formData.pseudo,
      phoneNumber: formData.phoneNumber,
      password: formData.password || undefined, 
      fullname: formData.fullname,
      role: formData.role ? 'admin' : 'user',
      navigate
    };

    if (userId) {
      // Mise à jour de l'utilisateur existant
      dispatch(updateUser(userId, userData));
    } else {
      // Ajout d'un nouvel utilisateur
      dispatch(addUser(userData));
    }
  };

  return (
    <LayoutForm submit={handleSubmit} title={userId ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <TextField
          label="Nom complet"
          variant="outlined"
          name="fullname"
          value={formData.fullname}
          onChange={handleInputChange}
          fullWidth
          color="primary"
        />
        <TextField
          label="Pseudo"
          variant="outlined"
          name="pseudo"
          value={formData.pseudo}
          onChange={handleInputChange}
          fullWidth
          required
          color="primary"
        />
        <TextField
          label="Numéro de téléphone"
          variant="outlined"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          fullWidth
          required
          color="primary"
          type="tel"
        />
        <TextField
          label="Mot de passe"
          variant="outlined"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          color="primary"
          type="password"
        />
        <TextField
          label="Confirmer le mot de passe"
          variant="outlined"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          fullWidth
          color="primary"
          type="password"
          error={error.passwordMismatch}
          helperText={error.passwordMismatch ? 'Les mots de passe ne correspondent pas' : ''}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.role}
              onChange={handleRoleChange}
              name="role"
              color="primary"
            />
          }
          label="Admin"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            textTransform: 'none',
            borderRadius: 100,
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#008000',
            '&:hover': { backgroundColor: '#005f00' },
          }}
        >
          {userId ? 'Mettre à jour' : 'Soumettre'}
        </Button>
      </Stack>
    </LayoutForm>
  );
}
