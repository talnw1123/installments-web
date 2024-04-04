'use client';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import dayjs from 'dayjs';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepParams } from '../../../../typings/renderStepProps';
import StepOnePage from './StepOnepage';
import StepThreePage from './StepThreePage';
import StepTwoPage from './StepTwoPage';

export const DataContext = createContext<any>({});

const AddCard = () => {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState();
  const { handleSubmit, watch, setValue, control } = useForm<StepParams>();
  const steps = ['ข้อมูลผู้กู้', 'ข้อมูลผู้ค้ำประกัน', 'สร้างการ์ดผ่อนสินค้า'];
  const statuses = useMemo(() => ['Single', 'Married', 'Divorced', 'Widowed'], []);

  const onSubmit = useCallback<SubmitHandler<StepParams>>(data => {
    console.log(data);
  }, []);

  const nextStep = useCallback(() => setStep(prevStep => prevStep + 1), []);
  const prevStep = useCallback(() => setStep(prevStep => prevStep - 1), []);
  const valuetext = useCallback((value: number) => `${value}%`, []);

  useEffect(() => {
    setValue('interestRates', '5%');
  }, [setValue]);

  const date = watch('birthDate');

  const calculate = useCallback((birthDate: string | number | dayjs.Dayjs | Date | null | undefined) => {
    if (!birthDate) {
      return '';
    }
    const now = dayjs();
    const age = now.diff(birthDate, 'year');
    return age;
  }, []);

  const [installments, setInstallments] = useState<any[]>([]);

  const birthDateValue = watch('birthDate');
  const totalLoanValue = watch('totalLoan');
  const downPaymentValue = watch('downPayment');
  const numberOfInstallmentsValue = watch('numberOfInstallments');
  const interestRatesValue = watch('interestRates');
  const contractDateValue = watch('contractDate');

  const handleCreateInstallments = useCallback(() => {
    const totalLoan = parseFloat(totalLoanValue);
    const downPayment = parseFloat(downPaymentValue);
    const numberOfInstallments = parseInt(numberOfInstallmentsValue, 10);
    const interestRate = parseFloat(interestRatesValue) / 100;
    const loanAmount = totalLoan - downPayment;
    const monthlyInterest = (loanAmount * interestRate) / 12;
    const monthlyPayment = (loanAmount + loanAmount * interestRate) / numberOfInstallments;

    const installmentData = [];
    let remainingPrincipal = loanAmount;

    for (let i = 1; i <= numberOfInstallments; i++) {
      const interest = (remainingPrincipal * interestRate) / 12;
      const principal = monthlyPayment - interest;
      remainingPrincipal -= principal;

      installmentData.push({
        id: i,
        installmentNumber: i,
        date: dayjs(contractDateValue).add(i, 'month').format('DD/MM/YYYY'),
        amountDue: monthlyPayment,
        interest: interest.toFixed(2),
        principal: principal.toFixed(2),
      });
    }

    setInstallments(installmentData);
  }, [totalLoanValue, downPaymentValue, numberOfInstallmentsValue, interestRatesValue, contractDateValue]);

  const conTextValue = useMemo(
    () => ({
      step,
      nextStep,
      prevStep,
      statuses,
      valuetext,
      onSubmit,
      calculate,
      date: birthDateValue,
      setValue,
      control,
      setAge,
      handleCreateInstallments,
      installments,
      setInstallments,
    }),
    [
      step,
      nextStep,
      prevStep,
      statuses,
      valuetext,
      onSubmit,
      calculate,
      birthDateValue,
      setValue,
      control,
      setAge,
      handleCreateInstallments,
      installments,
      setInstallments,
    ]
  );

  return (
    <>
      <Box sx={{ width: '100%', marginTop: 5 }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DataContext.Provider value={conTextValue}>
          {step === 0 && (
            <>
              <StepOnePage />
              <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    nextStep();
                  }}
                >
                  Next
                </Button>
              </Grid>
            </>
          )}
          {step === 1 && (
            <>
              <StepTwoPage />
              <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e => {
                    e.preventDefault();
                    prevStep();
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    nextStep();
                  }}
                >
                  Next
                </Button>
              </Grid>
            </>
          )}
          {step === 2 && (
            <>
              <StepThreePage />
              <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e => {
                    e.preventDefault();
                    prevStep();
                  }}
                >
                  Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </>
          )}
        </DataContext.Provider>
      </form>
    </>
  );
};

export default AddCard;
