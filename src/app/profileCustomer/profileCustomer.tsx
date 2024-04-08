// 'use client';
// import { AdapterDayjs } from '@mui/lab/AdapterDayjs'; // Changed import path
// import { DatePicker } from '@mui/lab/DatePicker'; // Changed import path
// import { LocalizationProvider } from '@mui/lab/LocalizationProvider'; // Changed import path
// import { Grid, MenuItem, TextField } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import dayjs from 'dayjs';
// import { useRouter } from 'next/router'; // Changed import path
// import { useState } from 'react';

// import CustomerInformationPage from 'app/customerInformation/page';
// import { John } from 'app/john';

// const useStyles = makeStyles({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//   },
//   formContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   formSection: {
//     marginBottom: '1.5rem',
//   },
//   formColumn: {
//     display: 'flex',
//     flexDirection: 'column',
//     flexBasis: '50%',
//     padding: '0 1rem',
//   },
//   formField: {
//     marginBottom: '3rem',
//   },
// });

// export default function ProfileCustomer() {
//   const classes = useStyles();

//   const [selectedDate, setSelectedDate] = useState(null); // Removed type annotation
//   const [age, setAge] = useState('');

//   const statuses = ['Single', 'Married', 'Divorced', 'Widowed'];

//   const handleDateChange = newValue => {
//     // Removed type annotation
//     setSelectedDate(newValue);
//     if (newValue) {
//       const calculatedAge = calculateAge(newValue);
//       setAge(calculatedAge.toString());
//     }
//   };

//   const calculateAge = birthday => {
//     // Removed type annotation
//     const now = dayjs();
//     return now.diff(birthday, 'year');
//   };

//   return (
//     <Grid>
//       <CustomerInformationPage />
//       <Grid container>
//         <form>
//           <Grid container spacing={2} className={classes.formContainer}>
//             <Grid item xs={4}>
//               <TextField
//                 label="บัตรประจำตัวประชาชน"
//                 defaultValue={John.personalInfo.idNumber}
//                 variant="standard"
//                 fullWidth
//                 margin="normal"
//                 className={classes.formField}
//                 InputProps={{
//                   readOnly: true,
//                 }}
//               />

//               <TextField
//                 disabled
//                 label="ชื่อ"
//                 variant="standard"
//                 fullWidth
//                 margin="normal"
//                 className={classes.formField}
//               />

//               <TextField
//                 disabled
//                 label="เบอร์โทรศัพท์"
//                 variant="standard"
//                 fullWidth
//                 margin="normal"
//                 className={classes.formField}
//               />
//               <TextField
//                 disabled
//                 label="ที่อยู่"
//                 fullWidth
//                 margin="normal"
//                 multiline
//                 rows={4}
//                 className={classes.formField}
//               />

//               <TextField
//                 disabled
//                 label="Google Map link"
//                 variant="standard"
//                 fullWidth
//                 margin="normal"
//                 className={classes.formField}
//               />

//               <Grid container item spacing={2}>
//                 <Grid item xs={6}>
//                   <TextField label="สถานะภาพ" variant="standard" fullWidth select className={classes.formField}>
//                     {statuses.map(status => (
//                       <MenuItem key={status} value={status}>
//                         {status}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={6}>
//                   disabled
//                   <TextField label="จำนวนบุตร" variant="standard" fullWidth className={classes.formField} />
//                 </Grid>
//               </Grid>
//               <TextField
//                 disabled
//                 label="ชื่อคู่สมรส"
//                 variant="standard"
//                 fullWidth
//                 margin="normal"
//                 className={classes.formField}
//               />

//               <TextField
//                 disabled
//                 label="อาชีพ"
//                 variant="standard"
//                 fullWidth
//                 margin="normal"
//                 className={classes.formField}
//               />

//               <TextField
//                 disabled
//                 label="เบอร์โทรที่ทำงาน"
//                 variant="standard"
//                 fullWidth
//                 margin="normal"
//                 className={classes.formField}
//               />

//               <TextField
//                 disabled
//                 label="เบอร์แฟกซ์ที่ทำงาน"
//                 variant="standard"
//                 fullWidth
//                 margin="normal"
//                 className={classes.formField}
//               />
//             </Grid>

//             <Grid item xs={4} container direction="column" style={{ marginTop: '28px' }}>
//               <Grid item>
//                 <TextField
//                   disabled
//                   label="นามสกุล"
//                   variant="standard"
//                   fullWidth
//                   margin="normal"
//                   className={classes.formField}
//                 />

