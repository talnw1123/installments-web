//step 3
'use client';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import { makeStyles } from '@mui/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';

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

function valuetext(value: number) {
  return `${value}%`;
}

export default function StepThreePage() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const [age, setAge] = useState('');

  const statuses = ['Single', 'Married', 'Divorced', 'Widowed'];

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedDate(newValue);
    if (newValue) {
      const calculatedAge = calculateAge(newValue);
      setAge(calculatedAge.toString());
    }
  };

  const calculateAge = (birthday: dayjs.Dayjs) => {
    const now = dayjs();
    return now.diff(birthday, 'year');
  };

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 6, width: '75%' }}>
        <form>
          <Typography variant="h4">สร้างการ์ดผ่อนสินค้า</Typography>
          <Grid container spacing={2} className={classes.formContainer}>
            <Grid item xs={4}>
              <TextField
                label="หมายเลขบิล"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="วันที่ทำสัญญา"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={params => (
                    <TextField {...params} variant="standard" fullWidth margin="normal" className={classes.formField} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="หมายเลขสัญญา"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="รวมยอดเงินกู้"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel control={<Switch defaultChecked />} label="ภาษี" className={classes.formField} />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="เป็นเงินภาษี"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="มูลค่าสินค้าคงเหลือ"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
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
              <TextField
                label="กรอกจำนวนเงิน"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
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
              <TextField
                label="อัตราดอกเบี้ย"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />
            </Grid>

            <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary">
                Finish
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
}
