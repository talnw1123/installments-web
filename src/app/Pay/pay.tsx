'use client';

import { Box, Button, Card, Grid, MenuItem, TextField, ThemeProvider, createTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { GridColDef } from '@mui/x-data-grid';
import { useRecoilState, userState } from '@store/index';
import MenuList from 'app/customerInformation/page';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
<<<<<<< HEAD
import { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import 'react-multi-carousel/lib/styles.css';
import { DataContext1 } from '../profileCustomer/profileData';
=======
import { useEffect, useState } from 'react';
>>>>>>> efb7ef737cba61662dbcf84edbc5d6b2f1f5a3d0

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
<<<<<<< HEAD
  //select bill
=======
  const classes = useStyles();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nationID = searchParams.get('nationID') || 'defaultID';
  const searchType = searchParams.get('type') || 'ชำระเงิน';
  const menuList = [
    'ประวัติผู้กู้',
    'ชำระเงิน',
    'ประวัติการชำระเงิน',
    'สร้างการ์ดผ่อนสินค้า',
    'ประวัติการผ่อนสินค้า',
    'ติดตามหนี้',
  ];

  const [borrowerData, setBorrowerData] = useState(null);
>>>>>>> efb7ef737cba61662dbcf84edbc5d6b2f1f5a3d0
  const [selectedBill, setSelectedBill] = useState('');
  const [checklist, setChecklist] = useState<number[]>([]);
  const [lateFees, setLateFees] = useState<number>(0);
  const [userInfo, setUserInfo] = useRecoilState(userState);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:4400/api/getEachBorrowers/${userInfo.userNationID}`);
        const data = await response.json();
        console.log(data)
        setBorrowerData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [nationID]);

  const handleBillSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBill(event.target.value);
  };
<<<<<<< HEAD

  const classes = useStyles();
  const router = useRouter();

  // checkbox
  const [checklist, setChecklist] = useState<number[]>([]);
  const [lateFees, setLateFees] = useState<number>(0);
=======
>>>>>>> efb7ef737cba61662dbcf84edbc5d6b2f1f5a3d0

  const handleChecklist = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setChecklist([...checklist, Number(value)]);
    } else {
      setChecklist(checklist.filter(item => item !== Number(value)));
    }
  };

<<<<<<< HEAD
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
=======
  const handleConfirm = async () => {
    const totalAmount = checklist.reduce((acc, curr) => acc + curr, 0) + lateFees;

    try {
      const response = await fetch('http://localhost:4400/api/addPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          billNumber: selectedBill,
          amount: totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      // Redirect or perform other actions if needed
      router.push('/installmentHis');
    } catch (error) {
      console.error('Error sending payment data:', error);
    }
  };

  if (!borrowerData) {
    return <div>Loading...</div>;
  }

  const data = borrowerData[0] || {}; // เพิ่มการตรวจสอบเผื่อว่าข้อมูลเป็น array ว่าง
  const { borrower, bills } = data;

  const columns: GridColDef[] = [
>>>>>>> efb7ef737cba61662dbcf84edbc5d6b2f1f5a3d0
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

<<<<<<< HEAD
=======
  const row = [
    {
      id: 1,
      bill: 'บิลหมายเลข 001',
      station: 'ค้างชำระ',
      date: '25/03/2024',
      debt: 14,
      interest: 2,
      principle: 10,
      accrued_interest: 3,
      accrued_principle: 5,
    },
    {
      id: 1,
      bill: 'บิลหมายเลข 002',
      station: 'ค้างชำระ',
      date: '25/03/2024',
      debt: 31,
      interest: 5,
      principle: 20,
      accrued_interest: 8,
      accrued_principle: 15,
    },
    {
      id: 2,
      bill: 'บิลหมายเลข 002',
      station: 'ค้างชำระ',
      date: '25/03/2024',
      debt: 31,
      interest: 5,
      principle: 20,
      accrued_interest: 8,
      accrued_principle: 15,
    },
  ];
  console.log(checklist);
  console.log(lateFees);

>>>>>>> efb7ef737cba61662dbcf84edbc5d6b2f1f5a3d0
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
<<<<<<< HEAD
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
=======
                  {borrower && (
                    <TextField
                      id="nationID"
                      name="idBorrower"
                      label="เลขบัตรประชาชน"
                      value={borrower.nationID}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      sx={{ width: '100%' }}
                    />
                  )}
                </Grid>
                <Grid item xs={6} className={classes.column}>
                  {borrower && (
                    <TextField
                      id="phone"
                      name="phoneNumberBorrower"
                      label="เบอร์โทรศัพท์"
                      value={borrower.phone}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      sx={{ width: '100%' }}
                    />
                  )}
                </Grid>
                <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid item xs={12} sm={4} className={classes.column}>
                    {borrower && (
                      <TextField
                        id="firstName"
                        name="name"
                        label="ชื่อ"
                        value={borrower.firstName}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                        sx={{ width: '100%' }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.column}>
                    {borrower && (
                      <TextField
                        id="birthDate"
                        name="birthDate"
                        label="วันเดือนปีเกิด"
                        value={borrower.birthDate}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                        sx={{ width: '100%' }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.column}>
                    {borrower && (
                      <TextField
                        id="age"
                        name="age"
                        label="อายุ"
                        value={borrower.age}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                        sx={{ width: '100%' }}
                      />
                    )}
>>>>>>> efb7ef737cba61662dbcf84edbc5d6b2f1f5a3d0
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.column}>
                  <TextField
                    id="billNumber"
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
<<<<<<< HEAD
                    {bills.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
=======
                    {Array.isArray(bills) && bills.map(bill => (
                      <MenuItem key={bill.billNumber} value={bill.billNumber}>
                        {bill.billNumber}
>>>>>>> efb7ef737cba61662dbcf84edbc5d6b2f1f5a3d0
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
<<<<<<< HEAD
        <TextField
          type="number"
          onChange={e => setLateFees(Number(e.target.value))}
          id="outlined-basic"
          variant="outlined"
          sx={{ bgcolor: '#FFFFFF' }}
        />
=======
        <TextField type="number" onChange={e => setLateFees(e.target.value)} id="outlined-basic" variant="outlined" />
>>>>>>> efb7ef737cba61662dbcf84edbc5d6b2f1f5a3d0
        <Typography variant="body1" sx={{ marginLeft: '10px' }}>
          บาท
        </Typography>
      </Grid>
      <Grid className={classes.box}>
        <Typography variant="body1" sx={{ marginRight: '10px' }}>
          รวมเป็นเงิน
        </Typography>
<<<<<<< HEAD
        <ThemeProvider theme={theme}>
          <Box className={classes.showBox}>
            <Typography variant="body1">
              {checklist.reduce((acc, curr) => acc + curr, 0) + Number(lateFees)} บาท
            </Typography>
          </Box>
=======
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
          <Box className={classes.showBox}>{checklist.reduce((acc, curr) => acc + curr, 0) + lateFees}</Box>
>>>>>>> efb7ef737cba61662dbcf84edbc5d6b2f1f5a3d0
        </ThemeProvider>
        <Button
          variant="contained"
          onClick={handleConfirm}
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
