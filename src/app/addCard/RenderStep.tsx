import {
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Slider,
  Switch,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { StepParams } from '../../../typings/renderStepProps';

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
    marginBottom: '4rem',
  },
});

interface RenderStepProps {
  step: number;
  data: { name: string; email: string; password: string };
  handleChange: React.ChangeEventHandler;
  form: UseFormReturn<StepParams, object>;
  nextStep: () => void;
  statuses: string[];
  selectedDate: dayjs.Dayjs | null;
  handleDateChange: (newValue: dayjs.Dayjs | null) => void;
  valuetext: (value: number, index: number) => string;
  age: string;
}

const RenderStep: React.FC<RenderStepProps> = ({
  step,
  nextStep,
  form,
  statuses,
  selectedDate,
  handleDateChange,
  valuetext,
  age,
}) => {
  const classes = useStyles();
  switch (step) {
    case 0:
      return (
        <>
          <form>
            <Typography variant="h4">ข้อมูลผู้กู้</Typography>
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
                      variant="standard"
                      fullWidth
                      margin="normal"
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

              <Grid item xs={4} container direction="column" style={{ marginTop: '28px' }}>
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
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <DatePicker
                              label="วันเกิด"
                              value={value ? dayjs(value) : null}
                              onChange={newValue => {
                                onChange(newValue ? newValue.toDate() : null);
                              }}
                              renderInput={(params: TextFieldProps) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                  fullWidth
                                  margin="normal"
                                  error={!!error}
                                  helperText={error ? error.message : null}
                                  className={classes.formField}
                                />
                              )}
                            />
                          )}
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
                        variant="standard"
                        fullWidth
                        margin="normal"
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
          </form>
        </>
      );
    case 1:
      return (
        <>
          <form>
            <Grid container className={classes.bigContainer}>
              <Typography variant="h5" style={{ marginBottom: '20px' }}>
                ข้อมูลผู้กู้ที่ประกัน
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
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
                    name="lastName"
                    defaultValue=""
                    control={form?.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="นามสุกล"
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
                    control={form?.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ที่อยู่ปัจจุบัน"
                        variant="standard"
                        fullWidth
                        margin="normal"
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

                  <Controller
                    name="workAddress"
                    defaultValue=""
                    control={form?.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ที่อยู่ที่ทำงาน"
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
                <button
                  onClick={e => {
                    e.preventDefault();
                    nextStep();
                  }}
                >
                  Next
                </button>
              </Grid>
            </Grid>
          </form>
        </>
      );
    case 2:
      return (
        <>
          <form>
            <Typography variant="h4">สร้างการ์ดผ่อนสินค้า</Typography>
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
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="วันที่ทำสัญญา"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params: TextFieldProps) => (
                      <TextField
                        {...params}
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />
                    )}
                  />
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

              <Grid item xs={3}>
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

              <Grid item xs={3}>
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

              <Grid item xs={3}>
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

              <Grid item xs={3}>
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

              <Grid item xs={3}>
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
                <Button variant="contained" color="primary">
                  Finish
                </Button>
              </Grid>
            </Grid>
          </form>
          <button type="submit">Submit</button>
        </>
      );
    default:
      return null;
  }
};

export default RenderStep;

//เอา form ครอบ text input ทั้งหมด
