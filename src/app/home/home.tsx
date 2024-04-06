'use client';
import CircleIcon from '@mui/icons-material/Circle';
import { Card, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Data } from 'app/data';
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
  formField: {
    marginBottom: '0',
  },
  topContainer: {
    display: 'flex',
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  column: {
    width: '25%',
    padding: '10px',
  },
  debtorListContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  debtorList: {
    width: '100%',
    minWidth: '500px',
    maxWidth: '750px',
  },
});

const data = Data;

export default function HomePage() {
  const classes = useStyles();
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    setStartDate(date);
    updateGraphData(date, endDate);
  };

  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    setEndDate(date);
    updateGraphData(startDate, date);
  };
  const updateGraphData = (start: dayjs.Dayjs | null, end: dayjs.Dayjs | null) => {
    if (start && end) {
      const filteredData = data.filter(item => {
        const currentDate = dayjs(item.date, 'DD/MM/YYYY');
        return currentDate.isAfter(start.startOf('day').subtract(1, 'day')) && currentDate.isBefore(end.endOf('day'));
      });

      const step = Math.ceil(filteredData.length / 8);
      const averagedData = filteredData.reduce((result, item, index) => {
        if (index % step === 0) {
          result.push({
            paid: filteredData.slice(index, index + step).reduce((sum, item) => sum + item.paid, 0) / step,
            dept: filteredData.slice(index, index + step).reduce((sum, item) => sum + item.dept, 0) / step,
          });
        }
        return result;
      }, []);

      setGraphData(averagedData);
    } else {
      setGraphData([]);
    }
  };

  const totalPaid = data.reduce((sum, item) => sum + item.paid, 0);
  const totalDept = data.reduce((sum, item) => sum + item.dept, 0);

  return (
    <Grid container className={classes.bigContainer} sx={{ display: '' }}>
      <Card sx={{ padding: 3, width: '80%' }}>
        <form>
          <Typography variant="h4">สรุปการผ่อนชำระสินค้า</Typography>

          <Grid container className={classes.topContainer}>
            <Grid item sx={{ marginRight: '1rem' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* Start Date Picker */}
                <DatePicker
                  label="วันที่เริ่มต้น"
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={params => (
                    <TextField {...params} variant="standard" fullWidth margin="normal" className={classes.formField} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item sx={{ marginRight: '1rem' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* End Date Picker */}
                <DatePicker
                  label="วันที่สิ้นสุด"
                  value={endDate}
                  onChange={handleEndDateChange}
                  renderInput={params => (
                    <TextField {...params} variant="standard" fullWidth margin="normal" className={classes.formField} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            {/* <Button variant="contained" color="primary">
              ค้นหา
            </Button> */}
          </Grid>
        </form>

        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card sx={{ height: '300px', width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LineChart
              series={[
                { curve: 'linear', data: graphData.map(item => item.paid) },
                { curve: 'linear', data: graphData.map(item => item.dept) },
              ]}
            />
          </Card>
        </Grid>

        <Grid sx={{ display: 'block', marginTop: '20px', marginLeft: '9.5%' }}>
          <Grid sx={{ display: 'flex' }}>
            <CircleIcon style={{ color: '#2196f3', marginRight: '10px' }} />
            <Typography style={{ color: '#2196f3', marginRight: '27px' }}>ยอดจ่ายแล้ว</Typography>
            <Typography style={{ color: '#2196f3', marginRight: '25px' }}>{totalPaid.toFixed(2)}</Typography>
            <Typography style={{ color: '#2196f3' }}>บาท</Typography>
          </Grid>
          <Grid sx={{ display: 'flex', marginTop: '5px' }}>
            <CircleIcon style={{ color: '#4caf50', marginRight: '10px' }} />
            <Typography style={{ color: '#4caf50', marginRight: '55px' }}>ยอดค้าง</Typography>
            <Typography style={{ color: '#4caf50', marginRight: '25px' }}>{totalDept.toFixed(2)}</Typography>
            <Typography style={{ color: '#4caf50' }}>บาท</Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
