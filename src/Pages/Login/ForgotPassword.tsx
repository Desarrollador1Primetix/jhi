import React from 'react';
import {Button, Container, Link, TextField, Typography} from '@mui/material';
import {ChangeEvent, FormEvent, useState} from 'react';
import {Footer} from '../../Components/Footer/Footer';
import SearchAppBar from '../../Components/SearchAppbar/SearchAppbar';

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleResetPassword = (e: FormEvent) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para enviar un correo de recuperación de contraseña
    console.log('Enviar correo de recuperación de contraseña a:', email);
    setSuccessMessage(
      'Se ha enviado un correo de recuperación de contraseña a tu dirección de correo electrónico.'
    );
    setError('');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
    setSuccessMessage('');
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <SearchAppBar />
      <Container maxWidth='sm' style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <Typography variant='h4' align='center' gutterBottom>
          Recuperar Contraseña
        </Typography>
        <form onSubmit={handleResetPassword}>
          <TextField
            label='Correo Electrónico'
            type='email'
            fullWidth
            value={email}
            onChange={handleEmailChange}
            margin='normal'
            required
            error={error !== ''}
            helperText={error || successMessage}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            style={{marginTop: '1rem'}}
          >
            Enviar Correo de Recuperación
          </Button>
        </form>
        <Typography variant='body2' align='center' style={{marginTop: '1rem'}}>
          ¿Recuerdas tu contraseña? <Link href='/'>Iniciar Sesión</Link>
        </Typography>
      </Container>
      <Footer />
    </div>
  );
};
