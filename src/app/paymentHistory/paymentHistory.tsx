'use client';
import {
  Card,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Paper,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { userState } from '@store/index';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useRecoilState } from 'recoil';

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
});

export default function InstallmentHisPage() {
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
    id: 'number' | 'due_Date' | 'due_Paid' | 'overDay' | 'totalPay' | 'interest' | 'principle' | 'bill';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: 'number', label: 'งวดที่', minWidth: 70 },
    { id: 'due_Date', label: 'วันที่ครบกำหนดจ่าย', minWidth: 100 },
    {
      id: 'due_Paid',
      label: 'วันที่จ่าย',
      minWidth: 100,
    },
    {
      id: 'overDay',
      label: 'จำนวนเกินกำหนด',
      minWidth: 100,
    },
    {
      id: 'totalPay',
      label: 'เงินที่ต้องชำระ',
      minWidth: 100,
    },
    {
      id: 'interest',
      label: 'ดอกเบี้ย',
      minWidth: 100,
    },
    {
      id: 'principle',
      label: 'เงินต้น',
      minWidth: 100,
    },
  ];

  interface Data {
    number: string;
    due_Date: string;
    due_Paid: string;
    overDay: number;
    totalPay: number;
    interest: number;
    principle: number;
    bill: string;
  }



export default function PaymentHistoryPage() {
  const [selectedBill, setSelectedBill] = React.useState<string>('');
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [billOptions, setBillOptions] = React.useState<string[]>([]);
  const [rows, setRows] = React.useState<Data[]>([]);

  const classes = useStyles();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || 'ประวัติการชำระเงิน';
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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4400/api/getEachBorrowers/${userInfo.userNationID}`);
        const data = response.data;
        const options = data.flatMap((borrower: any) =>
          borrower.bills.map((bill: any) => `หมายเลข ${bill.billNumber}`)
        );
        setBillOptions(options);

        const allRows = data.flatMap((borrower: any) =>
          borrower.bills.flatMap((bill: any) =>
            bill.paymentHistory.map((payment: any, index: number) => createData(
              (index + 1).toString(),
              dayjs(bill.createdAt).format('DD/MM/YYYY'),
              dayjs(payment.paymentDate).format('DD/MM/YYYY'),
              dayjs(payment.paymentDate).diff(dayjs(bill.createdAt), 'day'),
              bill.totalLoan * (1 + bill.interestRates / 100),
              bill.interestRates,
              bill.totalLoan,
              `หมายเลข ${bill.billNumber}`
            ))
          )
        );
        setRows(allRows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userInfo.userNationID]);

  const handleBillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBill(event.target.value);
  };

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

  const calculateAmountToPay = (interest: string, principle: string): number => {
    const interestRate = parseFloat(interest);
    const principleAmount = parseFloat(principle);
    return principleAmount * (1 + interestRate / 100);
  };
  function createData(
    number: string,
    due_Date: string,
    due_Paid: string,
    overDay: number,
    totalLoan: string, // เปลี่ยนจาก totalPay เป็น totalLoan
    interest: string, // เปลี่ยนให้เป็น string
    principle: string, // เปลี่ยนให้เป็น string
    bill: string
  ): Data {
    const totalPay = calculateAmountToPay(interest, principle); // คำนวณ totalPay ใหม่
    return { number, due_Date, due_Paid, overDay, totalPay, interest, principle, bill };
  }
  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '80%' }}>
        <Grid container className={classes.topContainer}>
          <Typography variant="h4" sx={{ marginLeft: '12.5px' }}>
            ประวัติการชำระเงิน
          </Typography>
        </Grid>
        <Grid container className={classes.formContainer}>
          <Grid className={classes.formBigContainer}>
            <Grid>
              <MenuList />
            </Grid>
            <Grid className={classes.formBigColumn}>
              <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item xs={12} className={classes.column}>
                  <TextField
                    label="เลือกบิลที่ต้องการดู"
                    variant="standard"
                    select
                    fullWidth
                    margin="normal"
                    className={classes.formField}
                    sx={{ width: '30%' }}
                    value={selectedBill}
                    onChange={handleBillChange}
                  >
                    {billOptions.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} className={classes.column}>
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <Typography variant="h6" sx={{ marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>
                      ประวัติการชำระหนี้
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
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.number}>
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
      </Card>
    </Grid>
  );
}
