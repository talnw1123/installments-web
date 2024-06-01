'use client';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StepParams } from '../../../typings/renderStepProps';

function valuetext(value: number) {
  return `${value}°C`;
}

export const DataContext = createContext<any>({});
export function parseDateString(timestamp: string) {
  return dayjs(timestamp).format('DD/MM/YYYY');
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

const AddInstallmentPage = () => {
  const classes = useStyles();
  const [installments, setInstallments] = useState<any[]>([]);
  const { handleSubmit, watch, setValue, control } = useForm<StepParams>();
  const form = useForm<StepParams>({});
  const totalLoanValue = watch('totalLoan');
  const downPaymentValue = watch('downPayment');
  const numberOfInstallmentsValue = watch('numberOfInstallments');
  const interestRatesValue = watch('interestRates');
  const contractDateValue = watch('contractDate');
  const loanAmount = Number(totalLoanValue);
  const downPayment = Number(downPaymentValue);

  const totalInstallmentAmount = useMemo(() => {
    if (totalLoanValue && downPaymentValue) {
      return parseFloat(totalLoanValue) - parseFloat(downPaymentValue);
    }
    return '';
  }, [totalLoanValue, downPaymentValue]);

  useEffect(() => {
    if (totalLoanValue && downPaymentValue) {
      const total = parseFloat(totalLoanValue) - parseFloat(downPaymentValue);
      setValue('totalInstallmentAmount', total.toFixed(2));
    }
  }, [totalLoanValue, downPaymentValue, setValue]);

  const handleCreateInstallments = useCallback(() => {
    const numberOfInstallments = parseInt(numberOfInstallmentsValue, 10);
    const interestRate = parseFloat(interestRatesValue.replace('%', ''));
    const totalInstallmentAmount = parseFloat(totalLoanValue) - parseFloat(downPaymentValue);
    const totalInterest = (totalInstallmentAmount * interestRate) / 100;
    const monthlyInterest = totalInterest / numberOfInstallments;
    const principalPayment = totalInstallmentAmount / numberOfInstallments;
    const monthlyPayment = principalPayment + monthlyInterest;
    const newInstallments = [];

    for (let i = 0; i < numberOfInstallments; i++) {
      newInstallments.push({
        id: i + 1,
        installmentNumber: i + 1,
        dueDate: parseDateString(
          dayjs(contractDateValue)
            .add(i + 1, 'month')
            .toISOString()
        ),
        amountDue: monthlyPayment.toFixed(2),
        interest: monthlyInterest.toFixed(2),
        principal: (monthlyPayment - monthlyInterest).toFixed(2),
      });
    }

    setInstallments(newInstallments);
  }, [
    numberOfInstallmentsValue,
    interestRatesValue,
    totalLoanValue,
    downPaymentValue,
    contractDateValue,
    setInstallments,
  ]);

  const conTextValue = useMemo(
    () => ({
      handleCreateInstallments,
      installments,
      setInstallments,
      totalLoanValue,
      downPaymentValue,
    }),
    [handleCreateInstallments, installments, setInstallments, totalLoanValue, downPaymentValue]
  );

  return (
    <>
      <Grid container className={classes.bigContainer}>
        <Card sx={{ padding: 4, width: '75%' }}>
          <Typography variant="h5" sx={{ marginLeft: '4px', marginBottom: '10px' }}>
            เพิ่มการ์ดผ่อนสินค้า
          </Typography>
          <Grid container spacing={4} className={classes.formContainer}>
            <Grid item>
              <Grid container spacing={3} className={classes.form}>
                <Grid item xs={3.5}>
                  <Controller
                    name="idBorrower"
                    control={form?.control}
                    render={({ field: { onChange } }) => (
                      <Autocomplete
                        id="idBorrower-autocomplete"
                        options={[]}
                        getOptionLabel={option => option.name}
                        style={{ width: 300 }}
                        onChange={(event, item) => {
                          onChange(item?.id);
                        }}
                        renderInput={params => <TextField {...params} label="user" />}
                      />
                    )}
                  />
                </Grid>
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
              </Grid>

              <Grid container spacing={3} className={classes.form}>
                <Grid item xs={1.5}>
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
                <Grid item xs={1.5}>
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
                <Grid item xs={2}>
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
          <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleCreateInstallments}
              sx={{ marginTop: '22px' }}
            >
              ยืนยัน
            </Button>
          </Grid>
        </Card>
      </Grid>
      <DataContext.Provider value={conTextValue}></DataContext.Provider>
    </>
  );
};
export default AddInstallmentPage;
