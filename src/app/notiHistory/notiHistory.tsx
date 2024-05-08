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
import Link from 'next/link';
import { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
('app/ProfileCustomerPage');

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
    maxWidth: '800px',
    minHeight: '400px',
  },
});

export default function NotiHistoryPage() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [filteredRows, setFilteredRows] = useState(Users);
  const [selectedUser, setSelectedUser] = useState(Users[0]);

  const handleProfileClick = row => {
    setSelectedUser(row);
  };

  const getFullName = row => {
    return (
      <Link href={`/profileCustomer?id=${row.id}`} passHref>
        <Typography component="a" onClick={() => handleProfileClick(row)}>
          {`${row.first_name || ''} ${row.last_name || ''}`}
        </Typography>
      </Link>
    );
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedDate(newValue);
    // Filter rows based on the selected date
    const filteredRows = newValue
      ? Users.filter(row => dayjs(row.notiDate, 'DD/MM/YYYY').isSame(newValue, 'date'))
      : Users;
    setFilteredRows(filteredRows);
  };

  const columns: GridColDef[] = [
    { field: 'notiDate', headerName: 'วันที่แจ้งเตือน', width: 190, headerAlign: 'center', align: 'center' },
    {
      field: 'first_name',
      headerName: 'ชื่อจริง',
      width: 160,
      headerAlign: 'center',
      align: 'center',
      renderCell: params => getFullName(params.row),
    },
    { field: 'last_name', headerName: 'นามสกุล', width: 160, headerAlign: 'center', align: 'center' },
    { field: 'billNumber', headerName: 'หมายเลขบิล', width: 160, headerAlign: 'center', align: 'center' },
    { field: 'term', headerName: 'งวดที่', width: 100, headerAlign: 'center', align: 'center' },
  ];

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '80%' }}>
        <Grid>
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
        </Grid>
      </Card>
    </Grid>
  );
}
