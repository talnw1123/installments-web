// step1;
'use client';
import { Button, Card, Grid, MenuItem, TextField, Typography } from '@mui/material';
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

export default function StepOnePage() {
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
      <Card sx={{ padding: 3, width: '75%' }}>
        <form>
          <Typography variant="h4">ข้อมูลผู้กู้</Typography>

          <Grid container spacing={2} className={classes.formContainer}>
            <Grid item xs={4}>
              <TextField
                label="บัตรประจำตัวประชาชน"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />

              <TextField label="ชื่อ" variant="standard" fullWidth margin="normal" className={classes.formField} />

              <TextField
                label="เบอร์โทรศัพท์"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />
              <TextField label="ที่อยู่" fullWidth margin="normal" multiline rows={4} className={classes.formField} />

              <TextField
                label="Google Map link"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />

              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <TextField label="สถานะภาพ" variant="standard" fullWidth select className={classes.formField}>
                    {statuses.map(status => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField label="จำนวนบุตร" variant="standard" fullWidth className={classes.formField} />
                </Grid>
              </Grid>
              <TextField
                label="ชื่อคู่สมรส"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />

              <TextField label="อาชีพ" variant="standard" fullWidth margin="normal" className={classes.formField} />

              <TextField
                label="เบอร์โทรที่ทำงาน"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />

              <TextField
                label="เบอร์แฟกซ์ที่ทำงาน"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />
            </Grid>

            <Grid item xs={4} container direction="column" style={{ marginTop: '28px' }}>
              <Grid item>
                <TextField label="นามสกุล" variant="standard" fullWidth margin="normal" className={classes.formField} />

                <Grid container item spacing={2}>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="วันเกิด"
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={params => (
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

                <TextField label="ที่อยู่" fullWidth margin="normal" multiline rows={4} className={classes.formField} />

                <TextField
                  label="Google Map link"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  className={classes.formField}
                />

                <TextField label="นามสกุล" variant="standard" fullWidth margin="normal" className={classes.formField} />

                <TextField label="รายได้" variant="standard" fullWidth margin="normal" className={classes.formField} />

                <TextField
                  label="ที่อยู่ที่ทำงาน"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  className={classes.formField}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary">
              Next
            </Button>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
}
