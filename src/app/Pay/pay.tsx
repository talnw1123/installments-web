'use client';
import { Button, Card, Grid, MenuItem, TextField, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { GridColDef } from '@mui/x-data-grid';
import { useRecoilState, userState } from '@store/index';
import MenuList from 'app/customerInformation/page';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';

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
  },
});

export default function PayPage() {
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

  const handleChecklist = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setChecklist([...checklist, Number(value)]);
    } else {
      setChecklist(checklist.filter(item => item !== Number(value)));
    }
  };

  if (!borrowerData) {
    return <div>Loading...</div>;
  }

  const data = borrowerData[0] || {}; // เพิ่มการตรวจสอบเผื่อว่าข้อมูลเป็น array ว่าง
  const { borrower, bills } = data;
  console.log(borrower, bills);
  
  const columns: GridColDef[] = [
    {
      field: 'checkbox',
      headerName: '',
      width: 100,
      renderCell: params => {
        return <input type="checkbox" onChange={handleChecklist} value={Number(params.row.debt)} />;
      },
    },
    {
      field: 'id',
      headerName: 'งวดที่',
      width: 100,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'date',
      headerName: 'วันที่',
      width: 100,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'station',
      headerName: 'สถานะ',
      width: 100,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'debt',
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
    {
      field: 'accrued_interest',
      headerName: 'ดอกเบี้ยสะสม',
      type: 'number',
      width: 110,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'accrued_principle',
      headerName: 'เงินต้นสะสม',
      type: 'number',
      width: 100,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
    },
  ];

  const rows = Array.isArray(bills) ? bills.map((bill, index) => ({
    id: index + 1,
    bill: bill.billNumber,
    station: bill.station,
    date: bill.date,
    debt: bill.debt,
    interest: bill.interest,
    principle: bill.principle,
    accrued_interest: bill.accrued_interest,
    accrued_principle: bill.accrued_principle,
  })) : [];

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
                  </Grid>
                </Grid>
                <Grid>
                  <TextField
                    id="billNumber"
                    label="เลือกบิลที่ต้องการจ่าย"
                    variant="standard"
                    select
                    fullWidth
                    margin="normal"
                    className={classes.formField}
                    sx={{ width: '30%' }}
                    value={selectedBill}
                    onChange={handleBillSelect}
                  >
                    {Array.isArray(bills) && bills.map(bill => (
                      <MenuItem key={bill.billNumber} value={bill.billNumber}>
                        {bill.billNumber}
                      </MenuItem>
                    ))}
                  </TextField>
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
        <TextField type="number" onChange={e => setLateFees(Number(e.target.value))} id="outlined-basic" variant="outlined" />
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
          <Box className={classes.showBox}>{checklist.reduce((acc, curr) => acc + curr, 0) + lateFees}</Box>
        </ThemeProvider>
        <Typography variant="body1" sx={{ marginLeft: '10px' }}>
          บาท
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push('/installmentHis')}
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
