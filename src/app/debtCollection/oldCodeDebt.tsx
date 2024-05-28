'use client';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MenuList from 'app/customerInformation/page';
import dayjs from 'dayjs';
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  formSection: {
    marginBottom: '1.5rem',
  },
  formBigColumn: {
    borderLeft: '2px solid lightgray',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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

export default function DebtCollectionPage() {
  const classes = useStyles();
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const searchType = searchParams.get('type') || 'ประวัติการผ่อนสินค้า';
  // const menuList = [
  //   'ประวัติลูกหนี้',
  //   'ชำระเงิน',
  //   'ประวัติการชำระเงิน',
  //   'สร้างการ์ดผ่อนสินค้า',
  //   'ประวัติการผ่อนสินค้า',
  //   'ติดตามหนี้',
  // ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [selectedBill, setSelectedBill] = React.useState<string>('');
  const handleBillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBill(event.target.value);
  };

  interface Column {
    id:
      | 'billNumber'
      | 'installmentsNumber'
      | 'due_Paid'
      | 'demand_date'
      | 'overDay'
      | 'totalPay'
      | 'numberOfDebt'
      | 'paymentDate'
      | 'noteDebt';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: 'billNumber', label: 'หมายเลขบิล', minWidth: 70 },
    { id: 'installmentsNumber', label: 'งวดที่', minWidth: 100 },
    {
      id: 'due_Paid',
      label: 'วันที่ครบกำหนดจ่าย',
      minWidth: 100,
    },
    {
      id: 'demand_date',
      label: 'วันที่ทวงถาม',
      minWidth: 100,
    },
    {
      id: 'overDay',
      label: 'จำนวนเกินกำหนด',
      minWidth: 100,
    },
    {
      id: 'totalPay',
      label: 'จำนวนเกินกำหนด',
      minWidth: 100,
    },
    {
      id: 'numberOfDebt',
      label: 'ครั้งที่ทวง',
      minWidth: 100,
    },
    {
      id: 'paymentDate',
      label: 'วันที่นัดชำระ',
      minWidth: 100,
    },
    {
      id: 'noteDebt',
      label: 'บันทึกการทวง',
      minWidth: 100,
    },
  ];

  interface Data {
    billNumber: number;
    installmentsNumber: number;
    due_Paid: string;
    demand_date: string;
    overDay: number;
    totalPay: number;
    numberOfDebt: number;
    paymentDate: string;
    noteDebt: string;
  }

  function createData(
    billNumber: number,
    installmentsNumber: number,
    due_Paid: string,
    demand_date: string,
    overDay: number,
    totalPay: number,
    numberOfDebt: number,
    paymentDate: string,
    noteDebt: string
  ): Data {
    return {
      billNumber,
      installmentsNumber,
      due_Paid,
      demand_date,
      overDay,
      totalPay,
      numberOfDebt,
      paymentDate,
      noteDebt,
    };
  }

  const calculateDaysOverdue = (dueDate: string, paidDate: string): string => {
    const dueDateObj = dayjs(dueDate, 'DD/MM/YYYY');
    const paidDateObj = dayjs(paidDate, 'DD/MM/YYYY');
    const daysOverdue = paidDateObj.diff(dueDateObj, 'day');
    return daysOverdue >= 0 ? `+${daysOverdue}` : `${daysOverdue}`;
  };

  const numberOptions = Array.from({ length: 100 }, (_, index) => ({
    label: `${index + 1}`,
    value: index + 1,
  }));
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
      <Card sx={{ padding: 3, width: '80%' }}>
        <Grid container className={classes.topContainer}>
          <Typography variant="h4" sx={{ marginLeft: '12.5px' }}>
            ติดตามหนี้สิน
          </Typography>
        </Grid>
        <Grid container className={classes.formContainer}>
          <Grid className={classes.formBigContainer}>
            <Grid>
              <MenuList />
            </Grid>
            {/* data */}
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
                    name="contractNumber"
                    label="หมายเลขสัญญา"
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
                    sx={{ width: '60%' }}
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
                      name="lastNameBorrower"
                      label="นามสกุล"
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
                      name="mapLinkDefaultBorrower"
                      label="Google Map link"
                      defaultValue=" "
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.column} container direction="row">
                    <Grid className={classes.box}>
                      <Typography variant="body1" sx={{ marginRight: '10px' }}>
                        รวมยอดเงินกู้
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
                        <Box className={classes.showBox}>hello</Box>
                      </ThemeProvider>
                      <Typography variant="body1" sx={{ marginLeft: '10px' }}>
                        บาท
                      </Typography>
                    </Grid>
                    <Grid className={classes.box}>
                      <Typography variant="body1" sx={{ marginRight: '10px' }}>
                        เงินดาวน์
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
                        <Box className={classes.showBox}>hello</Box>
                      </ThemeProvider>
                      <Typography variant="body1" sx={{ marginLeft: '10px' }}>
                        บาท
                      </Typography>
                    </Grid>
                    <Grid className={classes.box}>
                      <Typography variant="body1" sx={{ marginRight: '10px' }}>
                        จำนวน
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
                        <Box className={classes.showBox}>hello</Box>
                      </ThemeProvider>
                      <Typography variant="body1" sx={{ marginLeft: '10px' }}>
                        งวด
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Typography
                      variant="h6"
                      sx={{ marginRight: '10px', fontWeight: 'bold', marginTop: '10px', color: '#718171' }}
                    >
                      บันทึกการทวงหนี้
                    </Typography>
                    <Grid container direction="row">
                      <Grid className={classes.box}>
                        <Typography variant="body1" sx={{ marginRight: '10px' }}>
                          หมายเลขบิล
                        </Typography>
                        <Autocomplete
                          id="number-autocomplete"
                          options={numberOptions}
                          getOptionLabel={option => option.label}
                          getOptionSelected={(option, value) => option.value === value.value}
                          onChange={(event, value) => console.log(value)} // test in console
                          renderInput={params => <TextField {...params} label="" />}
                        />
                      </Grid>
                      <Grid className={classes.box}>
                        <Typography variant="body1" sx={{ marginRight: '10px' }}>
                          งวดที่
                        </Typography>
                        <TextField
                          type="number"
                          // onChange={e => setLateFees(e.target.value)}
                          id="outlined-basic"
                          variant="outlined"
                          sx={{ bgcolor: '#FFFFFF' }}
                        />
                      </Grid>
                      <Grid className={classes.box}>
                        <Typography variant="body1" sx={{ marginRight: '10px' }}>
                          ดอกเบี้ย
                        </Typography>
                          <TextField
                            type="number"
                            onChange={e => setLateFees(e.target.value)}
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ bgcolor: '#FFFFFF' }}
                          />
                        <Typography variant="body1" sx={{ marginLeft: '10px' }}>
                          %
                        </Typography>
                      </Grid>
                      <Grid className={classes.box}>
                        <Typography variant="body1" sx={{ marginRight: '10px' }}>
                          ค่าปรับ
                        </Typography>
                        <TextField
                          type="number"
                          onChange={e => setLateFees(e.target.value)}
                          id="outlined-basic"
                          variant="outlined"
                          sx={{ bgcolor: '#FFFFFF' }}
                        />
                        <Typography variant="body1" sx={{ marginLeft: '10px' }}>
                          บาท
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="วันที่นัดชำระ"
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
                    </Grid>
                    <Button
                      variant="contained"
                      onClick={() => console.log('บันทึกการทวงหนี้')}
                      sx={{
                        backgroundColor: '#718171',
                        borderRadius: '1px',
                        marginLeft: '10px',
                        padding: '10px 20px',
                      }}
                    >
                      บันทึกการทวงหนี้
                    </Button>
                  </Grid>

                  <Grid item xs={12} className={classes.column}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                      <Typography variant="h6" sx={{ marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>
                        ประวัติการทวงถามหนี้
                      </Typography>
                      <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns.map(column => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth, textAlign: 'center' }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows
                              .filter(row => row.bill === selectedBill)
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map(row => {
                                const daysOverdue = calculateDaysOverdue(row.due_Date, row.due_Paid);
                                return (
                                  <TableRow hover role="checkbox" tabIndex={-1} key={row.billNo}>
                                    {columns.map(column => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell key={column.id} align={column.align} style={{ textAlign: 'center' }}>
                                          {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : column.id === 'overDay'
                                              ? calculateDaysOverdue(row.due_Date, row.due_Paid)
                                              : column.id === 'totalPay'
                                                ? calculateAmountToPay(row.interest, row.principle)
                                                : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                );
                              })}
                            {rows.filter(row => row.bill === selectedBill).length === 0 && (
                              <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                  No row
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
