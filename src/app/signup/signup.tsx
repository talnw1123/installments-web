'use client';

import AlertDialogError from '@components/alertDialog/alertError';
import ToastSuccess from '@components/toast';
import { Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AuthState, activeLinkState, authState, useSetRecoilState } from '@store/index';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
  },
});

export default function Signup() {
  const classes = useStyles();

  const [openToast, setOpenToast] = useState<boolean>(false);
  const [openAlertDialogError, setOpenAlertDialogError] = useState<boolean>(false);
  const setAuth = useSetRecoilState<AuthState>(authState);
  const setActiveLink = useSetRecoilState<string>(activeLinkState);

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleOnCloseDialog = () => {
    setOpenAlertDialogError(false);
  };

  return (
    <form>
      <Grid container className={classes.bigContainer}>
        <Card sx={{ padding: 3, width: '70%' }}>
          <Stack
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" sx={{ mb: 5, fontWeight: 'bold' }}>
              Sign up
            </Typography>
            <Stack sx={{ width: '50%' }}>
              <Controller
                name="firstname"
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} placeholder="First Name" variant="outlined" fullWidth sx={{ mb: 3 }} />
                )}
              />
              <Controller
                name="lastname"
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} placeholder="Last Name" variant="outlined" fullWidth sx={{ mb: 3 }} />
                )}
              />

              <Controller
                name="email"
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} placeholder="Email" variant="outlined" fullWidth sx={{ mb: 3 }} />
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
                    sx={{ mb: 3 }}
                  />
                )}
              />
              <Controller
                name="address"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    rows={4}
                    multiline
                    placeholder="Address"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                )}
              />

              <Controller
                name="phone"
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} placeholder="Phone Number" variant="outlined" fullWidth sx={{ mb: 3 }} />
                )}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  mt: 1,
                  width: '20%',
                  alignSelf: 'center',
                  backgroundColor: '#ff8da3',
                  '&:hover': {
                    backgroundColor: '#fd5f7d',
                  },
                }}
              >
                Confirm
              </Button>
              <ToastSuccess
                openToast={openToast}
                handleCloseToast={handleCloseToast}
                text="Register Succuessfully"
                showClose={true}
              />
              <AlertDialogError openAlertDialog={openAlertDialogError} handleOnCloseDialog={handleOnCloseDialog} />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </form>
  );
}
