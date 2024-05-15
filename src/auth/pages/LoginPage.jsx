import { Button, Grid, Link, TextField, Typography } from '@mui/material';

export const LoginPage = () => {
  return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
    >
        <Grid
          item
          className="box-shadow"
          xs={3}
          sx={{backgroundColor: 'white', borderRadius: 2, padding: 3}} 
        >

          <Typography variant='h5' sx={{ mb:1 }}>Login</Typography>
          <form>
            <Grid container>
              <Grid item xs={12} sx={{mt: 2}}>
                <TextField
                  label="Correo"
                  type="email"
                  placeholder='correro@google.com'
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sx={{mt: 2}}>
                <TextField
                  label="Contraseña"
                  type="password"
                  placeholder='Contraseña'
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
          
        </Grid>
    </Grid>
  )
}
