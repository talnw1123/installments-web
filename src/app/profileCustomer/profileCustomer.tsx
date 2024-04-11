'use client';
import { makeStyles } from '@mui/styles';

import { useContext } from 'react';

import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import 'react-multi-carousel/lib/styles.css';
import { DataContext1 } from './profileData';

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  formContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSection: {
    marginBottom: '1.5rem',
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '50%',
    padding: '0 1rem',
  },
  formField: {
    marginBottom: '3rem',
  },
});

const ProfileCustomer = () => {
  const { control, setValue, calculate, setAge } = useContext(DataContext1);
  const classes = useStyles();
  return (
    <>
      <Controller
        name="firstName"
        defaultValue=""
        control={control}
        render={({ field }) => <TextField {...field} label="First Name" variant="standard" fullWidth margin="normal" />}
      />
    </>
  );
};
export default ProfileCustomer;
