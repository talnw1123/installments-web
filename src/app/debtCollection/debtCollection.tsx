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
import { useRecoilState, userState } from '@store/index';
import MenuList from 'app/customerInformation/page';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  dueDate: string;
  demandDate: string;
  overDay: string;
  totalPay: number;
  numberOfDebt: number;
  paymentDate: string;
}

const initialRows: Data[] = [];

export default function DebtCollectionPage() {
  const classes = useStyles();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || 'ติดตามหนี้';
  const [borrowerData, setBorrowerData] = useState(null);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [selectedBill, setSelectedBill] = useState(null);
  const [installmentsNumber, setInstallmentsNumber] = useState(null);
  const [interest, setInterest] = useState(null);
  const [lateFees, setLateFees] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [rows, setRows] = useState<Data[]>(initialRows);
  const [installments, setInstallments] = useState([]);

  const [totalPaymentWithInterest, setTotalPaymentWithInterest] = useState(null);
  const [downPayment, setDownPayment] = useState(null);
  const [numberOfInstallments, setNumberOfInstallments] = useState(null);
  const menuList = [
    'ประวัติผู้กู้',
    'ชำระเงิน',
    'ประวัติการชำระเงิน',
    'สร้างการ์ดผ่อนสินค้า',
    'ประวัติการผ่อนสินค้า',
    'ติดตามหนี้',
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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


  useEffect(() => {
    async function fetchBorrowerData() {
      try {
        const response = await fetch(`http://localhost:4400/api/getEachBorrowers/${userInfo.userNationID}`);
        const data = await response.json();
        setBorrowerData(data);

        // Filter installments for the selected bill
        const selectedBillData = data.bills.find(bill => bill.billNumber === selectedBill);
        if (selectedBillData) {
          setInstallmentsNumber(selectedBillData.numberOfInstallments);
          setInterest(selectedBillData.interestRates);
          setTotalPaymentWithInterest(selectedBillData.totalPaymentWithInterest);
          setDownPayment(selectedBillData.downPayment);
          setNumberOfInstallments(selectedBillData.numberOfInstallments);
        } else {
          setInstallments([]);
        }
      } catch (error) {
        console.error('Error fetching borrower data:', error);
      }
    }

    fetchBorrowerData();
  }, [selectedBill, userInfo.userNationID]);

  useEffect(() => {
    if (selectedBill && borrowerData) {
      const selectedBillData = borrowerData.bills.find(bill => bill.billNumber === selectedBill);
      if (selectedBillData) {
        setInstallmentsNumber(selectedBillData.numberOfInstallments);
        setInterest(selectedBillData.interestRates);
        setTotalPaymentWithInterest(selectedBillData.totalPaymentWithInterest);
        setDownPayment(selectedBillData.downPayment);
        setNumberOfInstallments(selectedBillData.numberOfInstallments);
      }
    }
  }, [selectedBill, borrowerData]);

  const handleSave = () => {
    if (selectedBill && selectedDate) {
      const demandDate = dayjs().format('DD/MM/YYYY');
      const dueDate = selectedDate.format('DD/MM/YYYY');
      const overDay = calculateDaysOverdue(dueDate, demandDate);

      const newRow: Data = {
        billNumber: selectedBill,
        installmentsNumber,
        dueDate,
        demandDate,
        overDay,
        totalPay: interest + lateFees,
        numberOfDebt: rows.filter(row => row.billNumber === selectedBill).length + 1,
        paymentDate: dueDate,
      };

      setRows(prevRows => [...prevRows, newRow]);
    }
  };

  if (!borrowerData) {
    return <div>Loading...</div>;
  }

  const data = borrowerData[0] || {};
  const { borrower, bills } = data;


  const columns: readonly (keyof Data)[] = [
    'billNumber',
    'installmentsNumber',
    'dueDate',
    'demandDate',
    'overDay',
    'damames',
    'totalPay',
    'numberOfDebt',
    'paymentDate',
  ];

  const columnLabels: { [key in keyof Data]: string } = {
    billNumber: 'หมายเลขบิล',
    installmentsNumber: 'งวดที่',
    dueDate: 'วันที่ครบกำหนดขำระ',
    demandDate: 'วันที่ทวงถาม',
    overDay: 'จำนวนเกินกำหนด',
    damames: 'ค่าปรับ',
    totalPay: 'จำนวนเงินที่ต้องจ่ายทั้งหมด',
    numberOfDebt: 'ครั้งที่ทวง',
    paymentDate: 'วันที่นัดชำระ',
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
            <Grid className={classes.formBigColumn}>
              <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid item xs={12} sm={4} className={classes.column}>
                    <TextField
                      id="nationID"
                      name="name"
                      label="เลขประจำตัวประชาชน"
                      defaultValue={""}
                      value={borrower.nationID}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      sx={{ width: '100%' }}
                    />
                    <TextField
                      id="lastName"
                      name="lastNameBorrower"
                      label="หมายเลขสัญญา"
                      defaultValue={borrowerData ? borrowerData.billNumber : ''}
                      value={bills.billNumber}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.column}>
                    <TextField
                      id="phone"
                      name="mapLinkDefaultBorrower"
                      label="เบอร์โทรศัพท์"
                      defaultValue=" "
                      value={borrower.phone}

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
                      id="firstName"
                      name="name"
                      label="ชื่อ"
                      defaultValue=" "
                      value={borrower.firstName}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.column}>
                    <TextField
                      id="lastName"
                      name="lastNameBorrower"
                      label="นามสกุล"
                      defaultValue=" "
                      value={borrower.lastName}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.column}>
                    <TextField
                      id="googleMapAdressCurrent"
                      name="mapLinkDefaultBorrower"
                      label="Google Map link"
                      defaultValue=" "
                      value={borrower.googleMapAdressCurrent}
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
                      id="totalPaymentWithInterest"
                      label="รวมยอดเงินกู้"
                      type="number"
                      variant="standard"
                      value={totalPaymentWithInterest || ''}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid className={classes.box}>
                    <TextField
                      id="downPayment"
                      label="เงินดาวน์"
                      type="number"
                      variant="standard"
                      value={downPayment || ''}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid className={classes.box}>
                    <TextField
                      label="จำนวนงวด"
                      type="number"
                      variant="standard"
                      value={numberOfInstallments || ''}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{ marginRight: '10px', fontWeight: 'bold', marginTop: '10px', color: '#718171' }}
                  >
                    บันทึกการทวงหนี้
                  </Typography>
                  <Grid container className={classes.formRow}>
                    <Grid item className={classes.formControl}>
                      <Typography variant="body1" sx={{ marginRight: '10px' }}>
                        หมายเลขบิล
                      </Typography>
                      <Autocomplete
                        id="billNumber"
                        options={bills.map(bill => bill.billNumber)}
                        value={selectedBill}
                        onChange={(event, newValue) => {
                          setSelectedBill(newValue);
                          const selectedBillData = bills.find(bill => bill.billNumber === newValue);
                          setInstallmentsNumber(null); // Reset installments number when a new bill is selected
                          setInterest(selectedBillData?.interestRates || null);
                        }}
                        renderInput={(params) => <TextField {...params} label="หมายเลขบิล" />}
                        sx={{ width: '100%' }}
                      />
                    </Grid>

                    <Grid item className={classes.formControl}>
                      <Typography variant="body1" sx={{ marginRight: '10px' }}>
                        งวดที่
                      </Typography>
                      <Autocomplete
                        id="installmentsNumber"
                        options={selectedBill ? Array.from({ length: bills.find(bill => bill.billNumber === selectedBill).numberOfInstallments }, (_, i) => i + 1) : []}
                        value={installmentsNumber}
                        onChange={(event, newValue) => setInstallmentsNumber(newValue)}
                        renderInput={(params) => <TextField {...params} label="งวดที่" />}
                        sx={{ width: '100%' }}
                      />
                    </Grid>

                    <Grid item className={classes.formControl}>
                      <Typography variant="body1" sx={{ marginRight: '10px' }}>
                        ดอกเบี้ย
                      </Typography>
                      <TextField
                        id="interestRates"
                        name="interestRates"
                        label="ดอกเบี้ย"
                        defaultValue={interest || ''}
                        value={interest || ''}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <Typography variant="body1" sx={{ marginRight: '10px' }}>
                        ค่าปรับล่าช้า
                      </Typography>
                      <TextField
                        id="lateFees"
                        name="lateFees"
                        label="ค่าปรับล่าช้า"
                        defaultValue={lateFees}
                        value={lateFees}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                        sx={{ width: '100%' }}
                      />
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
                      onClick={handleSave}
                      disabled={!selectedBill || !installmentsNumber || !interest || !lateFees || !selectedDate}
                      sx={{
                        backgroundColor: '#718171',
                        borderRadius: '1 px',
                        marginLeft: '10px',
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
                          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
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
      </Card>
    </Grid>
  );
}
