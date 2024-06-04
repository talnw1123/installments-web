'use client';
import { Card, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useContext } from 'react';
import { Controller } from 'react-hook-form';
import { DataContext } from './addCard';

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

const StepOnePage = () => {
  const { control, statuses, setValue, calculateAge, setAge } = useContext(DataContext);
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.bigContainer}>
        <Card sx={{ padding: 3, width: '75%' }}>
          <Typography variant="h4" sx={{ marginLeft: 11 }}>
            ข้อมูลลูกค้า
          </Typography>
          <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item style={{ width: '50%' }}>
              <Grid container spacing={4} className={classes.formContainer}>
                <Grid item xs={8}>
                  <Controller
                    name="nationID"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="เลขประจำตัวประชาชน"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />
                    )}
                  />

                  <Controller
                    name="firstName"
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
                        name="job"
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
                        name="income"
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
                        name="phoneInJob"
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
                    name="addressReal"
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
                    name="googleMapAdressReal"
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

                  <Grid item style={{ marginTop: '77px' }}>
                    {' '}
                    <Grid container item spacing={2}>
                      <Grid item xs={6}>
                        <Controller
                          name="status"
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
                          name="kids"
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
                  </Grid>

                  <Controller
                    name="firstNameOfSpouse"
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
                        name="jobOfSpouse"
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
                        name="incomeOfSpouse"
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
                        name="phoneOfSpouseInJob"
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
                    name="phoneOfSpouse"
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

            <Grid item style={{ width: '50%' }}>
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
                                const age = calculateAge(newValue);
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
                        name="phone"
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
                    name="lastName"
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
                    name="addressCurrent"
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
                    name="googleMapAdressCurrent"
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
                    name="addressJob"
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
                    name="googleMapAdressJob"
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
                    name="lastNameOfSpouse"
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
                    name="addressOfSpouseJob"
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
                    name="googleMapAdressJobOfSpouse"
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
        </Card>
      </Grid>
    </>
  );
};
export default StepOnePage;
