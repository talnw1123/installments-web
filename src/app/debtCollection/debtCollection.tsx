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
  totalPay: number;
  numberOfDebt: number;
  paymentDate: string;
  noteDebt: string;
}

const initialRows: Data[] = [];

export default function DebtCollectionPage() {
  const classes = useStyles();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || 'ติดตามหนี้';
  const menuList = [
    'ประวัติผู้กู้',
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

  const calculateDaysOverdue = (dueDate: string, demandDate: string): string => {
    const dueDateObj = dayjs(dueDate, 'DD/MM/YYYY');
    const demandDateObj = dayjs(demandDate, 'DD/MM/YYYY');
    const daysOverdue = demandDateObj.diff(dueDateObj, 'day');
    return daysOverdue >= 0 ? `+${daysOverdue}` : `${daysOverdue}`;
  };

  const handleSave = () => {
    if (selectedBill && selectedDate) {
      const demandDate = dayjs().format('DD/MM/YYYY');
      const duePaid = selectedDate.format('DD/MM/YYYY');
      const overDay = calculateDaysOverdue(duePaid, demandDate);

      const newRow: Data = {
        billNumber: selectedBill,
        installmentsNumber,
        duePaid,
        demandDate,
        overDay,
        totalPay: interest + lateFees,
        numberOfDebt: rows.filter(row => row.billNumber === selectedBill).length + 1,
        paymentDate: duePaid,
        noteDebt: 'N/A',
      };

      setRows(prevRows => [...prevRows, newRow]);
    }
  };

  const columns: readonly (keyof Data)[] = [
    'billNumber',
    'installmentsNumber',
    'duePaid',
    'demandDate',
    'overDay',
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
    totalPay: 'จำนวนเกินกำหนด',
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
                      id="standard-read-only-input"
                      name="name"
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
                      name="lastNameBorrower"
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
                      name="mapLinkDefaultBorrower"
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
                  <Grid className={classes.box}>
                    <TextField
                      label="เงินดาวน์"
                      type="number"
                      variant="standard"
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
                        disablePortal
                        id="combo-box-demo"
                        options={numberOptions}
                        sx={{ width: '100%' }}
                        value={numberOptions.find(option => option.value === Number(selectedBill)) || null}
                        onChange={(event, newValue) => setSelectedBill(newValue ? newValue.label : '')}
                        renderInput={params => <TextField {...params} />}
                      />
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <Typography variant="body1" sx={{ marginRight: '10px' }}>
                        งวดที่
                      </Typography>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={numberOptions}
                        sx={{ width: '100%' }}
                        value={numberOptions.find(option => option.value === installmentsNumber) || null}
                        onChange={(event, newValue) => setInstallmentsNumber(newValue ? newValue.value : 0)}
                        renderInput={params => <TextField {...params} />}
                      />
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <Typography variant="body1" sx={{ marginRight: '10px' }}>
                        ดอกเบี้ย
                      </Typography>
                      <TextField
                        type="number"
                        id="outlined-basic"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        value={interest}
                        onChange={e => setInterest(Number(e.target.value))}
                      />
                    </Grid>
                    <Grid item className={classes.formControl}>
                      <Typography variant="body1" sx={{ marginRight: '10px' }}>
                        ค่าปรับล่าช้า
                      </Typography>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        value={lateFees}
                        onChange={e => setLateFees(Number(e.target.value))}
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
