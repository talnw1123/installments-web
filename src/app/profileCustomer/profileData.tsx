'use client';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import dayjs from 'dayjs';
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepParams } from '../../../typings/renderStepProps';
import ProfileCustomer from './profileCustomer';

export const DataContext1 = createContext<any>({});

const ProfileData = () => {
  const [installments, setInstallments] = useState<any[]>([]);

  const [step, setStep] = useState(0);
  const [age, setAge] = useState<number | null>(null);
  const isMounted = useRef<boolean>(false);
  const { handleSubmit, watch, setValue, control } = useForm();
  const steps = ['ข้อมูลผู้กู้', 'ข้อมูลผู้ค้ำประกัน', 'สร้างการ์ดผ่อนสินค้า'];
  const statuses = useMemo(() => ['Single', 'Married', 'Divorced', 'Widowed'], []);

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
  const totalLoanValue = watch('totalLoan');
  const downPaymentValue = watch('downPayment');
  const numberOfInstallmentsValue = watch('numberOfInstallments');
  const interestRatesValue = watch('interestRates');
  const contractDateValue = watch('contractDate');

  const handleCreateInstallments = useCallback(() => {
    const totalLoanAmount = parseFloat(totalLoanValue) - parseFloat(downPaymentValue);
    let remainingPrincipal = totalLoanAmount;
    const newInstallments = [];

    for (let i = 0; i < parseInt(numberOfInstallmentsValue, 10); i++) {
      const interestPayment = remainingPrincipal * (parseFloat(interestRatesValue) / 100 / 12);
      const principalPayment = totalLoanAmount / parseInt(numberOfInstallmentsValue, 10);
      const totalPayment = interestPayment + principalPayment;
      remainingPrincipal -= principalPayment;

      newInstallments.push({
        id: i + 1,
        installmentNumber: i + 1,
        date: dayjs(contractDateValue).add(i, 'month').format('DD/MM/YYYY'),
        amountDue: totalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
      });
    }

    setInstallments(newInstallments);
  }, [totalLoanValue, downPaymentValue, numberOfInstallmentsValue, interestRatesValue, contractDateValue]);

  const conTextValue = useMemo(
    () => ({
      control,
    }),
    [control]
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
        <DataContext1.Provider value={conTextValue}>
          {step === 0 && (
            <>
              <ProfileCustomer />
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
        </DataContext1.Provider>
      </form>
    </>
  );
};

export default ProfileData;
