import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

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
    alignItems: 'flex-start',
  },
});

interface StepTwoProps {
  form: UseFormReturn<any, object>;
  nextStep: () => void;
  prevStep: () => void;
}

const StepTwoPage: React.FC<StepTwoProps> = ({ form, nextStep, prevStep }) => {
  const classes = useStyles();

  return (
    <>
      <form>
        <Grid container className={classes.bigContainer}>
          <Card sx={{ padding: 3, width: '75%' }}>
            <Typography variant="h4" sx={{ marginLeft: 22 }}>
              ข้อมูลผู้ค้ำประกัน
            </Typography>

            <Grid container spacing={4} className={classes.formContainer}>
              <Grid item xs={4}>
                <Controller
                  name="idGuarantor"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} label="เลขประจำตัวประชาชน" variant="standard" fullWidth margin="normal" />
                  )}
                />

                <Controller
                  name="nameGuarantor"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} label="ชื่อ" variant="standard" fullWidth margin="normal" />
                  )}
                />

                <Controller
                  name="phoneNumberGuarantor"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} label="เบอร์โทรศัพท์" variant="standard" fullWidth margin="normal" />
                  )}
                />

                <Controller
                  name="addressDefaultGuarantor"
                  defaultValue=""
                  control={form?.control}
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
                  name="mapLinkDefaultGuarantor"
                  defaultValue=""
                  control={form?.control}
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

                <Grid container item>
                  <Grid item xs={12}>
                    <Controller
                      name="occupationGuarantor"
                      defaultValue=""
                      control={form?.control}
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
                    <Controller
                      name="incomeGuarantor"
                      defaultValue=""
                      control={form?.control}
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
                    <Controller
                      name="workPhoneNumberGuarantor"
                      defaultValue=""
                      control={form?.control}
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

              <Grid item xs={4} container direction="column" style={{ marginTop: '5px' }}>
                <Grid item>
                  <Grid item style={{ marginTop: '67px' }}>
                    {' '}
                    <Controller
                      name="lastNameGuarantor"
                      defaultValue=""
                      control={form?.control}
                      render={({ field }) => (
                        <TextField {...field} label="นามสุกล" variant="standard" fullWidth margin="normal" />
                      )}
                    />
                  </Grid>

                  <Grid item style={{ marginTop: '72px' }}>
                    {' '}
                    <Controller
                      name="addressCurrentGuarantor"
                      defaultValue=""
                      control={form?.control}
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
                </Grid>

                <Controller
                  name="mapLinkCurrentGuarantor"
                  defaultValue=""
                  control={form?.control}
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
                  name="workAddressGuarantor"
                  defaultValue=""
                  control={form?.control}
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
                  name="mapLinkWorkGuarantor"
                  defaultValue=""
                  control={form?.control}
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

            <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={e => {
                  e.preventDefault();
                  prevStep();
                }}
              >
                Back
              </Button>
              <Button
                color="primary"
                variant="contained"
                style={{ marginTop: '20px' }}
                onClick={e => {
                  e.preventDefault();
                  nextStep();
                }}
              >
                Next
              </Button>
            </Grid>
          </Card>
        </Grid>
      </form>
    </>
  );
};

export default StepTwoPage;
