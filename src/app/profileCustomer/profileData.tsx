'use client';
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
  const { handleSubmit, watch, setValue, control } = useForm<StepParams>();
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <DataContext1.Provider value={conTextValue}>
          {step === 0 && (
            <>
              <ProfileCustomer />
            </>
          )}
        </DataContext1.Provider>
      </form>
    </>
  );
};

export default ProfileData;
