'use client';
import { Card, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MenuList from 'app/customerInformation/page';
import { Users } from 'app/users';
import dayjs from 'dayjs';
import { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';

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
    display: 'flex',
    justifyContent: 'center',
    height: '850px',
    borderLeft: '2px solid lightgray',
  },
  formField: {
    marginBottom: '3rem',
  },
});

export default function EditProfileCustomerPage() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [age, setAge] = useState('');

  const statuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  // const navigate = useNavigate();

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
      <Card sx={{ padding: 3, minHeight: '950px', width: '80%', display: 'flex', flexDirection: 'column' }}>
        <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ marginLeft: '12.5px', marginBottom: '30px' }}>
            ประวัติผู้กู้
          </Typography>
        </Grid>

        <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid>
            <MenuList />
          </Grid>
          <Grid>
            <form>
              <Grid container spacing={2} className={classes.formContainer}>
                <Grid item xs={4}>
                  <TextField
                    label="บัตรประจำตัวประชาชน"
                    defaultValue={Users[0].id}
                    variant="standard"
                    fullWidth
                    margin="normal"
                    className={classes.formField}
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <TextField
                    disabled
                    label="ชื่อ"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    className={classes.formField}
                  />

                  <TextField
                    disabled
                    label="เบอร์โทรศัพท์"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    className={classes.formField}
                  />
                  <TextField
                    disabled
                    label="ที่อยู่"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    className={classes.formField}
                  />

                  <TextField
                    disabled
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
                      <TextField
                        disabled
                        label="จำนวนบุตร"
                        variant="standard"
                        fullWidth
                        className={classes.formField}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    disabled
                    label="ชื่อคู่สมรส"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    className={classes.formField}
                  />

                  <TextField
                    disabled
                    label="อาชีพ"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    className={classes.formField}
                  />

                  <TextField
                    disabled
                    label="เบอร์โทรที่ทำงาน"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    className={classes.formField}
                  />

                  <TextField
                    disabled
                    label="เบอร์แฟกซ์ที่ทำงาน"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    className={classes.formField}
                  />
                </Grid>

                <Grid item xs={4} container direction="column" style={{ marginTop: '28px' }}>
                  <Grid item>
                    <TextField
                      disabled
                      label="นามสกุล"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />

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
                          disabled
                          label="อายุ"
                          variant="standard"
                          fullWidth
                          margin="normal"
                          className={classes.formField}
                          value={age}
                        />
                      </Grid>
                    </Grid>

                    <TextField
                      disabled
                      label="ที่อยู่"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      className={classes.formField}
                    />

                    <TextField
                      disabled
                      label="Google Map link"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />

                    <TextField
                      disabled
                      label="นามสกุล"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />

                    <TextField
                      disabled
                      label="รายได้"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />

                    <TextField
                      disabled
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
            </form>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
