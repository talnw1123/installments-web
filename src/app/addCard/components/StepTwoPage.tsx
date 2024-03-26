import { Card, Grid, TextField, Typography } from '@mui/material';
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
    alignItems: 'center',
  },
});

interface StepTwoProps {
  form: UseFormReturn<any, object>;
  nextStep: () => void;
}

const StepTwoPage: React.FC<StepTwoProps> = ({ form, nextStep }) => {
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
                  name="idCard"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} label="เลขประจำตัวประชาชน" variant="standard" fullWidth margin="normal" />
                  )}
                />

                <Controller
                  name="name"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} label="ชื่อ" variant="standard" fullWidth margin="normal" />
                  )}
                />

                <Controller
                  name="phoneNumber"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} label="เบอร์โทรศัพท์" variant="standard" fullWidth margin="normal" />
                  )}
                />

                <Controller
                  name="address"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="ที่อยู่"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                    />
                  )}
                />

                <Controller
                  name="mapLink"
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
                  name="occupation"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} label="อาชีพ" variant="standard" fullWidth margin="normal" />
                  )}
                />

                <Controller
                  name="workNumber"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} label="เบอร์โทรศัพท์ที่ทำงาน" variant="standard" fullWidth margin="normal" />
                  )}
                />

                <Controller
                  name="flagNumber"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} label="เบอร์แฟกซ์ที่ทำงาน" variant="standard" fullWidth margin="normal" />
                  )}
                />
              </Grid>

              <Grid item xs={4} container direction="column" style={{ marginTop: '5px' }}>
                <Grid item>
                  <Controller
                    name="lastName"
                    defaultValue=""
                    control={form?.control}
                    render={({ field }) => (
                      <TextField {...field} label="นามสุกล" variant="standard" fullWidth margin="normal" />
                    )}
                  />

                  <Controller
                    name="addressCurrent"
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

                <Controller
                  name="mapLink"
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
                  name="income"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField {...field} label="รายได้" variant="standard" fullWidth margin="normal" />
                  )}
                />

                <Controller
                  name="workAddress"
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
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
              <button
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={e => {
                  e.preventDefault();
                  nextStep();
                }}
              >
                Next
              </button>
            </Grid>
          </Card>
        </Grid>
      </form>
    </>
  );
};

export default StepTwoPage;
