'use client';

/// ในไฟล์ LoginPage.tsx (Next.js)
import AlertDialogError from '@components/alertDialog/alertError';
import ToastSuccess from '@components/toast';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { authState } from '@store/index'; // เพิ่ม import นี้
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil'; // เพิ่ม import นี้


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
  const [openAlertDialogError, setOpenAlertDialogError] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const setAuth = useSetRecoilState(authState); // ใช้ setAuth จาก Recoil

  const { control, handleSubmit } = useForm();

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleOnCloseDialog = () => {
    setOpenAlertDialogError(false);
  };

  const onSubmit = async (data) => {

    const { email, password } = data; // ดึงค่า email และ password จาก form data

    try {
      const response = await fetch('http://localhost:4400/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // ส่งข้อมูล email และ password ไปยังเซิร์ฟเวอร์
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData; // ดึงค่า token จาก responseData

        // เก็บ email และ token ที่ได้จาก form และ response data ใน Recoil state
        setAuth({ email, token });

        // console.log(email, token)
        // Redirect หน้าไปยังหน้าหลังจากล็อกอินเสร็จสิ้น
        // เปลี่ยนเป็น URL ที่ต้องการ redirect ไป
      } else {
        setOpenAlertDialogError(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setOpenAlertDialogError(true);
    }

  };



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container className={classes.container}>
        <Box className={classes.pinkBox}>
          <Typography sx={{ fontSize: '40px', textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
            INSTALLMENTS
          </Typography>
          <Controller
            name="email"
            control={control}
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
            control={control}
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
