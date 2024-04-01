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
    width: '100%',
    minWidth: '500px',
    maxWidth: '670px',
  },
});

const rows = [
  {
    id: 1,
    lastName: 'Snow',
    firstName: 'Jon',
    date: '24/02/45',
    amount: '1500',
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
  { field: 'firstName', headerName: 'ชื่อจริง', width: 160, headerAlign: 'center', align: 'center' },
  { field: 'lastName', headerName: 'นามสกุล', width: 160, headerAlign: 'center', align: 'center' },
  { field: 'date', headerName: 'วันครบกำหนดชำระ', width: 160, headerAlign: 'center', align: 'center' },
  { field: 'amount', headerName: 'จำนวนเงินที่ค้าง', width: 160, headerAlign: 'center', align: 'center' },
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
                <TextField
                  label="เลขประจำตัวประชาชน"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  className={classes.formField}
                />
              </div>
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
              ค้นหา
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
