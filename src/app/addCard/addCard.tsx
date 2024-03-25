'use client';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StepParams } from '../../../typings/renderStepProps';
import RenderStep from './RenderStep';

function valuetext(value: number) {
  return `${value}%`;
}

export default function AddCard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const form = useForm<StepParams>({});
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [age, setAge] = useState('');
  const statuses = ['Single', 'Married', 'Divorced', 'Widowed'];

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    const selectedDate = date ? date.toDate() : null;
    form.setValue('birthDate', selectedDate);

    if (selectedDate) {
      const calculatedAge = calculateAge(dayjs(selectedDate));
      setAge(calculatedAge.toString());
    } else {
      setAge('');
    }
  };

  const calculateAge = (birthday: dayjs.Dayjs) => {
    const now = dayjs();
    return now.diff(birthday, 'year');
  };

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = (data: StepParams) => {
    console.log(data);
  };

  const valuetext = (value: number) => {
    return `${value}%`;
  };

  useEffect(() => {
    form.setValue('interestRates', '5%');
  }, [form]);

  const steps = ['ข้อมูลผู้กู้', 'ข้อมูลผู้ค้ำประกัน', 'สร้างการ์ดผ่อนสินค้า'];

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <RenderStep
          step={step}
          data={data}
          handleChange={handleChange}
          nextStep={nextStep}
          form={form}
          statuses={statuses}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          valuetext={valuetext}
          age={age}
        />
      </form>
    </>
  );
}
