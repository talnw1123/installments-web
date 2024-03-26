'use client';
import dayjs from 'dayjs';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { StepParams } from '../../../../typings/renderStepProps';
import StepOnePage from './StepOnepage';
import StepThreePage from './StepThreePage';
import StepTwoPage from './StepTwoPage';

interface RenderStepProps {
  step: number;
  data: StepParams;
  handleChange: (e: any) => void;
  nextStep: () => void;
  form: UseFormReturn<StepParams>;
  statuses: string[];
  selectedDate: dayjs.Dayjs | null;
  handleDateChange: (date: dayjs.Dayjs | null) => void;
  valuetext: (value: number) => string;
  age: string;
  onSubmit: () => {};
}

const RenderStep: React.FC<RenderStepProps> = ({
  step,
  data,
  handleChange,
  nextStep,
  form,
  statuses,
  selectedDate,
  handleDateChange,
  valuetext,
  age,
  onSubmit,
}) => {
  const otherProps = {
    data,
    handleChange,
    nextStep,
    form,
    statuses,
    selectedDate,
    handleDateChange,
    valuetext,
    age,
    onSubmit,
  };

  switch (step) {
    case 0:
      return <StepOnePage {...otherProps} />;
    case 1:
      return <StepTwoPage {...otherProps} />;
    case 2:
      return <StepThreePage {...otherProps} />;
    default:
      return null;
  }
};

export default RenderStep;
