'use client';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const isMounted = useRef<boolean>(false);

  type Borrower = {
    firstName: string;
    lastName: string;
    nationID: string;
  };

  const [borrowers, setBorrowers] = useState<Borrower[]>([]);

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

  useEffect(() => {
    async function fetchBorrowers() {
      try {
        const response = await fetch('http://localhost:4400/api/getBorrowersName');
        const data = await response.json();
        const formattedData: Borrower[] = data.map((item: any) => ({
          firstName: item.firstName,
          lastName: item.lastName,
          nationID: item.nationID,
        }));
        setBorrowers(formattedData);
      } catch (error) {
        console.error('Failed to fetch borrowers:', error);
      }
    }

    fetchBorrowers();
  }, []);

  const onSubmit = useCallback(async (data: any) => {
    try {
      console.log('Submitting data:', data);
      const createBillCardResponse = await fetch('http://localhost:4400/api/createBillCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!createBillCardResponse.ok) {
        const errorData = await createBillCardResponse.json();
        console.error('Error response:', errorData);
        throw new Error(`Error: ${createBillCardResponse.status}`);
      }

      const downloadPdfResponse = await fetch('http://localhost:4400/api/downloadPdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!downloadPdfResponse.ok) {
        const errorData = await downloadPdfResponse.json();
        console.error('Error response:', errorData);
        throw new Error(`Error: ${downloadPdfResponse.status}`);
      }

      const blob = await downloadPdfResponse.blob();
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = 'Installment contract.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }, []);

  const valuetext = useCallback((value: number) => `${value}%`, []);

  useEffect(() => {
    setValue('interestRates', '5%');
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, [setValue]);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <DataContext.Provider value={conTextValue}>
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
                        name="nationID"
                        control={form.control}
                        rules={{ required: 'Nation ID is required' }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <Autocomplete
                              id="idBorrower-autocomplete"
                              options={borrowers}
                              getOptionLabel={option => `${option.firstName} ${option.lastName}`}
                              style={{ width: 300 }}
                              onChange={(event, item) => {
                                field.onChange(item ? item.nationID : null);
                              }}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label="user"
                                  error={!!error}
                                  helperText={error ? error.message : null}
                                />
                              )}
                            />
                          </>
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
                            InputProps={{
                              readOnly: true,
                            }}
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
        </DataContext.Provider>
      </form>
    </>
  );
};
export default AddInstallmentPage;