//                 <Grid container item spacing={2}>
//                   <Grid item xs={6}>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                       <DatePicker
//                         label="วันเกิด"
//                         value={selectedDate}
//                         onChange={handleDateChange}
//                         renderInput={params => (
//                           <TextField
//                             {...params}
//                             variant="standard"
//                             fullWidth
//                             margin="normal"
//                             className={classes.formField}
//                           />
//                         )}
//                       />
//                     </LocalizationProvider>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField
//                       disabled
//                       label="อายุ"
//                       variant="standard"
//                       fullWidth
//                       margin="normal"
//                       className={classes.formField}
//                       value={age}
//                     />
//                   </Grid>
//                 </Grid>

//                 <TextField
//                   disabled
//                   label="ที่อยู่"
//                   fullWidth
//                   margin="normal"
//                   multiline
//                   rows={4}
//                   className={classes.formField}
//                 />

//                 <TextField
//                   disabled
//                   label="Google Map link"
//                   variant="standard"
//                   fullWidth
//                   margin="normal"
//                   className={classes.formField}
//                 />

//                 <TextField
//                   disabled
//                   label="นามสกุล"
//                   variant="standard"
//                   fullWidth
//                   margin="normal"
//                   className={classes.formField}
//                 />

//                 <TextField
//                   disabled
//                   label="รายได้"
//                   variant="standard"
//                   fullWidth
//                   margin="normal"
//                   className={classes.formField}
//                 />

//                 <TextField
//                   disabled
//                   label="ที่อยู่ที่ทำงาน"
//                   fullWidth
//                   margin="normal"
//                   multiline
//                   rows={4}
//                   className={classes.formField}
//                 />
//               </Grid>
//             </Grid>
//           </Grid>
//         </form>
//       </Grid>
//     </Grid>
//   );
// }

'use client';
import { Grid, MenuItem, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomerInformationPage from 'app/customerInformation/page';
import { John } from 'app/john';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
  },
  // container: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'flex-start',
  //   justifyContent: 'center',
  // },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // formSection: {
  //   marginBottom: '1.5rem',
  // },
  // formColumn: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   flexBasis: '50%',
  //   padding: '0 1rem',
  // },
  formField: {
    marginBottom: '3rem',
  },
});

export default function ProfileCustomerPage() {
  const classes = useStyles();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [age, setAge] = useState('');

  const statuses = ['Single', 'Married', 'Divorced', 'Widowed'];

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedDate(newValue);
    if (newValue) {
      const calculatedAge = calculateAge(newValue);
      setAge(calculatedAge.toString());
    }
  };

  const calculateAge = (birthday: dayjs.Dayjs) => {
    const now = dayjs();
    return now.diff(birthday, 'year');
  };

  return (
    <Grid>
      <Grid>
        <CustomerInformationPage />
        <form>
          <Grid container spacing={2} className={classes.formContainer}>
            <Grid item xs={4}>
              <TextField
                label="บัตรประจำตัวประชาชน"
                defaultValue={John.personalInfo.idNumber}
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                disabled
                label="ชื่อ"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />

              <TextField
                disabled
                label="เบอร์โทรศัพท์"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />
              <TextField
                disabled
                label="ที่อยู่"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                className={classes.formField}
              />

              <TextField
                disabled
                label="Google Map link"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />

              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <TextField label="สถานะภาพ" variant="standard" fullWidth select className={classes.formField}>
                    {statuses.map(status => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  disabled
                  <TextField label="จำนวนบุตร" variant="standard" fullWidth className={classes.formField} />
                </Grid>
              </Grid>
              <TextField
                disabled
                label="ชื่อคู่สมรส"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />

              <TextField
                disabled
                label="อาชีพ"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />

              <TextField
                disabled
                label="เบอร์โทรที่ทำงาน"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />

              <TextField
                disabled
                label="เบอร์แฟกซ์ที่ทำงาน"
                variant="standard"
                fullWidth
                margin="normal"
                className={classes.formField}
              />
            </Grid>

            <Grid item xs={4} container direction="column" style={{ marginTop: '28px' }}>
              <Grid item>
                <TextField
                  disabled
                  label="นามสกุล"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  className={classes.formField}
                />

                <Grid container item spacing={2}>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="วันเกิด"
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={params => (
                          <TextField
                            {...params}
                            variant="standard"
                            fullWidth
                            margin="normal"
                            className={classes.formField}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      label="อายุ"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      className={classes.formField}
                      value={age}
                    />
                  </Grid>
                </Grid>

                <TextField
                  disabled
                  label="ที่อยู่"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  className={classes.formField}
                />

                <TextField
                  disabled
                  label="Google Map link"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  className={classes.formField}
                />

                <TextField
                  disabled
                  label="นามสกุล"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  className={classes.formField}
                />

                <TextField
                  disabled
                  label="รายได้"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  className={classes.formField}
                />

                <TextField
                  disabled
                  label="ที่อยู่ที่ทำงาน"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  className={classes.formField}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
