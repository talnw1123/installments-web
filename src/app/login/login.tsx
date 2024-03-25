'use client';

import AlertDialogError from '@components/alertDialog/alertError';
import ToastSuccess from '@components/toast';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    margin: 0,
  },
  pinkBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '500px',
    borderRadius: '15px',
    background: '#ffd4db',
    padding: 50,
  },

  loginButton: {
    borderRadius: '100px',
    background: '#64CCC5',
    padding: '20px',
    width: '150px',
    height: '30px',
    marginTop: '5px',
  },
});

export default function LoginPage() {
  const classes = useStyles();
  const [openAlertDialogError, setOpenAlertDialogError] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleOnCloseDialog = () => {
    setOpenAlertDialogError(false);
  };

  return (
    <form>
      <Grid container className={classes.container}>
        <Box className={classes.pinkBox}>
          <Typography sx={{ fontSize: '40px', textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
            INSTALLMENTS
          </Typography>
          <Controller
            name="email"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Email"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 3,
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                }}
              />
            )}
          />

          <Controller
            name="password"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                placeholder="Password"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 3,
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.loginButton}
            sx={{
              backgroundColor: '#ff8da3',
              '&:hover': {
                backgroundColor: '#fd5f7d',
              },
              marginBottom: '15px',
            }}
          >
            Login
          </Button>
          <Link href="signup" color="black" underline="hover">
            Sign up
          </Link>

          <ToastSuccess
            openToast={openToast}
            handleCloseToast={handleCloseToast}
            text="Login successfully"
            showClose={true}
          />
        </Box>
        <AlertDialogError openAlertDialog={openAlertDialogError} handleOnCloseDialog={handleOnCloseDialog} />
      </Grid>
    </form>
  );
}
