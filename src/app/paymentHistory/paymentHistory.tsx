'use client';
import {
  Card,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

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
});

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

function createData(
  number: string,
  due_Date: string,
  due_Paid: string,
  overDay: number,
  totalPay: number,
  interest: number,
  principle: number,
  bill: string
): Data {
  return { number, due_Date, due_Paid, overDay, totalPay, interest, principle, bill };
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

export default function PaymentHistoryPage() {
  const [selectedBill, setSelectedBill] = React.useState<string>('');
  const handleBillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBill(event.target.value);
  };
  const classes = useStyles();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || 'ประวัติการชำระเงิน';
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
                        router.push(`/paymentHistory?type=${item}`);
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
                <Grid>
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
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
