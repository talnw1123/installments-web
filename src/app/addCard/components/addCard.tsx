'use client';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import dayjs from 'dayjs';
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepParams } from '../../../../typings/renderStepProps';
import StepOnePage from './StepOnepage';
import StepThreePage from './StepThreePage';
import StepTwoPage from './StepTwoPage';

export const DataContext = createContext<any>({});

const AddCard = () => {
  const [installments, setInstallments] = useState<any[]>([]);
  const [step, setStep] = useState(0);
  const [age, setAge] = useState<number | null>(null);
  const isMounted = useRef<boolean>(false);
  const { handleSubmit, watch, setValue, control } = useForm<StepParams>();
  const steps = ['ข้อมูลผู้กู้', 'ข้อมูลผู้ค้ำประกัน', 'สร้างการ์ดผ่อนสินค้า'];
  const statuses = useMemo(() => ['Single', 'Married', 'Divorced', 'Widowed'], []);

  const totalLoanValue = watch('totalLoan');
  const downPaymentValue = watch('downPayment');

  const loanAmount = Number(totalLoanValue);
  const downPayment = Number(downPaymentValue);

  const onSubmit = useCallback<SubmitHandler<StepParams>>(
    data => {
      console.log(data);
      const newData = { ...data, table: installments };
      console.log(newData);
    },
    [installments]
  );

  const nextStep = useCallback(() => setStep(prevStep => prevStep + 1), []);
  const prevStep = useCallback(() => setStep(prevStep => prevStep - 1), []);
  const valuetext = useCallback((value: number) => `${value}%`, []);

  useEffect(() => {
    setValue('interestRates', '5%');
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
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

  const birthDateValue = watch('birthDate');
  const numberOfInstallmentsValue = watch('numberOfInstallments');
  const interestRatesValue = watch('interestRates');
  const contractDateValue = watch('contractDate');

  const totalInstallmentAmount = useMemo(() => {
    if (totalLoanValue && downPaymentValue) {
      return parseFloat(totalLoanValue) - parseFloat(downPaymentValue);
    }
    return '';
  }, [totalLoanValue, downPaymentValue]);

  useEffect(() => {
    // Make sure both values are present and are numbers before calling toFixed
    if (totalLoanValue && downPaymentValue) {
      const total = parseFloat(totalLoanValue) - parseFloat(downPaymentValue);
      setValue('totalInstallmentAmount', total.toFixed(2));
    }
  }, [totalLoanValue, downPaymentValue, setValue]);

  const handleCreateInstallments = useCallback(() => {
    const loanAmount = parseFloat(totalLoanValue);
    const downPayment = parseFloat(downPaymentValue);
    const numberOfInstallments = parseInt(numberOfInstallmentsValue, 10);
    const interestRate = parseFloat(interestRatesValue.replace('%', '')); // Remove the '%' character

    // Calculate the total installment amount after the down payment
    const totalInstallmentAmount = loanAmount - downPayment;

    // Flat rate interest calculation: Total interest over the loan period
    const totalInterest = (totalInstallmentAmount * interestRate) / 100;

    // Calculate monthly interest
    const monthlyInterest = totalInterest / numberOfInstallments;

    // Calculate principal payment per installment
    const principalPayment = totalInstallmentAmount / numberOfInstallments;

    // Monthly payment is sum of monthly interest and principal payment
    const monthlyPayment = principalPayment + monthlyInterest;

    const newInstallments = [];

    for (let i = 0; i < numberOfInstallments; i++) {
      const roundedMonthlyPayment = Math.ceil(monthlyPayment);
      const roundedInterestPayment = Math.ceil(monthlyInterest);
      const roundedPrincipalPayment = roundedMonthlyPayment - roundedInterestPayment;

      newInstallments.push({
        id: i + 1,
        installmentNumber: i + 1,
        date: dayjs(contractDateValue).add(i, 'month').format('DD/MM/YYYY'),
        amountDue: roundedMonthlyPayment.toFixed(2), // Rounded monthly payment
        interest: roundedInterestPayment.toFixed(2),
        principal: roundedPrincipalPayment.toFixed(2),
      });
    }

    setInstallments(newInstallments);
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
      totalLoanValue,
      downPaymentValue,
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
      totalLoanValue,
      downPaymentValue,
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
