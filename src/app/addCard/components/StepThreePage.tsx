import { Button, Card, FormControlLabel, Grid, Slider, Switch, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '2rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  formContainer: {
    marginTop: '20px',
    display: 'grid',
    justifyContent: 'space-evenly',
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
    marginBottom: '4rem',
  },
});

interface StepThreeProps {
  form: UseFormReturn<any, object>;
  onSubmit: () => void;
  selectedDate: dayjs.Dayjs | null;
  handleDateChange: (newValue: dayjs.Dayjs | null) => void;
  valuetext: (value: number, index: number) => string;
  prevStep: () => void;
}

const StepThreePage: React.FC<StepThreeProps> = ({ form, onSubmit, selectedDate, handleDateChange, valuetext }) => {
  const classes = useStyles();

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Grid container className={classes.bigContainer}>
          <Card sx={{ padding: 4, width: '75%' }}>
            <Typography variant="h5" sx={{ marginLeft: 4 }}>
              สร้างการ์ดผ่อนสินค้า
            </Typography>
            <Grid container spacing={2} className={classes.formContainer}>
              <Grid item xs={4}>
                <Controller
                  name="billNumber"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="หมายเลขบิล"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="วันที่ทำสัญญา" value={selectedDate} onChange={handleDateChange} />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="contractNumber"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="หมายเลขสัญญา"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={3}>
                <Controller
                  name="totalLoan"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="รวมยอดเงินกู้"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <FormControlLabel control={<Switch defaultChecked />} label="ภาษี" className={classes.formField} />
              </Grid>

              <Grid item xs={3}>
                <Controller
                  name="taxMoney"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="เป็นเงินภาษี"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={3}>
                <Controller
                  name="inventoryValue"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="มูลค่าสินค้าคงเหลือ"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={3.5}>
                <Typography id="down-payment-slider" gutterBottom>
                  เงินดาว์น
                </Typography>
                <Slider
                  aria-labelledby="down-payment-slider"
                  defaultValue={30}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={10}
                  max={110}
                />
              </Grid>

              <Grid item xs={2}>
                <Controller
                  name="enterAmount"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="กรอกจำนวนเงิน"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={3.5}>
                <Typography id="installment-slider" gutterBottom>
                  จำนวนงวด
                </Typography>
                <Slider
                  aria-labelledby="installment-slider"
                  defaultValue={30}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={15}
                />
              </Grid>

              <Grid item xs={1}>
                <Controller
                  name="interestRates"
                  defaultValue=""
                  control={form?.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="อัตราดอกเบี้ย"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
                <Button type="submit" variant="contained" color="primary">
                  Finish
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </form>
    </>
  );
};
export default StepThreePage;
