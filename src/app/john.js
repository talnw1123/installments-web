// mock up data
export const John = {
  personalInfo: {
    idNumber: '1234457890123',
    firstName: 'จอห์น',
    lastName: 'สมิท',
    dateOfBirth: '01/01/1990',
    phoneNumber: '081234567890',
    occupation: 'ช่างไฟฟ้า',

    currentAddress: {
      address: '123 หมู่บ้านสุขสันต์ ซอย 6 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพมหานคร',
      googleMapLink: 'https://goo.gl/maps/abcdefg',
    },
    homeAddress: {
      address: '456 หมู่บ้านพระราม ซอย 10 ถนนพระราม เขตบางคอแหลม กรุงเทพมหานคร',
      googleMapLink: 'https://goo.gl/maps/123456',
    },

    income: 25000,
    workPhoneNumber: '022345678',

    maritalStatus: 'สมรส',
    numberOfChildren: 0,
  },
  spouse: {
    firstName: 'วิภาวดี',
    lastName: 'สมิท',
    occupation: 'ว่างงาน',
    income: 0,
    workPhoneNumber: '',
    workAddress: {
      address: '',
      googleMapLink: '',
    },
    phoneNumber: '081234567890',
  },
  financialInfo: {
    notiDate: '01/04/2024',
    billNumber: '1234567890',
    term: 3,
  },
};
