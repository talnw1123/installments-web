// step1;
'use client';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GridColDef } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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

const rows = [
  {
    id: 1,
    lastName: 'Snow',
    firstName: 'Jon',
    date: '24/02/45',
    bill: '600',
    period: '600',
  },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
  { id: 3, lastName: 'เหมวรรณานุกูล', firstName: 'พัชณิดา' },
  { id: 4, lastName: 'Stark', firstName: 'Arya' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerk' },
];

const getFullName = row => {
  return `${row.firstName || ''} ${row.lastName || ''}`;
};

const columns: GridColDef[] = [
  { field: 'date', headerName: 'วันที่แจ้งเตือน', width: 160, headerAlign: 'center', align: 'center' },
  { field: 'firstName', headerName: 'ชื่อจริง', width: 160, headerAlign: 'center', align: 'center' },
  { field: 'lastName', headerName: 'นามสกุล', width: 160, headerAlign: 'center', align: 'center' },
  { field: 'bill', headerName: 'หมายเลขบิล', width: 130, headerAlign: 'center', align: 'center' },
  { field: 'period', headerName: 'งวดที่', width: 130, headerAlign: 'center', align: 'center' },
];

export default function HomePage() {
  const classes = useStyles();
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    setEndDate(date);
  };

  return (
    <Grid container className={classes.bigContainer}>
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

            <Button variant="contained" color="primary">
              ค้นหา
            </Button>
          </Grid>
        </form>

        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card sx={{ height: '300px', width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Graph</Typography>
          </Card>
        </Grid>
      </Card>
    </Grid>
  );
}
