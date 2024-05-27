'use client';
import CircleIcon from '@mui/icons-material/Circle';
import { Card, Grid, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';


dayjs.extend(utc);

const HomePage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalPaidInRange, setTotalPaidInRange] = useState(0);
  const [totalDeptInRange, setTotalDeptInRange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4400/api/dailyLogs');
        const dataWithConvertedDates = response.data.map(item => ({
          ...item,
          date: dayjs(item.date)
        }));
        setGraphData(dataWithConvertedDates);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    updateGraphData(startDate, endDate);
  }, [startDate, endDate, graphData]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const updateGraphData = (start, end) => {
    if (start && end) {
      const filtered = graphData.filter(item => {
        const currentDate = dayjs(item.date);
        return currentDate.isAfter(start.startOf('day').subtract(1, 'day')) && currentDate.isBefore(end.endOf('day'));
      });

      setFilteredData(filtered);

      const totalPaid = filtered.reduce((sum, item) => sum + item.totalPaid, 0);
      const totalDept = filtered.reduce((sum, item) => sum + item.totalDept, 0);

      setTotalPaidInRange(totalPaid);
      setTotalDeptInRange(totalDept);
    } else {
      setFilteredData([]);
      setTotalPaidInRange(0);
      setTotalDeptInRange(0);
    }
  };

  return (
    <Grid container justifyContent="center" padding="1rem">
      <Card sx={{ padding: 3, width: '80%' }}>
        <Typography variant="h4">สรุปการผ่อนชำระสินค้า</Typography>
        <Grid container justifyContent="center" alignItems="center" marginBottom="1rem" marginTop="1rem">
          <Grid item marginRight="1rem">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="วันที่เริ่มต้น"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} variant="standard" fullWidth margin="normal" />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item marginRight="1rem">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="วันที่สิ้นสุด"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} variant="standard" fullWidth margin="normal" />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Card sx={{ height: '300px', width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LineChart
              xAxis={[
                {
                  data: filteredData.map(item => item.date),
                  scaleType: 'time',
                  label: 'วันที่'
                }
              ]}
              series={[
                {
                  label: 'ยอดจ่ายแล้ว',
                  data: filteredData.map(item => item.totalPaid),
                  color: '#2196f3'
                },
                {
                  label: 'ยอดค้าง',
                  data: filteredData.map(item => item.totalDept),
                  color: '#4caf50'
                }
              ]}
              height={300}
              width={600}
            />
          </Card>
        </Grid>
        <Grid container marginTop="20px" marginLeft="9.5%">
          <Grid item display="flex">
            <CircleIcon style={{ color: '#2196f3', marginRight: '10px' }} />
            <Typography style={{ color: '#2196f3', marginRight: '27px' }}>ยอดจ่ายแล้ว</Typography>
            <Typography style={{ color: '#2196f3', marginRight: '25px' }}>{totalPaidInRange.toFixed(2)}</Typography>
            <Typography style={{ color: '#2196f3' }}>บาท</Typography>
          </Grid>
          <Grid item display="flex" marginTop="5px">
            <CircleIcon style={{ color: '#4caf50', marginRight: '10px' }} />
            <Typography style={{ color: '#4caf50', marginRight: '55px' }}>ยอดค้าง</Typography>
            <Typography style={{ color: '#4caf50', marginRight: '25px' }}>{totalDeptInRange.toFixed(2)}</Typography>
            <Typography style={{ color: '#4caf50' }}>บาท</Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default HomePage;
