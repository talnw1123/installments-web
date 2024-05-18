'use client';
import { useContext } from 'react';
import StepOnePage from './StepOnepage';
import StepThreePage from './StepThreePage';
import StepTwoPage from './StepTwoPage';
import { DataContext } from './addCard';

const RenderStep = () => {
  const { step } = useContext(DataContext);
  switch (step) {
    case 0:
      return <StepOnePage />;
    case 1:
      return <StepTwoPage />;
    case 2:
      return <StepThreePage />;
  }
};

export default RenderStep;
