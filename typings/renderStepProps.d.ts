export interface StepParams {
  idBorrower: string;
  idGuarantor: string;

  nameBorrower: string;
  nameGuarantor: string;
  nameSpouse: string;

  lastNameBorrower: string;
  lastNameGuarantor: string;
  lastNameSpouse: string;

  phoneNumberBorrower: string;
  phoneNumberGuarantor: string;
  phoneNumberSpouse: string;

  workPhoneNumberBorrower: string;
  workPhoneNumberGuarantor: string;
  workPhoneNumberSpouse: string;

  addressDefaultBorrower: string;
  addressDefaultGuarantor: string;

  addressCurrentBorrower: string;
  addressCurrentGuarantor: string;

  workAddressBorrower: string;
  workAddressGuarantor: string;
  workAddressSpouse: string;

  mapLinkWorkBorrower: string;
  mapLinkWorkGuarantor: string;
  mapLinkWorkSpouse: string;

  mapLinkDefaultBorrower: string;
  mapLinkDefaultGuarantor: string;

  mapLinkCurrentBorrower: string;
  mapLinkCurrentGuarantor: string;

  statusBorrower: any;
  numOfChildBorrower: string;

  occupationBorrower: string;
  occupationGuarantor: string;
  occupationSpouse: string;

  incomeBorrower: string;
  incomeGuarantor: string;
  incomeSpouse: string;

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

  table: any[];
}
export default renderStepProps;
