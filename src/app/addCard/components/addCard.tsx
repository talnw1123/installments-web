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
export function parseDateString(timestamp: string) {
  return dayjs(timestamp).format('DD/MM/YYYY');
}

const AddCard = () => {
  const [installments, setInstallments] = useState<any[]>([]);
  const [step, setStep] = useState(0);
  const [age, setAge] = useState<number | null>(null);
  const isMounted = useRef<boolean>(false);
  const { handleSubmit, watch, setValue, control } = useForm<StepParams>();
  const steps = ['ข้อมูลผู้กู้', 'ข้อมูลผู้ค้ำประกัน', 'สร้างการ์ดผ่อนสินค้า'];
  const statuses = useMemo(() => ['โสด', 'แต่งงาน', 'หย่าร้าง', 'ม่าย'], []);

  const totalLoanValue = watch('totalLoan');
  const downPaymentValue = watch('downPayment');

  const loanAmount = Number(totalLoanValue);
  const downPayment = Number(downPaymentValue);

  const navigateToProfileCustomer = useCallback(() => {
    window.location.href = './profileCustomer';
  }, []);

  const onSubmit = useCallback<SubmitHandler<StepParams>>(
    data => {
      console.log(data);
      const newData = { ...data, table: installments };
      console.log(newData);
      navigateToProfileCustomer();
    },
    [installments, navigateToProfileCustomer]
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

  const parseDateStringTime = (dateString: string): string => {
    return new Date(dateString).toISOString();
  };

  const calculateAge = useCallback((birthDate: string): number | '' => {
    const parsedDate = parseDateStringTime(birthDate);
    if (!parsedDate) {
      return '';
    }
    const now = dayjs();
    const age = now.diff(parsedDate, 'year');
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
      step,
      nextStep,
      prevStep,
      statuses,
      valuetext,
      onSubmit,
      calculateAge,
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
      calculateAge,
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
                  ถัดไป
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
                  ย้อนกลับ
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
                  ถัดไป
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
                  ย้อนกลับ
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  ยืนยัน
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
