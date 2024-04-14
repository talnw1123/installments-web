export const Users = [
  {
    id: 1234567891234,

    first_name: 'Emiline',
    last_name: 'McClune',
    dateOfBirth: '01/01/1990',
    age: '34', //ระบบคำนวณมาเก็บ?
    phone: '123-456-7890',
    occupation: 'ช่างไฟฟ้า',
    currentAddress: {
      address: '123 หมู่บ้านสุขสันต์ ซอย 6 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพมหานคร',
      googleMapLink: 'https://goo.gl/maps/abcdefg',
    },
    homeAddress: {
      address: '456 หมู่บ้านพระราม ซอย 10 ถนนพระราม เขตบางคอแหลม กรุงเทพมหานคร',
      googleMapLink: 'https://goo.gl/maps/123456',
    },

    work: {
      workAddress: '789 หมู่บ้านพระราม ซอย 10 ถนนพระราม เขตบางคอแหลม กรุงเทพมหานคร',
      googleMapLink: 'https://goo.gl/maps/654321',
    },
    income: 25000,
    workPhoneNumber: '022345678',
    status: 'สมรส',
    numOfChild: 0,

    spouse: {
      firstName: 'วิภาวดี',
      lastName: 'สมิท',
      occupation: 'ว่างงาน',
      income: 0,
      workPhoneNumber: '-',
      workAddress: {
        address: '-',
        googleMapLink: '-',
      },
      phoneNumber: '081234567890',
    },

    dueDate: '24/02/2025',
    amount: '1500',

    notiDate: '01/04/2024',
    billNumber: '1234567890',
    term: 3,
  },
  {
    id: 1345268712354,

    first_name: 'John',
    last_name: 'Doe',
    dateOfBirth: '10/05/1985',
    phone: '987-654-3210',
    occupation: 'Software Engineer',
    currentAddress: {
      address: '789 Happy Street, Apartment 3A, Springfield, USA',
      googleMapLink: 'https://goo.gl/maps/happyplace',
    },
    homeAddress: {
      address: '789 Happy Street, Apartment 3A, Springfield, USA',
      googleMapLink: 'https://goo.gl/maps/happyplace',
    },
    income: 75000,
    workPhoneNumber: '0123456789',
    maritalStatus: 'Single',
    numberOfChildren: 0,

    spouse: {
      firstName: '',
      lastName: '',
      occupation: '',
      income: 0,
      workPhoneNumber: '',
      workAddress: {
        address: '',
        googleMapLink: '',
      },
      phoneNumber: '',
    },

    dueDate: '10/10/2025',
    amount: '2000',

    notiDate: '01/05/2024',
    billNumber: '0987654321',
    term: 6,
  },
];
