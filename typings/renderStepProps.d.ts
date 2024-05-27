export interface StepParams {
  nationID: string;
  guarantorNationID: string;

  firstName: string;
  nameGuarantor: string;
  firstNameOfSpouse: string;

  lastName: string;
  lastNameGuarantor: string;
  lastNameOfSpouse: string;

  phone: string;
  phoneNumberGuarantor: string;
  phoneNumberSpouse: string;

  phoneInJob: string;
  phoneOfGuarantorInJob: string;
  phoneOfSpouseInJob: string;

  addressReal: string;
  addressOfGuarantorReal: string;

  addressCurrent: string;
  addressOfGuarantorCurrent: string;

  addressJob: string;
  addressOfGuarantorJob: string;
  addressOfSpouseJob: string;

  googleMapAdressJob: string;
  googleMapAdressJobOfGuarantor: string;
  googleMapAdressJobOfSpouse: string;

  googleMapAdressReal: string;
  googleMapAdressRealOfGuarantor: string;

  googleMapAdressCurrent: string;
  googleMapAdressCurrentOfGuarantor: string;

  status: any;
  kids: string;

  job: string;
  jobOfGuarantor: string;
  jobOfSpouse: string;

  income: string;
  incomeGuarantor: string;
  incomeOfSpouse: string;

  birthDate: dayjs.Dayjs | null;
  age?: number;

  billNumber: string;
  contractDate: string;
  contractNumber: string;
  totalLoan: string;
  downPayment: string;
  numberOfInstallments: string;
  interestRates: string;
  totalInstallmentAmount: string;
  dueDate: dayjs.Dayjs | null;

  table: any[];
}

export default renderStepProps;
