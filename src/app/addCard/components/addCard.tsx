'use client';
import ToastSuccess from '@components/toast';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import axios from 'axios';
import dayjs from 'dayjs';
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  //const { borrowerID, nationID, firstName, lastName, birthDate, job, income, phone, phoneInJob, status, kids, addressReal, addressCurrent, addressJob, googleMapAdressReal, googleMapAdressCurrent, googleMapAdressJob, firstNameOfSpouse, lastNameOfSpouse, jobOfSpouse, incomeOfSpouse, phoneOfSpouseInJob, phoneOfSpouse, addressOfSpouseJob, googleMapAdressJobOfSpouse, guarantorNationID, guarantorFirstName, guarantorLastName, phoneOfGuarantor, addressOfGuarantorReal, addressOfGuarantorCurrent, addressOfGuarantorJob, googleMapAdressRealOfGuarantor, googleMapAdressCurrentOfGuarantor, googleMapAdressJobOfGuarantor, jobOfGuarantor, incomeOfGuarantor, phoneOfGuarantorInJob, bills } = watch();

  const steps = ['ข้อมูลผู้กู้', 'ข้อมูลผู้ค้ำประกัน', 'สร้างการ์ดผ่อนสินค้า'];
  const statuses = useMemo(() => ['โสด', 'แต่งงาน', 'หย่าร้าง', 'ม่าย'], []);

  const totalLoanValue = watch('totalLoan');
  const downPaymentValue = watch('downPayment');

  const loanAmount = Number(totalLoanValue);
  const downPayment = Number(downPaymentValue);

  const [openToast, setOpenToast] = useState(false);
  const [creditScoreText, setCreditScoreText] = useState('');

  const handleOpenToast = async () => {
    const age = Number(calculateAge(birthDateValue));
    const income = Number(watch('income'));
    const maritalStatus = watch('status');
    const children = Number(watch('kids'));

    let newMaritalStatus = '';

    switch (maritalStatus) {
      case 'โสด':
        newMaritalStatus = 'Single';
        break;
      case 'แต่งงาน':
        newMaritalStatus = 'Married';
        break;
      case 'หย่าร้าง':
        newMaritalStatus = 'Single';
        break;
      case 'ม่าย':
        newMaritalStatus = 'Single';
        break;
      default:
        newMaritalStatus = 'Single';
    }

    try {
      const response = await axios.post(
        'http://localhost:4400/api/creditScrolling',
        {
          age,
          income,
          maritalStatus: newMaritalStatus,
          children: children,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const creditScore = response.data.creditScore;
      let creditScoreText;

      switch (creditScore) {
        case 'High':
          creditScoreText = 'สูง';
          break;
        case 'Average':
          creditScoreText = 'กลาง';
          break;
        case 'Low':
          creditScoreText = 'ต่ำ';
          break;
        default:
          creditScoreText = 'ไม่สามารถประเมินได้';
      }

      setCreditScoreText(creditScoreText);
    } catch (error) {
      console.error('Error predicting credit score:', error);
      setCreditScoreText('เกิดข้อผิดพลาดในการประเมินความสามารถในการผ่อนชำระ');
    } finally {
      setOpenToast(true);
    }
  };

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  // const navigateToProfileCustomer = useCallback(() => {
  //   window.location.href = './profileCustomer';
  // }, []);

  // const onSubmit = useCallback<SubmitHandler<StepParams>>(
  //   data => {
  //     console.log(data);
  //     const newData = { ...data, table: installments };
  //     console.log(newData);

  //     // navigateToProfileCustomer();
  //   },[installments]
  //   // [installments, navigateToProfileCustomer]
  // );

  // const onSubmit = useCallback(async data => {
  //   try {
  //     const response = await fetch('http://localhost:4400/api/createCard', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data), // ส่งข้อมูลให้กับเซิร์ฟเวอร์เป็น JSON
  //     });
  //     if (!response.ok) {
  //       console.log(data)
  //       throw new Error('Network response was not ok');
  //     }
  //     const newData = await response.json(); // แปลงข้อมูลที่เซิร์ฟเวอร์ส่งกลับเป็น JSON
  //     console.log('New card created:', newData);
  //     // ทำตามขั้นตอนต่อไปเช่น navigateToProfileCustomer();
  //   } catch (error) {
  //     console.error('There was a problem with the fetch operation:', error);
  //   }
  // }, [/* dependencies */]);

  const onSubmit = useCallback(async (data: any) => {
    console.log(data);
    try {
      // เรียกใช้งาน API createCard
      const createCardResponse = await fetch('http://localhost:4400/api/createCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // ส่งข้อมูลให้กับเซิร์ฟเวอร์เป็น JSON
      });

      // เรียกใช้งาน API createBill
      const createBillResponse = await fetch('http://localhost:4400/api/addBill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // ส่งข้อมูลให้กับเซิร์ฟเวอร์เป็น JSON
      });

      //pdf
      const downloadPdfResponse = await fetch('http://localhost:4400/api/downloadPdf', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
      });

      const blob = await downloadPdfResponse.blob();

      // Create a link element
      const link = document.createElement('a');

      // Create a URL for the blob and set it as the href attribute of the link
      const url = window.URL.createObjectURL(blob);
      link.href = url;

      // Set the download attribute of the link
      link.download = 'Installment contract.pdf';

      // Append the link to the body (necessary for Firefox)
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);

      // ตรวจสอบว่าทั้งสอง API ทำงานสำเร็จหรือไม่
      if (createCardResponse.ok && createBillResponse.ok) {
        const createCardData = await createCardResponse.json();
        const createBillData = await createBillResponse.json();
        console.log('New card created:', createCardData);
        console.log('New bill created:', createBillData);
        // ทำตามขั้นตอนต่อไปเช่น navigateToProfileCustomer();
      } else {
        throw new Error('One or more API requests failed');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }, []);

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
              <Grid item xs={12} sx={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <Button variant="outlined" color="primary" type="button" onClick={handleOpenToast}>
                  ตรวจสอบ Credit
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
      <ToastSuccess
        openToast={openToast}
        handleCloseToast={handleCloseToast}
        text={`ความสามารถในการผ่อนชำระ: ${creditScoreText}`}
        showClose={true}
      />
    </>
  );
};
