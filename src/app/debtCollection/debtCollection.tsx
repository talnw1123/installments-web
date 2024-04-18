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
import dayjs from 'dayjs';
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

interface Column {
  id: 'billNo' | 'termNo' | 'due_Date' | 'dayAsk' | 'overDay' | 'paid' | 'askCount' | 'bill';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'billNo', label: 'หมายเลขบิล', minWidth: 70 },
  { id: 'termNo', label: 'งวดที่', minWidth: 100 },
  {
    id: 'due_Date',
    label: 'วันครบกำหนดจ่าย',
    minWidth: 100,
  },
  {
    id: 'dayAsk',
    label: 'วันที่ทวงถาม',
    minWidth: 100,
  },
  {
    id: 'overDay',
    label: 'จำนวนเกินกำหนด',
    minWidth: 100,
  },
  {
    id: 'paid',
    label: 'เงินที่ชำระ',
    minWidth: 100,
  },
  {
    id: 'askCount',
    label: 'ครั้งที่ทวง',
    minWidth: 100,
  },
];

interface Data {
  billNo: string;
  termNo: string;
  due_Date: string;
  dayAsk: number;
  overDay: number;
  paid: number;
  askCount: number;
  bill: string;
}

function createData(
  billNo: string,
  termNo: string,
  due_Date: string,
  dayAsk: number,
  overDay: number,
  paid: number,
  askCount: number,
  bill: string
): Data {
  return { billNo, termNo, due_Date, dayAsk, overDay, paid, askCount, bill };
}

const billOptions = ['บิลหมายเลข 001', 'บิลหมายเลข 002', 'บิลหมายเลข 003', 'บิลหมายเลข 004'];

const bill1Rows = [
  createData('1', '11/11/2011', '12/12/2011', 0, 0, 100, 900, 'บิลหมายเลข 001'),
  createData('2', '11/11/2011', '12/12/2011', 0, 0, 100, 900, 'บิลหมายเลข 001'),
  createData('3', '11/11/2011', '12/12/2011', 0, 0, 100, 900, 'บิลหมายเลข 001'),
];

const bill2Rows = [
  createData('1', '11/11/2012', '12/12/2011', 0, 0, 100, 900, 'บิลหมายเลข 002'),
  createData('2', '11/11/2012', '12/12/2011', 0, 0, 100, 900, 'บิลหมายเลข 002'),
  createData('3', '11/11/2012', '12/12/2011', 0, 0, 100, 900, 'บิลหมายเลข 002'),
];

const rows = [...bill1Rows, ...bill2Rows];

export default function DebtCollectionPage() {
  const [selectedBill, setSelectedBill] = React.useState<string>('');
  const handleBillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBill(event.target.value);
  };
  const classes = useStyles();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || 'ติดตามหนี้';
  const menuList = [
    'ประวัติลูกหนี้',
    'ชำระเงิน',
    'ประวัติการชำระเงิน',
    'สร้างการ์ดผ่อนสินค้า',
    'ประวัติการผ่อนสินค้า',
    'ติดตามหนี้',
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const calculateDaysOverdue = (dueDate: string, paidDate: string): string => {
    const dueDateObj = dayjs(dueDate, 'DD/MM/YYYY');
    const paidDateObj = dayjs(paidDate, 'DD/MM/YYYY');
    const daysOverdue = paidDateObj.diff(dueDateObj, 'day');
    return daysOverdue >= 0 ? `+${daysOverdue}` : `${daysOverdue}`;
  };

  const calculateAmountToPay = (interest: number, principle: number): number => {
    return interest + principle;
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
                        router.push(`/debtCollection?type=${item}`);
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
                <Grid>
                  <Typography variant="h6" sx={{ marginRight: '10px', fontWeight: 'bold', color: '#718171' }}>
                    ข้อมูลผู้กู้
                  </Typography>
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
                        label="หมายเลขสัญญา"
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
                        label="Google Map link"
                        defaultValue=" "
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
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
                        บาท
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
                            className={classes.showBox}
                            contentEditable
                            onInput={e => {
                              const target = e.target as HTMLDivElement;
                              console.log(target.innerText);
                            }}
                          ></Box>
                        </ThemeProvider>
                      </Grid>
                      <Grid className={classes.box}>
                        <Typography variant="body1" sx={{ marginRight: '10px' }}>
                          ดอกเบี้ย
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
                            className={classes.showBox}
                            contentEditable
                            onInput={e => {
                              const target = e.target as HTMLDivElement;
                              console.log(target.innerText);
                            }}
                          ></Box>
                        </ThemeProvider>
                        <Typography variant="body1" sx={{ marginLeft: '10px' }}>
                          %
                        </Typography>
                      </Grid>
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
                            className={classes.showBox}
                            contentEditable
                            onInput={e => {
                              const target = e.target as HTMLDivElement;
                              console.log(target.innerText);
                            }}
                          ></Box>
                        </ThemeProvider>
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
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
