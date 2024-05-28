'use client';

import { Box, Button, Card, Grid, MenuItem, TextField, ThemeProvider, createTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import MenuList from 'app/customerInformation/page';
import { useRouter } from 'next/navigation';
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
  const [selectedBill, setSelectedBill] = useState('');
  const handleBillSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBill(event.target.value);
  };
  const classes = useStyles();
  const router = useRouter();

  const bill = ['บิลหมายเลข 001', 'บิลหมายเลข 002', 'บิลหมายเลข 003', 'บิลหมายเลข 004'];

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

  // columns
  const columns: GridColDef[] = [
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
      headerName: 'วันครบกำหนดชำระ',
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

  // rows
  const row = [
    {
      id: 1,
      numberOfInstallment: 1,
      bill: 'บิลหมายเลข 001',
      status: 'ค้างชำระ',
      dueDate: '25/03/2024',
      amountDue: 14,
      interest: 2,
      principle: 10,
    },
    {
      id: 2,
      numberOfInstallment: 1,
      bill: 'บิลหมายเลข 002',
      status: 'ค้างชำระ',
      dueDate: '25/03/2024',
      amountDue: 31,
      interest: 5,
      principle: 20,
    },
    {
      id: 3,
      numberOfInstallment: 2,
      bill: 'บิลหมายเลข 002',
      status: 'ค้างชำระ',
      dueDate: '25/03/2024',
      amountDue: 31,
      interest: 5,
      principle: 20,
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
                  <TextField
                    id="standard-read-only-input"
                    name="nationID"
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
                    name="phone"
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
                  <Grid item xs={12} sm={3} className={classes.column}>
                    <TextField
                      id="standard-read-only-input"
                      name="firstName"
                      label="ชื่อ"
                      defaultValue=" "
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} className={classes.column}>
                    <TextField
                      id="standard-read-only-input"
                      name="lastName"
                      label="นามสกุล"
                      defaultValue=" "
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} className={classes.column}>
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
                  <Grid item xs={12} sm={3} className={classes.column}>
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
                    {bill.map(option => (
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
                      columns={columns}
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
