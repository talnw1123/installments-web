'use client';
import {
  Autocomplete,
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
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MenuList from 'app/customerInformation/page';
import dayjs, { Dayjs } from 'dayjs';
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
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1rem',
    gap: '1rem',
  },
  formControl: {
    flex: '1',
  },
});

interface Data {
  billNumber: string;
  installmentsNumber: number;
  duePaid: string;
  demandDate: string;
  overDay: string;
  lateFee: number;
  totalPay: number;
  numberOfDebt: number;
  paymentDate: string;
}

const initialRows: Data[] = [];

export default function DebtCollectionPage() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [debtCollection, setDebtCollection] = useState<Data[]>(initialRows);
  const [selectedBill, setSelectedBill] = useState<string>('');
  const [installmentsNumber, setInstallmentsNumber] = useState<number>(0);
  const [amountDue, setAmountDue] = useState<number>(0); //เงินที่ต้องชำระ
  const [lateFees, setLateFees] = useState<number>(0); //ค่าปรับ
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const numberOptions = Array.from({ length: 100 }, (_, index) => ({
    label: `${index + 1}`,
    value: index + 1,
  }));

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const calculateDaysOverdue = (dueDate: string, demandDate: string): string => {
    const dueDateObj = dayjs(dueDate, 'DD/MM/YYYY');
    const demandDateObj = dayjs(demandDate, 'DD/MM/YYYY');
    const daysOverdue = demandDateObj.diff(dueDateObj, 'day');
    return daysOverdue >= 0 ? `+${daysOverdue}` : `${daysOverdue}`;
  };

  const calculateLateFee = (daysOverdue: number): number => {
    return daysOverdue > 0 ? daysOverdue * 50 : 0;
  };

  //create table
  const handleCreateDebtCollection = () => {
    if (selectedBill && selectedDate) {
      const demandDate = dayjs().format('DD/MM/YYYY'); //วันทวง ใช้วันที่ปัจจุบัน
      const duePaid = selectedDate.format('DD/MM/YYYY'); //วันครบกำหนดจ่าย เปลี่ยนเป็นดึงมาจากหลังบ้าน
      const overDay = calculateDaysOverdue(duePaid, demandDate);
      const lateFee = calculateLateFee(overDay);

      const newDebtCollection: Data = {
        billNumber: selectedBill,
        installmentsNumber,
        duePaid,
        demandDate, //current day
        overDay,
        lateFee,
        totalPay: amountDue + lateFees, //ค่าปรับ + เงินที่ต้องชำระ
        numberOfDebt: debtCollection.filter(row => row.billNumber === selectedBill).length + 1, //เพิ่มครั้งที่ทวงทุกครั้งที่ บิล และ งวด ซ้ำกัน
        paymentDate: duePaid,
      };

      setDebtCollection(prevRows => [...prevRows, newDebtCollection]);
    }
  };

  const columns: readonly (keyof Data)[] = [
    'billNumber',
    'installmentsNumber',
    'duePaid',
    'demandDate',
    'overDay',
    'lateFee',
    'totalPay',
    'numberOfDebt',
    'paymentDate',
  ];

  const columnLabels: { [key in keyof Data]: string } = {
    billNumber: 'หมายเลขบิล',
    installmentsNumber: 'งวดที่',
    duePaid: 'วันที่ครบกำหนดจ่าย',
    demandDate: 'วันที่ทวงถาม',
    overDay: 'จำนวนเกินกำหนด',
    lateFee: 'ค่าปรับ',
    totalPay: 'เงินที่ต้องชำระ',
    numberOfDebt: 'ครั้งที่ทวง',
    paymentDate: 'วันที่นัดชำระ',
  };

  const [fineAmount, setFineAmount] = useState('50 บาท/วัน'); //use for default value lateFee

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
            <Grid className={classes.formBigColumn}>
              <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid item xs={12} sm={4} className={classes.column}>
                    <TextField
                      id="standard-read-only-input"
                      name="nationID"
                      label="เลขประจำตัวประชาชน"
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
                  <Grid item xs={12} sm={4} className={classes.column}>
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
                </Grid>
                <Grid item xs={12} className={classes.column} container direction="row">
                  <Grid className={classes.box}>
                    <TextField
                      label="รวมยอดเงินกู้"
                      type="number"
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="body1" sx={{ marginTop: '35px' }}>
                      บาท
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.column}>
                  <Typography
                    variant="h6"
                    sx={{ marginRight: '10px', fontWeight: 'bold', marginTop: '10px', color: '#718171' }}
                  >
                    บันทึกการทวงหนี้
                  </Typography>
                  <Grid container className={classes.formRow}>
                    <Grid item className={classes.formControl}>
                      <Autocomplete
                        disablePortal
                        id="disable-close-on-select"
                        disableCloseOnSelect
                        options={numberOptions}
                        sx={{ width: '100%' }}
                        value={numberOptions.find(option => option.value === Number(selectedBill)) || null}
                        onChange={(event, newValue) => setSelectedBill(newValue ? newValue.label : '')}
                        renderInput={params => <TextField {...params} label="หมายเลขบิล" variant="standard" />}
                      />
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <Autocomplete
                        disablePortal
                        id="disable-close-on-select"
                        disableCloseOnSelect
                        options={numberOptions}
                        sx={{ width: '100%' }}
                        value={numberOptions.find(option => option.value === installmentsNumber) || null}
                        onChange={(event, newValue) => setInstallmentsNumber(newValue ? newValue.value : 0)}
                        renderInput={params => <TextField {...params} label="งวดที่" variant="standard" />}
                      />
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <Grid item xs={12} className={classes.column} container direction="row">
                        <Grid className={classes.box} sx={{ flexGrow: 1 }}>
                          <TextField
                            id="standard-read-only-input"
                            label="ค่าปรับ"
                            value={fineAmount}
                            variant="standard"
                            InputProps={{
                              readOnly: true,
                            }}
                            sx={{ width: '100%' }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <Typography variant="body1" sx={{ marginRight: '10px' }}>
                        วันที่นัดชำระ
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={selectedDate}
                          onChange={newValue => setSelectedDate(newValue)}
                          renderInput={params => <TextField {...params} sx={{ width: '100%' }} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.column}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCreateDebtCollection}
                      sx={{
                        borderRadius: '1 px',
                        marginLeft: '400px',
                        padding: '10px 20px',
                      }}
                    >
                      บันทึก
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.column}>
                  <Paper sx={{ width: '100%', marginTop: '2rem' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            {columns.map(column => (
                              <TableCell key={column}>{columnLabels[column]}</TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {debtCollection
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                {columns.map(column => (
                                  <TableCell key={column}>{row[column]}</TableCell>
                                ))}
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={debtCollection.length}
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
      </Card>
    </Grid>
  );
}
