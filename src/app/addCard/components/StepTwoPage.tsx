'use client';
import { Card, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
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
  formField: {
    marginBottom: '3rem',
  },
  formContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const StepTwoPage = () => {
  const { control, prevStep } = useContext(DataContext);
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.bigContainer}>
        <Card sx={{ padding: 3, width: '75%' }}>
          <Typography variant="h4" sx={{ marginLeft: 11 }}>
            ข้อมูลผู้ค้ำประกัน
          </Typography>

          <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item style={{ width: '50%' }}>
              <Grid container spacing={4} className={classes.formContainer}>
                <Grid item xs={8}>
                  <Controller
                    name="guarantorNationID"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="เลขประจำตัวประชาชน" variant="standard" fullWidth margin="normal" />
                    )}
                  />

                  <Controller
                    name="guarantorFirstName"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="ชื่อ" variant="standard" fullWidth margin="normal" />
                    )}
                  />

                  <Controller
                    name="phoneOfGuarantor"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="เบอร์โทรศัพท์" variant="standard" fullWidth margin="normal" />
                    )}
                  />

                  <Controller
                    name="addressOfGuarantorReal"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ที่อยู่ตามบัตรประชาชน"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                      />
                    )}
                  />

                  <Controller
                    name="googleMapAdressRealOfGuarantor"
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
                    name="jobOfGuarantor"
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

                  <Grid container item spacing={2}>
                    <Grid item xs={10}>
                      <Controller
                        name="incomeOfGuarantor"
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
                    <Grid item xs={2}>
                      <Typography variant="body1" sx={{ marginTop: '35px' }}>
                        บาท
                      </Typography>
                    </Grid>
                  </Grid>
                  <Controller
                    name="phoneOfGuarantorInJob"
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
            </Grid>

            <Grid item style={{ width: '50%' }}>
              <Grid container spacing={4} className={classes.formContainer}>
                <Grid item xs={8}>
                  <Grid item style={{ marginTop: '70px' }}>
                    {' '}
                    <Controller
                      name="guarantorLastName"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} label="นามสุกล" variant="standard" fullWidth margin="normal" />
                      )}
                    />
                  </Grid>

                  <Grid item style={{ marginTop: '72px' }}>
                    {' '}
                    <Controller
                      name="addressOfGuarantorCurrent"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ที่อยู่ปัจจุบัน"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          multiline
                          rows={4}
                        />
                      )}
                    />
                  </Grid>

                  <Controller
                    name="googleMapAdressCurrentOfGuarantor"
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
                    name="addressOfGuarantorJob"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ที่อยู่ที่ทำงาน"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                      />
                    )}
                  />
                  <Controller
                    name="googleMapAdressJobOfGuarantor"
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

export default StepTwoPage;
