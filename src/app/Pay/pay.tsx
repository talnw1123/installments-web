'use client';
import { Button, Card, Grid, MenuItem, TextField, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
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
  column: {
    width: '25%',
    padding: '10px',
  },
  box: {
    width: '25%',
    display: 'flex',
    alignItems: 'center',
  },
});

const billOptions = ['บิลหมายเลข 001', 'บิลหมายเลข 002', 'บิลหมายเลข 003', 'บิลหมายเลข 004'];

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'งวดที่', width: 50 },
  {
    field: 'date',
    headerName: 'วันที่',
    width: 100,
    editable: true,
  },
  {
    field: 'station',
    headerName: 'สถานะ',
    width: 100,
    editable: true,
  },
  {
    field: 'debt',
    headerName: 'เงินที่ต้องชำระ',
    type: 'number',
    width: 70,
    editable: true,
  },
  {
    field: 'interest',
    headerName: 'ดอกเบี้ย',
    type: 'number',
    width: 70,
    editable: true,
  },
  {
    field: 'principle',
    headerName: 'เงินต้น',
    type: 'number',
    width: 70,
    editable: true,
  },
  {
    field: 'accrued_interest',
    headerName: 'ดอกเบี้ยสะสม',
    type: 'number',
    width: 70,
    editable: true,
  },
  {
    field: 'accrued_principle',
    headerName: 'เงินต้นสะสม',
    type: 'number',
    width: 70,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    //valueGetter: (value, row) => `${row.date || ''} ${row.station || ''}`,
  },
];

const rows = [
  { id: 1, station: 'ค้างชำระ', date: '25/03/2024', debt: 14 },
  { id: 2, station: 'ค้างชำระ', date: '25/03/2024', debt: 31 },
  { id: 3, station: 'ค้างชำระ', date: '25/03/2024', debt: 31 },
  { id: 4, station: 'ค้างชำระ', date: '25/03/2024', debt: 11 },
  { id: 5, station: 'ค้างชำระ', date: '25/03/2024', debt: null },
  { id: 6, station: 'ค้างชำระ', date: '25/03/2024', debt: 150 },
  { id: 7, station: 'ค้างชำระ', date: '25/03/2024', debt: 44 },
  { id: 8, station: 'ค้างชำระ', date: '25/03/2024', debt: 36 },
  { id: 9, station: 'ค้างชำระ', date: '25/03/2024', debt: 65 },
];

export default function PayPage() {
  const classes = useStyles();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || 'ชำระเงิน';
  const menuList = [
    'ประวัติลูกหนี้',
    'ชำระเงิน',
    'ประวัติการชำระเงิน',
    'สร้างการ์ดผ่อนสินค้า',
    'ประวัติการผ่อนสินค้า',
    'ติดตามหนี้',
  ];

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [age, setAge] = useState('');

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
                        router.push(`/pay?type=${item}`);
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
                <Grid container className={classes.formContainer}>
                  <Grid className={classes.column}>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-read-only-input"
                        label="เลขบัตรประชาชน"
                        defaultValue=" "
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                      />
                    </Grid>
                  </Grid>

                  <Grid className={classes.column}>
                    <TextField
                      id="standard-read-only-input"
                      label="เบอร์โทรศัพท์"
                      defaultValue=" "
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.formContainer}>
                  <Grid className={classes.column}>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-read-only-input"
                        label="ชื่อ"
                        defaultValue=" "
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                  <Grid className={classes.column}>
                    <TextField
                      id="standard-read-only-input"
                      label="นามสกุล"
                      defaultValue=" "
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid className={classes.column}>
                    <TextField
                      id="standard-read-only-input"
                      label="วันเดือนปีเกิด"
                      defaultValue=" "
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid className={classes.column}>
                    <TextField
                      id="standard-read-only-input"
                      label="อายุ"
                      defaultValue=" "
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <TextField
                    label="เลือกบิลที่ต้องการจ่าย"
                    variant="standard"
                    select
                    fullWidth
                    margin="normal"
                    className={classes.formField}
                    sx={{ width: '30%' }}
                  >
                    {billOptions.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid>
                  <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      checkboxSelection
                      disableRowSelectionOnClick
                    />
                  </Box>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Grid className={classes.box}>
        <Typography variant="body1" sx={{ marginRight: '10px' }}>
          ค่าปรับ
        </Typography>
        <ThemeProvider
          theme={{
            palette: {
              primary: {
                main: '#007FFF',
                dark: '#0066CC',
              },
            },
          }}
        >
          <Box
            sx={{
              width: 170,
              height: 50,
              borderRadius: 1,
              bgcolor: '#FFFFFF',
              marginTop: 5,
              marginBottom: 5,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            hello
          </Box>
        </ThemeProvider>
        <Typography variant="body1" sx={{ marginLeft: '10px' }}>
          บาท
        </Typography>
      </Grid>
      <Grid className={classes.box}>
        <Typography variant="body1" sx={{ marginRight: '10px' }}>
          รวมเป็นเงิน
        </Typography>
        <ThemeProvider
          theme={{
            palette: {
              primary: {
                main: '#007FFF',
                dark: '#0066CC',
              },
            },
          }}
        >
          <Box
            sx={{
              width: 170,
              height: 50,
              borderRadius: 1,
              bgcolor: '#FFFFFF',
              marginTop: 5,
              marginBottom: 5,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            hello
          </Box>
        </ThemeProvider>
        <Typography variant="body1" sx={{ marginLeft: '10px' }}>
          บาท
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#718171',
            borderRadius: '1 px',
            marginLeft: '10px',
            padding: '10px 20px',
          }}
        >
          ยืนยัน
        </Button>
      </Grid>
    </Grid>
  );
}
