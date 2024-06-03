'use client';
import { Card, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Link from 'next/link';
import { useEffect, useState } from 'react';

dayjs.extend(customParseFormat);

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
  },
  column: {
    width: '25%',
    padding: '10px',
  },
  debtorListContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  debtorList: {
    width: '100%',
    minWidth: '500px',
    maxWidth: '1000px',
    minHeight: '400px',
  },
});

const columns: GridColDef[] = [
  { field: 'id', headerName: 'เลขประจำตัวประชาชน', width: 180, headerAlign: 'center', align: 'center' },
  { field: 'first_name', headerName: 'ชื่อจริง', width: 160, headerAlign: 'center', align: 'center' },
  { field: 'last_name', headerName: 'นามสกุล', width: 160, headerAlign: 'center', align: 'center' },
  { field: 'phone', headerName: 'เบอร์โทรศัพท์', width: 140, headerAlign: 'center', align: 'center' },
  { field: 'dueDate', headerName: 'วันครบกำหนดชำระ', width: 140, headerAlign: 'center', align: 'center' },
  { field: 'totalAmount', headerName: 'จำนวนเงินที่ค้าง', width: 140, headerAlign: 'center', align: 'center' },
];

export default function FindCustomerPage() {
  const classes = useStyles();

  const [idQuery, setIdQuery] = useState('');
  const [nameQuery, setNameQuery] = useState('');
  const [surnameQuery, setSurnameQuery] = useState('');
  const [phoneQuery, setPhoneQuery] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [borrowersData, setBorrowersData] = useState([]);

  const fetchBorrowers = async () => {
    try {
      const response = await axios.get('http://localhost:4400/api/getBorrowers');
      const data = response.data;
      setBorrowersData(data);
    } catch (error) {
      console.error('Error fetching borrowers:', error);
    }
  };

  useEffect(() => {
    fetchBorrowers();
  }, []);

  const calculateNumberOfPaidInstallments = paymentHistory => {
    return paymentHistory.filter(payment => payment.status === 'paid').length;
  };

  const calculateTotalAmountDue = (totalPaymentWithInterest, numberOfInstallments, numberOfPaidInstallments) => {
    return totalPaymentWithInterest - (totalPaymentWithInterest / numberOfInstallments) * numberOfPaidInstallments;
  };

  const calculateDueDate = (createdAt, paymentHistory) => {
    const unpaidPayment = paymentHistory
      .filter(payment => payment.status === 'unpaid')
      .sort((a, b) => a.timePayment - b.timePayment)[0];

    if (unpaidPayment) {
      const date = dayjs(createdAt);
      return date.add(unpaidPayment.timePayment, 'month').format('DD/MM/YYYY');
    } else {
      return 'N/A';
    }
  };

  const preprocessedBorrowers = borrowersData.map(borrowerData => {
    const { borrower, bills } = borrowerData;
    const totalAmount = bills.reduce((total, bill) => {
      const totalPaymentWithInterest = parseFloat(bill.totalPaymentWithInterest);
      const numberOfPaidInstallments = calculateNumberOfPaidInstallments(bill.paymentHistory);
      return total + calculateTotalAmountDue(totalPaymentWithInterest, bill.numberOfInstallments, numberOfPaidInstallments);
    }, 0);
    const dueDate = bills.length > 0 ? calculateDueDate(bills[0].createdAt, bills[0].paymentHistory) : '';

    if (!borrower?.nationID) return null;

    return {
      id: borrower?.nationID,
      first_name: borrower?.firstName,
      last_name: borrower?.lastName,
      phone: borrower?.phone,
      totalAmount,
      dueDate,
    };
  });

  const filteredRows = preprocessedBorrowers.filter(row => row !== null);

  const handleIdChange = (event: any) => {
    setIdQuery(event.target.value);
    setShowTable(true);
  };

  const handleNameChange = (event: any) => {
    setNameQuery(event.target.value);
    setShowTable(true);
  };

  const handleSurnameChange = (event: any) => {
    setSurnameQuery(event.target.value);
    setShowTable(true);
  };

  const handlePhoneChange = (event: any) => {
    setPhoneQuery(event.target.value);
    setShowTable(true);
  };

  const getFullNameLink = (row: any) => (
    <Link href={`/profileCustomer?id=${row.id}`} passHref>
      <Typography component="a">{`${row.first_name || ''} ${row.last_name || ''}`}</Typography>
    </Link>
  );

  const columnsWithLink = columns.map(col => ({
    ...col,
    renderCell: params => (
      <Link href={`/profileCustomer?id=${params.row.id}`} passHref>
        <Typography style={{ cursor: 'pointer', pointerEvents: 'auto' }}>{params.value}</Typography>
      </Link>
    ),
  }));

  const filteredRowsWithSearch = showTable
    ? filteredRows.filter(
        row =>
          row &&
          row.id.toString().startsWith(idQuery) &&
          row.first_name.toLowerCase().startsWith(nameQuery.toLowerCase()) &&
          (row.last_name || '').toLowerCase().startsWith(surnameQuery.toLowerCase()) &&
          row.phone.startsWith(phoneQuery)
      )
    : filteredRows;

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '80%' }}>
        <form>
          <Typography variant="h4">ค้นหาผู้กู้</Typography>
          <Grid>
            <Grid container>
              <Grid className={classes.column}>
                <TextField
                  label="เลขประจำตัวประชาชน"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={idQuery}
                  onChange={handleIdChange}
                />
              </Grid>
              <Grid className={classes.column}>
                <TextField
                  label="ชื่อ"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={nameQuery}
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid className={classes.column}>
                <TextField
                  label="นามสกุล"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={surnameQuery}
                  onChange={handleSurnameChange}
                />
              </Grid>
              <Grid className={classes.column}>
                <TextField
                  label="เบอร์โทรศัพท์"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={phoneQuery}
                  onChange={handlePhoneChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
        <Grid className={classes.debtorListContainer}>
          <Box className={classes.debtorList}>
            <DataGrid
              rows={filteredRowsWithSearch}
              columns={columnsWithLink}
              localeText={{ noRowsLabel: 'ไม่พบข้อมูล' }}
              getRowId={row => row.id}
            />
          </Box>
        </Grid>
      </Card>
    </Grid>
  );
}
