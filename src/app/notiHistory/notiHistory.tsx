'use client';
import { Card, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
    maxWidth: '1000px',
    minHeight: '400px',
  },
});

const getFullName = row => {
  return `${row.first_name || ''} ${row.last_name || ''}`;
};

const users = Users;

const columns: GridColDef[] = [
  { field: 'id', headerName: 'เลขประจำตัวประชาชน', width: 190, headerAlign: 'center', align: 'center' },
  { field: 'first_name', headerName: 'ชื่อจริง', width: 160, headerAlign: 'center', align: 'center' },
  { field: 'last_name', headerName: 'นามสกุล', width: 160, headerAlign: 'center', align: 'center' },
  { field: 'phone', headerName: 'เบอร์โทรศัพท์', width: 160, headerAlign: 'center', align: 'center' },
  { field: 'date', headerName: 'วันครบกำหนดชำระ', width: 160, headerAlign: 'center', align: 'center' },
  { field: 'amount', headerName: 'จำนวนเงินที่ค้าง', width: 160, headerAlign: 'center', align: 'center' },
];

export default function NotiHistoryPage() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [filteredRows, setFilteredRows] = useState(users);

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedDate(newValue);
    // Filter rows based on the selected date
    const filteredRows = newValue ? users.filter(row => dayjs(row.date, 'DD/MM/YY').isSame(newValue, 'date')) : users;
    setFilteredRows(filteredRows);
  };

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '80%' }}>
        <form>
          <Typography variant="h4">ประวัติการแจ้งเตือนผู้กู้</Typography>

          <Grid container className={classes.topContainer}>
            <Grid item sx={{ marginRight: '1rem' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="ดูประวัติการแจ้งเตือนลูกหนี้"
                  value={selectedDate}
                  onChange={handleDateChange}
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

        <div className={classes.debtorListContainer}>
          <Box className={classes.debtorList}>
            <DataGrid rows={filteredRows} columns={columns} localeText={{ noRowsLabel: 'ไม่พบข้อมูล' }} />
          </Box>
        </div>
      </Card>
    </Grid>
  );
}
