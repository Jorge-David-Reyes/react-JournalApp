import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword  } from '../../store/auth';

const formData = {
  email: '',
  password: '',
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener un @' ],
  password: [ (value) => value.length >= 6, 'El password debe tener mas de 6 letras.' ],
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);
  const [ formSubmitted, setFormSubmitted ] = useState( false );
  const dispatch = useDispatch();


  const { 
    email, password, onInputChange, formState,
    isFormValid, emailValid, passwordValid,
  } = useForm( formData, formValidations );

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted( true );

    if( !isFormValid ) return;

    dispatch( startLoginWithEmailPassword( formState ) )
    // console.log({email, password});
  }

  const onGoogleSignIn = () => {
    console.log('GoogleSignIn');
    dispatch( startGoogleSignIn() )
  }

  return (
    <AuthLayout title='Login'>
          <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
              <Grid item xs={12} sx={{mt: 2}}>
                <TextField
                  label="Correo"
                  type="email"
                  placeholder='correro@google.com'
                  fullWidth
                  name='email'
                  value= { email }
                  onChange={ onInputChange }
                  error = { !!emailValid && formSubmitted }
                  helperText = { emailValid }
                />
              </Grid>

              <Grid item xs={12} sx={{mt: 2}}>
                <TextField
                  label="Contraseña"
                  type="password"
                  placeholder='Contraseña'
                  fullWidth
                  name='password'
                  value= { password }
                  onChange={ onInputChange }
                  error = { !!passwordValid && formSubmitted }
                  helperText = { passwordValid }
                />
              </Grid>


              <Grid
                container
                display={ !!errorMessage ? '': 'none' }
                sx={{ mt:2 }}
              >
                <Grid
                  item
                  xs={12}
                >
                  <Alert severity='error'>{errorMessage}</Alert>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mb:2, mt:1 }}>
                <Grid item xs={12} sm={6}>
                  <Button 
                    disabled={ isAuthenticating }
                    type="submit" 
                    variant='contained' 
                    fullWidth>
                    Login
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button 
                    disabled={ isAuthenticating }
                    variant='contained' 
                    fullWidth
                    onClick={ onGoogleSignIn }>
                    <Google />
                    <Typography sx={{ml:1}}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Link component={ RouterLink } color='inherit' to="/auth/register">
                  Crear una cuenta
                </Link>
              </Grid>

            </Grid>
          </form>

    </AuthLayout>

  )
}
