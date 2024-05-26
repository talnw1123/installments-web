'use client';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext } from 'react';
import { Controller } from 'react-hook-form';
import { DataContext } from './addCard';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
function valuetext(value: number) {
  return `${value}°C`;
}

const installmentColumns: GridColDef[] = [
  { field: 'installmentNumber', headerName: 'งวดที่', width: 120 },
  { field: 'dueDate', headerName: 'วันที่ครบกำหนด', width: 150 },
  { field: 'amountDue', headerName: 'เงินที่ต้องชำระ', type: 'number', width: 180 },
  { field: 'interest', headerName: 'ดอกเบี้ย', type: 'number', width: 150 },
  { field: 'principal', headerName: 'เงินต้น', type: 'number', width: 150 },
];

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '2rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  formContainer: {
    marginTop: '20px',
    display: 'grid',
    justifyContent: 'space-evenly',
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
    marginBottom: '4rem',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const StepThreePage = () => {
  const { control, setValue, handleCreateInstallments, installments } = useContext(DataContext);
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.bigContainer}>
        <Card sx={{ padding: 4, width: '75%' }}>
          <Typography variant="h5" sx={{ marginLeft: 4 }}>
            สร้างการ์ดผ่อนสินค้า
          </Typography>
          <Grid container spacing={2} className={classes.formContainer}>
            <Grid item>
              <Grid container spacing={3} className={classes.form}>
                <Grid item xs={2.5}>
                  <Controller
                    name="billNumber"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="หมายเลขบิล"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={2.5}>
                  <Controller
                    name="contractNumber"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="หมายเลขสัญญา"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={2.5}>
                  <Controller
                    name="totalLoan"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="รวมยอดเงินกู้"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1" sx={{ marginTop: '35px' }}>
                    บาท
                  </Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Controller
                    name="downPayment"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="เงินดาว์น"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1" sx={{ marginTop: '35px' }}>
                    บาท
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={3} className={classes.form}>
                <Grid item xs={2}>
                  <Controller
                    name="numberOfInstallments"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="จำนวนงวด"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1" sx={{ marginTop: '35px' }}>
                    งวด
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <Controller
                    name="interestRates"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="อัตราดอกเบี้ย"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Controller
                    name="totalInstallmentAmount"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="รวมยอดเงินผ่อน"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1" sx={{ marginTop: '35px' }}>
                    บาท
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={handleCreateInstallments}
                    sx={{ marginTop: '22px' }}
                  >
                    สร้าง
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="table"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <DataGrid rows={installments || []} columns={installmentColumns} autoHeight {...field} />
                )}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};
export default StepThreePage;
