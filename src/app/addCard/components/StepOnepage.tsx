import { Button, Card, Grid, MenuItem, TextField, Typography } from '@mui/material';
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
  age: Number;
}

const StepOnePage: React.FC<StepOneProps> = ({ form, nextStep, statuses, age }) => {
  const classes = useStyles();
  return (
    <>
      <form>
        <Grid container className={classes.bigContainer}>
          <Card sx={{ padding: 3, width: '75%' }}>
            <Typography variant="h4" sx={{ marginLeft: 22 }}>
              ข้อมูลผู้กู้
            </Typography>

            <Grid container spacing={4} className={classes.formContainer}>
              <Grid item xs={4}>
                <Controller
                  name="idBorrower"
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
                  name="nameBorrower"
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

                <Grid container item spacing={3}>
                  <Grid item xs={4}>
                    <Controller
                      name="occupationBorrower"
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
                  </Grid>
                  <Grid item xs={4}>
                    <Controller
                      name="incomeBorrower"
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
                  </Grid>
                  <Grid item xs={4}>
                    <Controller
                      name="workPhoneNumberBorrower"
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

                <Controller
                  name="addressDefaultBorrower"
                  defaultValue=""
                  control={form?.control}
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
                      name="statusBorrower"
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
                      name="numOfChildBorrower"
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
                  name="nameSpouse"
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

                <Grid container item spacing={3}>
                  <Grid item xs={4}>
                    <Controller
                      name="occupationSpouse"
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
                  </Grid>
                  <Grid item xs={4}>
                    <Controller
                      name="incomeSpouse"
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
                  </Grid>
                  <Grid item xs={4}>
                    <Controller
                      name="workPhoneNumberSpouse"
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

                <Controller
                  name="phoneNumberSpouse"
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
              </Grid>

              <Grid item xs={4} container direction="column">
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="birthDate"
                        control={form.control}
                        render={({ field }) => <DatePicker label="วันเกิด" {...field} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={4}>
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
                  <Grid item xs={4}>
                    <Controller
                      name="phoneNumberBorrower"
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
                  </Grid>
                </Grid>

                <Controller
                  name="lastNameBorrower"
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
                  name="addressCurrentBorrower"
                  defaultValue=""
                  control={form?.control}
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
                  name="workAddressBorrower"
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
                <Controller
                  name="mapLinkWorkBorrower"
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
                <Grid item style={{ marginTop: '72px' }}>
                  {' '}
                  <Controller
                    name="lastNameSpouse"
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
                </Grid>

                <Controller
                  name="workAddressSpouse"
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
                <Controller
                  name="mapLinkWorkSpouse"
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

            <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
              <Button
                color="primary"
                variant="contained"
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
export default StepOnePage;
