'use client';

import { Box, Button, Card, Grid, MenuItem, TextField, ThemeProvider, createTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import MenuList from 'app/customerInformation/page';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import 'react-multi-carousel/lib/styles.css';
import { DataContext1 } from '../profileCustomer/profileData';

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  formBigContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '50%',
    padding: '0 1rem',
  },
  formBigColumn: {
    borderLeft: '2px solid lightgray',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formField: {
    marginBottom: '3rem',
  },
  column: {
    padding: '20px',
  },
  box: {
    width: '25%',
    display: 'flex',
    alignItems: 'center',
  },
  showBox: {
    width: 300,
    height: 50,
    borderRadius: 1,
    bgcolor: '#FFFFFF',
    marginTop: 5,
    marginBottom: 5,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#007FFF',
      dark: '#0066CC',
    },
  },
  typography: {
    body1: {
      fontSize: '1rem',
    },
  },
});

export default function PayPage() {
  //select bill
  const [selectedBill, setSelectedBill] = useState('');
  const handleBillSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBill(event.target.value);
  };

  const classes = useStyles();
  const router = useRouter();

  // checkbox
  const [checklist, setChecklist] = useState<number[]>([]);
  const [lateFees, setLateFees] = useState<number>(0);

  const handleChecklist = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setChecklist([...checklist, Number(value)]);
    } else {
      setChecklist(checklist.filter(item => item !== Number(value)));
    }
  };

  const [bills, setBills] = useState([]);
  const searchParams = useSearchParams(); // Destructure using square brackets
  const id = searchParams.get('id');
  const { control, setValue, setAge } = useContext(DataContext1);

  useEffect(() => {
    // ตรวจสอบว่า control ไม่เป็น null และมีค่าตรงกับที่คาดหวัง
    if (control !== null && typeof control === 'object') {
      // ทำงานกับค่า control ได้ตามปกติ
    }
  }, [control]); // อัพเดท effect เมื่อค่า control เปลี่ยน

  const [borrowerData, setBorrowerData] = useState(null);
  useEffect(() => {
    console.log('DataContext1:', DataContext1);
    console.log('control:', control);
    const fetchBorrowerData = async () => {
      try {
        const response = await fetch(`http://localhost:4400/api/getEachBorrowers/${id}`);
        const data = await response.json();
        if (response.ok) {
          setBorrowerData(data);
          // เก็บข้อมูลบิล
          if (data && data.length > 0) {
            const { bills } = data[0]; // ดึงข้อมูลบิลจากอ็อบเจกต์ data
            setBills(bills); // เก็บข้อมูลบิลใน state
            // อัปเดตค่าใน form เมื่อได้รับข้อมูลจาก API
            const { borrower } = data[0];
            setValue('nationID', borrower.nationID || '');
            setValue('phone', borrower.phone || '');
            setValue('firstName', borrower.firstName || '');
            setValue('lastName', borrower.lastName || '');
            setValue('birthDate', borrower.birthDate || null);
          }
        } else {
          console.error('Error fetching data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchBorrowerData();
    }
  }, [id, setValue]);

  // columns
  const paymentColumn: GridColDef[] = [
    {
      field: 'checkbox',
      headerName: '',
      width: 100,
      renderCell: params => <input type="checkbox" onChange={handleChecklist} value={Number(params.row.amountDue)} />,
    },
    {
      field: 'numberOfInstallment',
      headerName: 'งวดที่',
      width: 100,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'dueDate',
      headerName: 'วันที่ครบกำหนด',
      width: 100,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'status', headerName: 'สถานะ', width: 100, sortable: false, align: 'center', headerAlign: 'center' },
    {
      field: 'amountDue',
      headerName: 'เงินที่ต้องชำระ',
      type: 'number',
      width: 110,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'interest',
      headerName: 'ดอกเบี้ย',
      type: 'number',
      width: 90,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'principle',
      headerName: 'เงินต้น',
      type: 'number',
      width: 90,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
    },
  ];

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '80%' }}>
        <Grid container className={classes.topContainer}>
          <Typography variant="h4" sx={{ marginLeft: '12.5px' }}>
            ชำระเงิน
          </Typography>
        </Grid>
        <Grid container className={classes.formContainer}>
          <Grid className={classes.formBigContainer}>
            <Grid>
              <MenuList />
            </Grid>
            <Grid className={classes.formBigColumn}>
              <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item xs={6} className={classes.column}>
                  <Controller
                    name="nationID"
                    defaultValue={' '}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="เลขประจำตัวประชาชน"
                        variant="standard"
                        fullWidth
                        margin="dense"
                        // className={classes.formField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} className={classes.column}>
                  <Controller
                    name="phone"
                    defaultValue={' '}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="เบอร์โทรศัพท์"
                        variant="standard"
                        fullWidth
                        margin="dense"
                        // className={classes.formField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid item xs={12} sm={3} className={classes.column}>
                    <Controller
                      name="firstName"
                      defaultValue={' '}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ชื่อ"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          // className={classes.formField}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} className={classes.column}>
                    <Controller
                      name="lastName"
                      defaultValue={' '}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="นามสกุล"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          //className={classes.formField}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} className={classes.column}>
                    <Controller
                      name="birthDate"
                      defaultValue={' '}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="วันเดือนปีเกิด"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          // className={classes.formField}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} className={classes.column}>
                    <Controller
                      name="age"
                      control={control}
                      defaultValue={''}
                      //defaultValue={Users[0].age}
                      render={({ field: { value } }) => (
                        <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Typography>{value ? `อายุ: ${value}` : 'อายุ'}</Typography>
                          <Typography sx={{ marginLeft: '10px' }}>ปี</Typography>
                        </Grid>
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.column}>
                  <TextField
                    label="เลือกบิลที่ต้องการจ่าย"
                    variant="standard"
                    select
                    fullWidth
                    margin="normal"
                    className={classes.formField}
                    sx={{ width: '50%' }}
                    value={selectedBill}
                    onChange={handleBillSelect}
                  >
                    {bills.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {/* table */}
                <Grid item xs={12} className={classes.column}>
                  <Box sx={{ height: 400, width: '100%' }}>
                    {/* select data */}
                    <DataGrid
                      rows={row.filter(row => row.bill === selectedBill)}
                      columns={paymentColumn}
                      disableColumnFilter
                      disableColumnSelector
                      disableColumnMenu
                      components={{
                        Toolbar: () => (
                          <Typography variant="body1" sx={{ marginTop: '1rem', marginLeft: '1rem' }}>
                            เลือกงวดที่ต้องการจ่าย
                          </Typography>
                        ),
                      }}
                      disableRowSelectionOnClick
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      <Grid className={classes.box}>
        <Typography variant="body1" sx={{ marginRight: '10px' }}>
          ค่าปรับ
        </Typography>
        <TextField
          type="number"
          onChange={e => setLateFees(Number(e.target.value))}
          id="outlined-basic"
          variant="outlined"
          sx={{ bgcolor: '#FFFFFF' }}
        />
        <Typography variant="body1" sx={{ marginLeft: '10px' }}>
          บาท
        </Typography>
      </Grid>
      <Grid className={classes.box}>
        <Typography variant="body1" sx={{ marginRight: '10px' }}>
          รวมเป็นเงิน
        </Typography>
        <ThemeProvider theme={theme}>
          <Box className={classes.showBox}>
            <Typography variant="body1">
              {checklist.reduce((acc, curr) => acc + curr, 0) + Number(lateFees)} บาท
            </Typography>
          </Box>
        </ThemeProvider>
        <Button
          variant="contained"
          onClick={() => router.push('/installmentHis')}
          sx={{
            backgroundColor: '#718171',
            borderRadius: '1px',
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
