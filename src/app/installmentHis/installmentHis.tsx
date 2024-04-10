'use client';
import {
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
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
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
  id: 'billNo' | 'status' | 'principle' | 'payment_term' | 'payment' | 'interest' | 'date' | 'paid' | 'balance';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'billNo', label: 'หมายเลขบิล', minWidth: 70 },
  { id: 'status', label: 'สถานะการผ่อน', minWidth: 100 },
  {
    id: 'principle',
    label: 'ราคาเต็ม',
    minWidth: 100,
  },
  {
    id: 'payment_term',
    label: 'ผ่อนทั้งหมด',
    minWidth: 100,
  },
  {
    id: 'payment',
    label: 'ยอดผ่อนต่องวด',
    minWidth: 100,
  },
  {
    id: 'interest',
    label: 'ดอกเบี้ยทั้งหมด',
    minWidth: 100,
  },
  {
    id: 'date',
    label: 'วันที่เริ่มผ่อน',
    minWidth: 100,
  },
  {
    id: 'paid',
    label: 'ชำระแล้ว',
    minWidth: 100,
  },
  {
    id: 'balance',
    label: 'ยอดคงเหลือ',
    minWidth: 100,
  },
];

interface Data {
  billNo: string;
  status: string;
  principle: number;
  payment_term: number;
  payment: number;
  interest: number;
  date: string;
  paid: number;
  balance: number;
}

function createData(
  billNo: string,
  status: string,
  principle: number,
  payment_term: number,
  payment: number,
  interest: number,
  date: string,
  paid: number,
  balance: number
): Data {
  return { billNo, status, principle, payment_term, payment, interest, date, paid, balance };
}

const rows = [
  createData('1', 'ผ่อนชำระเสร็จสิ้น', 10000, 10, 0, 100, '11/11/2011', 0, 0),
  createData('2', 'ผ่อนชำระเสร็จสิ้น', 10000, 10, 0, 100, '11/11/2011', 0, 0),
  createData('3', 'ผ่อนชำระเสร็จสิ้น', 10000, 10, 0, 100, '11/11/2011', 0, 0),
  createData('4', 'ผ่อนชำระเสร็จสิ้น', 10000, 10, 0, 100, '11/11/2011', 0, 0),
  createData('5', 'ผ่อนชำระเสร็จสิ้น', 10000, 10, 0, 100, '11/11/2011', 0, 0),
  createData('6', 'ผ่อนชำระเสร็จสิ้น', 20000, 10, 0, 100, '11/11/2011', 0, 0),
  createData('7', 'ผ่อนชำระเสร็จสิ้น', 20000, 10, 0, 100, '11/11/2011', 0, 0),
  createData('8', 'ผ่อนชำระเสร็จสิ้น', 20000, 5, 0, 100, '11/11/2011', 0, 0),
  createData('9', 'ผ่อนชำระเสร็จสิ้น', 20000, 5, 0, 100, '11/11/2011', 0, 0),
  createData('10', 'กำลังผ่อนชำระ', 10000, 0, 0, 100, '11/11/2011', 0, 0),
  createData('11', 'กำลังผ่อนชำระ', 10000, 0, 0, 100, '11/11/2011', 0, 0),
  createData('12', 'กำลังผ่อนชำระ', 10000, 0, 0, 100, '11/11/2011', 0, 0),
  createData('13', 'กำลังผ่อนชำระ', 10000, 0, 0, 100, '11/11/2011', 0, 0),
  createData('14', 'กำลังผ่อนชำระ', 10000, 0, 0, 100, '11/11/2011', 0, 0),
  createData('15', 'กำลังผ่อนชำระ', 10000, 0, 0, 100, '11/11/2011', 0, 0),
];

export default function InstallmentHisPage() {
  const classes = useStyles();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || 'ประวัติการผ่อนสินค้า';
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
                        router.push(`/installmentHis?type=${item}`);
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
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <Typography variant="h6" sx={{ marginTop: '1rem', marginLeft: '1rem', fontWeight: 'bold' }}>
                      ประวัติการผ่อนสินค้า
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
                          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.billNo}
                                style={{ textAlign: 'center' }}
                              >
                                {columns.map(column => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof value === 'number' ? column.format(value) : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
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
