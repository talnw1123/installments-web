'use client';

import 'react-multi-carousel/lib/styles.css';
import { DataContext1 } from './profileData';

import EditIcon from '@mui/icons-material/Edit';
import { Card, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useContext } from 'react';
import { Controller } from 'react-hook-form';

import MenuList from 'app/customerInformation/page';
import { Users } from 'app/users';
import 'react-multi-carousel/lib/styles.css';

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
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  formBigContainer: {
    borderLeft: '2px solid lightgray',
  },
  formContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formField: {
    marginBottom: '3rem',
  },
});

const ProfileCustomer = () => {
  const { control, statuses, setValue, calculate, setAge } = useContext(DataContext1);
  const classes = useStyles();

  const handleEditClick = () => {
    navigateTo('/editProfileCustomer');
  };

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <>
      <Grid container className={classes.bigContainer}>
        <Card sx={{ padding: 3, width: '80%' }}>
          <Grid container className={classes.topContainer}>
            <Typography variant="h4" sx={{ marginLeft: '12.5px', marginBottom: '30px' }}>
              ประวัติผู้กู้
            </Typography>

            <EditIcon
              style={{ color: '#2196f3', width: '10%', marginTop: '10px', cursor: 'pointer' }}
              onClick={handleEditClick}
            />
          </Grid>

          <Grid className={classes.bodyContainer}>
            <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
              <Grid style={{ width: '17%', minWidth: '200px' }}>
                <MenuList />
              </Grid>

              <Grid item style={{ width: '60%' }} className={classes.formBigContainer}>
                <Grid container spacing={4} className={classes.formContainer}>
                  <Grid item xs={8}>
                    <Controller
                      name="idBorrower"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="เลขประจำตัวประชาชน"
                          defaultValue={Users[0].id}
                          variant="standard"
                          fullWidth
                          margin="normal"
                          className={classes.formField}
                        />
                      )}
                    />

                    <Controller
                      name="nameBorrower"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ชื่อ"
                          variant="standard"
                          fullWidth
                          margin="normal"
                          className={classes.formField}
                        />
                      )}
                    />

                    <Grid container item spacing={3}>
                      <Grid item xs={4}>
                        <Controller
                          name="occupationBorrower"
                          defaultValue=""
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="อาชีพ"
                              variant="standard"
                              fullWidth
                              margin="normal"
                              className={classes.formField}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name="incomeBorrower"
                          defaultValue=""
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="รายได้"
                              variant="standard"
                              fullWidth
                              margin="normal"
                              className={classes.formField}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name="workPhoneNumberBorrower"
                          defaultValue=""
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="เบอร์ที่ทำงาน"
                              variant="standard"
                              fullWidth
                              margin="normal"
                              className={classes.formField}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>

                    <Controller
                      name="addressDefaultBorrower"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ที่อยู่ตามบัตรประชาชน"
                          fullWidth
                          margin="normal"
                          multiline
                          rows={4}
                          className={classes.formField}
                        />
                      )}
                    />

                    <Controller
                      name="mapLinkDefaultBorrower"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Google Map link"
                          variant="standard"
                          fullWidth
                          margin="normal"
                          className={classes.formField}
                        />
                      )}
                    />

                    <Grid container item spacing={2}>
                      <Grid item xs={6}>
                        <Controller
                          name="statusBorrower"
                          defaultValue=""
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              select
                              label="สถานะภาพ"
                              variant="standard"
                              fullWidth
                              margin="normal"
                              className={classes.formField}
                            >
                              {statuses.map((status: string) => (
                                <MenuItem key={status} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Controller
                          name="numOfChildBorrower"
                          defaultValue=""
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="จำนวนบุตร"
                              variant="standard"
                              fullWidth
                              margin="normal"
                              className={classes.formField}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>

                    <Controller
                      name="nameSpouse"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ชื่อคู่สมรส"
                          variant="standard"
                          fullWidth
                          margin="normal"
                          className={classes.formField}
                        />
                      )}
                    />

                    <Grid container item spacing={3}>
                      <Grid item xs={4}>
                        <Controller
                          name="occupationSpouse"
                          defaultValue=""
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="อาชีพ"
                              variant="standard"
                              fullWidth
                              margin="normal"
                              className={classes.formField}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name="incomeSpouse"
                          defaultValue=""
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="รายได้"
                              variant="standard"
                              fullWidth
                              margin="normal"
                              className={classes.formField}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name="workPhoneNumberSpouse"
                          defaultValue=""
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="เบอร์ที่ทำงาน"
                              variant="standard"
                              fullWidth
                              margin="normal"
                              className={classes.formField}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>

                    <Controller
                      name="phoneNumberSpouse"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="เบอร์โทรศัพท์"
                          variant="standard"
                          fullWidth
                          margin="normal"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item style={{ width: '30%' }}>
                <Grid container spacing={4} className={classes.formContainer}>
                  <Grid item xs={8}>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Controller
                          name="birthDate"
                          control={control}
                          defaultValue={null}
                          render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                {...field}
                                label="วันเกิด"
                                onChange={newValue => {
                                  setValue('birthDate', newValue);
                                  const age = calculate(newValue);
                                  setValue('age', age);
                                  setAge(age);
                                }}
                              />
                            </LocalizationProvider>
                          )}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Controller
                          name="age"
                          control={control}
                          render={({ field: { value } }) => <Typography>{value ? `Age: ${value}` : 'อายุ'}</Typography>}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name="phoneNumberBorrower"
                          defaultValue=""
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="เบอร์โทรศัพท์"
                              variant="standard"
                              fullWidth
                              margin="normal"
                              className={classes.formField}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>

                    <Controller
                      name="lastNameBorrower"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="นามสกุล"
                          variant="standard"
                          fullWidth
                          margin="normal"
                          className={classes.formField}
                        />
                      )}
                    />

                    <Controller
                      name="addressCurrentBorrower"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ที่อยู่ปัจจุบัน"
                          fullWidth
                          margin="normal"
                          multiline
                          rows={4}
                          className={classes.formField}
                        />
                      )}
                    />
                    <Controller
                      name="mapLinkCurrentBorrower"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Google Map link"
                          variant="standard"
                          fullWidth
                          margin="normal"
                          className={classes.formField}
                        />
                      )}
                    />
                    <Controller
                      name="workAddressBorrower"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ที่อยู่ที่ทำงาน"
                          fullWidth
                          margin="normal"
                          multiline
                          rows={4}
                          className={classes.formField}
                        />
                      )}
                    />
                    <Controller
                      name="mapLinkWorkBorrower"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Google Map link"
                          variant="standard"
                          fullWidth
                          margin="normal"
                          className={classes.formField}
                        />
                      )}
                    />

                    <Controller
                      name="lastNameSpouse"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="นามสกุล"
                          variant="standard"
                          fullWidth
                          margin="normal"
                          className={classes.formField}
                        />
                      )}
                    />

                    <Controller
                      name="workAddressSpouse"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ที่อยู่ที่ทำงาน"
                          fullWidth
                          margin="normal"
                          multiline
                          rows={4}
                          className={classes.formField}
                        />
                      )}
                    />
                    <Controller
                      name="mapLinkWorkSpouse"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Google Map link"
                          variant="standard"
                          fullWidth
                          margin="normal"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};
export default ProfileCustomer;
