'use client';
import { Button, Grid } from '@mui/material';

import { useRecoilState, userState } from '@store/index';
import axios from 'axios';
import dayjs from 'dayjs';
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StepParams } from '../../../typings/renderStepProps';
import EditProfileCustomer from './editProfileCustomer';
export const DataContext = createContext<any>({});

const EditProfileData = () => {
  const [installments, setInstallments] = useState<any[]>([]);
  const [step, setStep] = useState(0);
  const [age, setAge] = useState<number | null>(null);
  const isMounted = useRef<boolean>(false);
  const { handleSubmit, watch, setValue, control } = useForm<StepParams>();

  const [userInfo, setUserInfo] = useRecoilState(userState);
  //console.log(userInfo.userNationID)
  const statuses = useMemo(() => ['โสด', 'สมรส', 'หย่าร้าง', 'หม้าย'], []);
  const id = userInfo.userNationID

  const onSubmit = useCallback(async (data: any) => {
    //console.log(data);
    const newData = { ...data, table: installments };

    try {
      const response = await axios.post(`http://localhost:4400/api/updateCard/${id}`, newData);
      //console.log(response.data);

    } catch (error) {
      console.error('Error updating data:', error);

    }
  }, [installments, id]);

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

  const conTextValue = useMemo(
    () => ({
      step,
      statuses,
      valuetext,
      onSubmit,
      calculate,
      date: birthDateValue,
      setValue,
      control,
      setAge,
    }),
    [step, statuses, valuetext, onSubmit, calculate, birthDateValue, setValue, control, setAge]
  );

  const handleEditClick = async () => {
    try {
      await handleSubmit(onSubmit)();
      navigateTo('/profileCustomer');
    } catch (error) {
      console.error('Error handling submit:', error);

    }
  };

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DataContext.Provider value={conTextValue}>
          {step === 0 && (
            <>
              <EditProfileCustomer />
              <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
                <Button type="button" variant="contained" color="primary" onClick={handleEditClick}>
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

export default EditProfileData;
