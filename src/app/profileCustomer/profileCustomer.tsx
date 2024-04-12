'use client';

import EditIcon from '@mui/icons-material/Edit';
import { Card, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuList from 'app/customerInformation/page';
import { Users } from 'app/users';
import { useContext } from 'react';
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
    display: 'flex',
    flexDirection: 'row',
  },
  formColumn: {
    padding: '0',
    margin: '0',
  },
  formBigColumn: {
    borderLeft: '2px solid lightgray',
    display: 'flex',
    flexDirection: 'row',
  },
  formContainer: {
    marginTop: '20px',
    marginLeft: '0',
    display: 'flex',

    justifyContent: 'center', // comment(?)
    alignItems: 'center',
  },
  formField: {
    marginBottom: '1.5rem',
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
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '80%' }}>
        <Grid container className={classes.topContainer}>
          <Typography variant="h4" sx={{ marginLeft: '12.5px' }}>
            ประวัติผู้กู้
          </Typography>

          <EditIcon
            style={{ color: '#2196f3', width: '10%', marginTop: '10px', cursor: 'pointer' }}
            onClick={handleEditClick}
          />
        </Grid>

        <Grid container className={classes.formContainer}>
          <Grid className={classes.formBigContainer}>
            <Grid>
              <MenuList />
            </Grid>
            <Grid className={classes.formBigColumn}>
              <Grid item xs={6} className={classes.formColumn}>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <Controller
                      name="idBorrower"
                      defaultValue={Users[0].id}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="เลขประจำตัวประชาชน"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={10}>
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
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <Controller
                      name="addressDefaultBorrower"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ที่อยู่ตามบัตรประชาชน"
                          fullWidth
                          margin="dense"
                          multiline
                          rows={4}
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={10}>
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
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>

                  <Grid container item spacing={2}>
                    <Grid item xs={5}>
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
                            margin="dense"
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
                    <Grid item xs={5}>
                      <Controller
                        name="numOfChildBorrower"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                          <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField
                              {...field}
                              label="จำนวนบุตร"
                              variant="standard"
                              fullWidth
                              margin="dense"
                              className={classes.formField}
                            />
                            <Typography sx={{ marginTop: '28px', marginLeft: '10px' }}>คน</Typography>
                          </Grid>
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={10}>
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
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>

                  <Grid container item spacing={2}>
                    <Grid item xs={5}>
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
                            margin="dense"
                            className={classes.formField}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Grid>
                        <Controller
                          name="incomeSpouse"
                          defaultValue=""
                          control={control}
                          render={({ field }) => (
                            <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                              <TextField
                                {...field}
                                label="รายได้"
                                variant="standard"
                                fullWidth
                                margin="dense"
                                className={classes.formField}
                              />
                              <Typography sx={{ marginTop: '28px', marginLeft: '10px' }}>บาท</Typography>
                            </Grid>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={10}>
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
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={10}>
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
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={10}>
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
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>

                  <Grid container item spacing={2}>
                    <Grid item xs={5}>
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
                            margin="dense"
                            className={classes.formField}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Grid>
                        <Controller
                          name="incomeSpouse"
                          defaultValue=""
                          control={control}
                          render={({ field }) => (
                            <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                              <TextField
                                {...field}
                                label="รายได้"
                                variant="standard"
                                fullWidth
                                margin="dense"
                                className={classes.formField}
                              />
                              <Typography sx={{ marginTop: '28px', marginLeft: '10px' }}>บาท</Typography>
                            </Grid>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={10}>
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
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6} className={classes.formColumn}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
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
                  <Grid item xs={5} sx={{ marginTop: '15px' }}>
                    <Controller
                      name="age"
                      control={control}
                      render={({ field: { value } }) => (
                        <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Typography>{value ? `อายุ: ${value}` : 'อายุ'}</Typography>
                          <Typography sx={{ marginLeft: '10px' }}>ปี</Typography>
                        </Grid>
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={10}>
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
                </Grid>

                <Grid item xs={10}>
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
                </Grid>

                <Grid item xs={10}>
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
                </Grid>

                <Grid item xs={10}>
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ProfileCustomer;
