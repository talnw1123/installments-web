'use client';
import { Button, Card, Grid, MenuItem, TextField, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { GridColDef } from '@mui/x-data-grid';
import MenuList from 'app/customerInformation/page';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';

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
  const [selectedBill, setSelectedBill] = useState('');
  const handleBillSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBill(event.target.value);
  };
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const bill = ['บิลหมายเลข 001', 'บิลหมายเลข 002', 'บิลหมายเลข 003', 'บิลหมายเลข 004'];

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

  const columns: GridColDef<(typeof row)[number]>[] = [
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
                  <TextField
                    id="standard-read-only-input"
                    name="idBorrower"
                    label="เลขบัตรประชาชน"
                    defaultValue=" "
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6} className={classes.column}>
                  <TextField
                    id="standard-read-only-input"
                    name="phoneNumberBorrower"
                    label="เบอร์โทรศัพท์"
                    defaultValue=" "
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid item xs={12} sm={4} className={classes.column}>
                    <TextField
                      id="standard-read-only-input"
                      name="name"
                      label="ชื่อ"
                      defaultValue=" "
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.column}>
                    <TextField
                      id="standard-read-only-input"
                      name="birthDate"
                      label="วันเดือนปีเกิด"
                      defaultValue=" "
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.column}>
                    <TextField
                      id="standard-read-only-input"
                      name="age"
                      label="อายุ"
                      defaultValue=" "
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      sx={{ width: '100%' }}
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
                    value={selectedBill}
                    onChange={handleBillSelect}
                  >
                    {bill.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
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
        <TextField type="number" onChange={e => setLateFees(e.target.value)} id="outlined-basic" variant="outlined" />
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
          <Box className={classes.showBox}>{checklist.reduce((acc, curr) => acc + curr, 0) + Number(lateFees)}</Box>
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
