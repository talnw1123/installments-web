'use client';

import { Card, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Users } from 'app/users';
import Link from 'next/link';
import { useState } from 'react';

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
  },
  formField: {
    marginBottom: '3rem',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
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

const users = Users;
const getFullName = row => {
  return (
    <Link href={`/profileCustomer?id=${row.id}`} passHref>
      <Typography component="a">{`${row.first_name || ''} ${row.last_name || ''}`}</Typography>
    </Link>
  );
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'เลขประจำตัวประชาชน', width: 180, headerAlign: 'center', align: 'center' },
  {
    field: 'first_name',
    headerName: 'ชื่อจริง',
    width: 160,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => getFullName(params.row),
  },
  { field: 'last_name', headerName: 'นามสกุล', width: 160, headerAlign: 'center', align: 'center' },
  { field: 'phone', headerName: 'เบอร์โทรศัพท์', width: 140, headerAlign: 'center', align: 'center' },
  { field: 'dueDate', headerName: 'วันครบกำหนดชำระ', width: 140, headerAlign: 'center', align: 'center' },
  { field: 'amount', headerName: 'จำนวนเงินที่ค้าง', width: 140, headerAlign: 'center', align: 'center' },
];

export default function FindCustomerPage() {
  const classes = useStyles();

  const [idQuery, setIdQuery] = useState('');
  const [nameQuery, setNameQuery] = useState('');
  const [surnameQuery, setSurnameQuery] = useState('');
  const [phoneQuery, setPhoneQuery] = useState('');
  const [showTable, setShowTable] = useState(false);

  const preprocessedUsers = Users.map(user => ({
    ...user,
    fullNameLowerCase: `${(user.first_name || '').toLowerCase()} ${(user.last_name || '').toLowerCase()}`,
  }));

  const handleIdChange = event => {
    setIdQuery(event.target.value);
    setShowTable(true);
  };

  const handleNameChange = event => {
    setNameQuery(event.target.value);
    setShowTable(true);
  };

  const handleSurnameChange = event => {
    setSurnameQuery(event.target.value);
    setShowTable(true);
  };

  const handlePhoneChange = event => {
    setPhoneQuery(event.target.value);
    setShowTable(true);
  };

  const filteredRows = showTable
    ? preprocessedUsers.filter(
        row =>
          row.id.toString().includes(idQuery) &&
          row.fullNameLowerCase.includes(nameQuery.toLowerCase()) &&
          (row.last_name || '').toLowerCase().includes(surnameQuery.toLowerCase()) &&
          row.phone.includes(phoneQuery)
      )
    : preprocessedUsers;

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '80%' }}>
        <form>
          <Typography variant="h4">ค้นหาผู้กู้</Typography>
          <div>
            <Grid container className={classes.formContainer}>
              <div className={classes.column}>
                <TextField
                  label="เลขประจำตัวประชาชน"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={idQuery}
                  onChange={handleIdChange}
                />
              </div>
              <div className={classes.column}>
                <TextField
                  label="ชื่อ"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={nameQuery}
                  onChange={handleNameChange}
                />
              </div>
              <div className={classes.column}>
                <TextField
                  label="นามสกุล"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={surnameQuery}
                  onChange={handleSurnameChange}
                />
              </div>
              <div className={classes.column}>
                <TextField
                  label="เบอร์โทรศัพท์"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={phoneQuery}
                  onChange={handlePhoneChange}
                />
              </div>
            </Grid>
          </div>
          {/* <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary">
              ค้นหา
            </Button>
          </Grid> */}
        </form>
        <div className={classes.debtorListContainer}>
          <Box className={classes.debtorList}>
            <DataGrid rows={filteredRows} columns={columns} localeText={{ noRowsLabel: 'ไม่พบข้อมูล' }} />
          </Box>
        </div>
      </Card>
    </Grid>
  );
}
