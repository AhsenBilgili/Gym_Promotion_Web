import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Await, Link } from 'react-router-dom';
import ResponsiveAppBar from '../components/appbar';
import { useState } from 'react';
import agent from '../api/agent';
import {useForm} from'react-hook-form';
import { LoadingButton } from '@mui/lab';



export default function Login() {
const{register,handleSubmit,formState:{isSubmitting}}=useForm()

   async function submitForm(data){
    await agent.Account.login(data);
   }

  return (
    <>
      <Container component={Paper} maxWidth="sm" sx={{display:'flex',flexDirection:'column',alignItems:'center',padding:4}} >
      
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Giriş Yap
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Kullanıcı adı"
            
              autoFocus
              {...register('username')}

            />
            <TextField
              margin="normal"
              fullWidth
              label="Şifre"
              type="password"
              {...register('password')}
            />
           
            <LoadingButton
            loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Giriş Yap
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link to='/register' >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              </Grid>
          </Box>
      
      </Container>
      </>
  );
}