'use client';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import dayjs from 'dayjs';
import { createContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepParams } from '../../../../typings/renderStepProps';
import StepOnePage from './StepOnePage';
import StepThreePage from './StepThreePage';
import StepTwoPage from './StepTwoPage';

export const DataContext = createContext<any>({});

const AddCard = () => {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState();
  const { handleSubmit, watch, setValue, control } = useForm<StepParams>();
  const statuses: string[] = ['Single', 'Married', 'Divorced', 'Widowed'];
  const steps = ['ข้อมูลผู้กู้', 'ข้อมูลผู้ค้ำประกัน', 'สร้างการ์ดผ่อนสินค้า'];

  const onSubmit: SubmitHandler<StepParams> = data => console.log(data);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const valuetext = (value: number) => {
    return `${value}%`;
  };

  useEffect(() => {
    setValue('interestRates', '5%');
  });

  const date = watch('birthDate');

  const calculate = (birthDate: string | number | dayjs.Dayjs | Date | null | undefined) => {
    if (!birthDate) {
      return '';
    }
    const now = dayjs();
    const age = now.diff(birthDate, 'year');
    return age;
  };

  const conTextValue = {
    step,
    nextStep,
    prevStep,
    statuses,
    valuetext,
    onSubmit,
    calculate,
    date,
    setValue,
    control,
    watch,
    setAge,
  };

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
