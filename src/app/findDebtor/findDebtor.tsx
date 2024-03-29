// step1;
'use client';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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
    width: '75%',
  },
});

const rows = [
  {
    id: 1,
    lastName: 'Snow',
    firstName: 'Jon',
    date: '24/02/45',
    amount: '1500',
    status: 'แจ้งชำระหนี้',
    noticeLetter: 'ทวงหนี้',
  },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime' },
  { id: 4, lastName: 'Stark', firstName: 'Arya' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys' },
];

const getFullName = row => {
  return `${row.firstName || ''} ${row.lastName || ''}`;
};

const columns: GridColDef[] = [
  { field: 'date', headerName: 'วันครบกำหนดชำระ', width: 130 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'amount', headerName: 'จำนวนเงิน', width: 130 },
  { field: 'status', headerName: '', width: 130 },
  { field: 'noticeLetter', headerName: '', width: 130 },
];

export default function FindDebtorPage() {
  const classes = useStyles();

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '80%' }}>
        <form>
          <Typography variant="h4">ค้นหาผู้กู้</Typography>

          <div>
            <Grid container className={classes.formContainer}>
              <div className={classes.column}>
                <Grid item xs={12}>
                  <TextField label="ชื่อ" variant="standard" fullWidth margin="normal" className={classes.formField} />
                </Grid>
              </div>
              <div className={classes.column}>
                <TextField label="นามสกุล" variant="standard" fullWidth margin="normal" className={classes.formField} />
              </div>
              <div className={classes.column}>
                <TextField
                  label="บัตรประจำตัวประชาชน"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  className={classes.formField}
                />
              </div>
              <div className={classes.column}>
                <TextField
                  label="เบอร์โทรศัพท์"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  className={classes.formField}
                />
              </div>
            </Grid>
          </div>
          <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary">
              Find
            </Button>
          </Grid>
        </form>

        <div className={classes.debtorListContainer}>
          <Box className={classes.debtorList}>
            <DataGrid rows={rows} columns={columns} />
          </Box>
        </div>
      </Card>
    </Grid>
  );
}
