import { Card, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

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

interface StepOneProps {
  form: UseFormReturn<any, object>;
  nextStep: () => void;
  statuses: string[];
  age: string;
}

const StepOnePage: React.FC<StepOneProps> = ({ form, nextStep, statuses, age }) => {
  const classes = useStyles();
  return (
    <>
      <form>
        <Grid container spacing={4} className={classes.formContainer}>
          <Card sx={{ padding: 3, width: '75%', marginTop: 5 }}>
            <Typography variant="h4" sx={{ marginLeft: 22 }}>
              ข้อมูลผู้กู้
            </Typography>
            <Grid container spacing={2} className={classes.formContainer}>
              <Grid item xs={4}>
                <Controller
                  name="idCard"
                  defaultValue=""
                  control={form?.control}
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
                  name="name"
                  defaultValue=""
                  control={form?.control}
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

                <Controller
                  name="phoneNumber"
                  defaultValue=""
                  control={form?.control}
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

                <Controller
                  name="address"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="ที่อยู่"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      className={classes.formField}
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

                <Grid container item spacing={2}>
                  <Grid item xs={6}>
                    <Controller
                      name="status"
                      defaultValue=""
                      control={form.control}
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
                          {statuses.map(status => (
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
                      name="numOfChild"
                      defaultValue=""
                      control={form?.control}
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
                  name="spouseName"
                  defaultValue=""
                  control={form?.control}
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

                <Controller
                  name="occupation"
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
                  name="workNumber"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="เบอร์โทรที่ทำงาน"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />
                  )}
                />

                <Controller
                  name="flagNumber"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="เบอร์แฟกซ์ที่ทำงาน"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />
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

                  <Grid container item spacing={2}>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="birthDate"
                          control={form.control}
                          render={({ field }) => <DatePicker label="วันเกิด" {...field} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="อายุ"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                        value={age}
                        disabled
                      />
                    </Grid>
                  </Grid>

                  <Controller
                    name="address"
                    defaultValue=""
                    control={form?.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ที่อยู่"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        className={classes.formField}
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
                    name="lastName"
                    defaultValue=""
                    control={form?.control}
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
                    name="income"
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
                    name="workAddress"
                    defaultValue=""
                    control={form?.control}
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

            <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
              <button
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
export default StepOnePage;
