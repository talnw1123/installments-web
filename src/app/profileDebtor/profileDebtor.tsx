'use client';
import { Card, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
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

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 80,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

export default function ProfileDebtorPage() {
  const classes = useStyles();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || 'ประวัติผู้กู้';
  const menuList = [
    'ประวัติผู้กู้',
    'ชำระเงิน',
    'ประวัติการชำระเงิน',
    'สร้างการ์ดผ่อนสินค้า',
    'ประวัติการผ่อนสินค้า',
    'ติดตามหนี้',
  ];

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
      <Card sx={{ padding: 3, minHeight: 800, width: '80%' }}>
        <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', borderRight: '2px solid lightgray' }}>
            <Grid item sx={{ marginTop: '2rem' }}>
              <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                {menuList.map(item => (
                  <Grid item key={item}>
                    <Typography
                      sx={{ fontWeight: searchType === item ? 700 : 0, cursor: 'pointer' }}
                      onClick={() => {
                        router.push(`/profileDebtor?type=${item}`);
                      }}
                      component="span"
                    >
                      {item.toUpperCase()}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9} sx={{ display: 'grid' }}>
            <Grid container className={classes.bigContainer}>
              <form>
                <Grid container spacing={2} className={classes.formContainer}>
                  <Grid item xs={4}>
                    <TextField
                      label="บัตรประจำตัวประชาชน"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />

                    <TextField
                      label="ชื่อ"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />

                    <TextField
                      label="เบอร์โทรศัพท์"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />
                    <TextField
                      label="ที่อยู่"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      className={classes.formField}
                    />

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

                    <TextField
                      label="อาชีพ"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                    />

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
                      <TextField
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

                      <TextField
                        label="ที่อยู่"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        className={classes.formField}
                      />

                      <TextField
                        label="Google Map link"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />

                      <TextField
                        label="นามสกุล"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />

                      <TextField
                        label="รายได้"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />

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
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
