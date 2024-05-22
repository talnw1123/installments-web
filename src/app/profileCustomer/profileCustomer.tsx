'use client';

import EditIcon from '@mui/icons-material/Edit';
import { Card, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRecoilState, userState } from '@store/index';
import MenuList from 'app/customerInformation/page';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import 'react-multi-carousel/lib/styles.css';
import { DataContext1 } from './profileData';

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  formContainer: {
    // marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  formBigContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  formColumn: {
    padding: '0',
    margin: '0',
  },
  formBigColumn: {
    borderLeft: '2px solid lightgray',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  formField: {
    marginBottom: '3rem',
  },
});


const ProfileCustomer = () => {
  // const router = useRouter();
  // const { id } = router.isReady ? router.query : { id: undefined };
  // const customer = id ? use(useCustomer(id)) : null;
  const searchParams = useSearchParams(); // Destructure using square brackets

  // Now you can access query parameters using searchParams.get('id')
  const id = searchParams.get('id');
  //console.log('id from query:', id);

  const { control, statuses, setValue, calculate, setAge } = useContext(DataContext1);
  const classes = useStyles();
  const [borrowerData, setBorrowerData] = useState(null);

  const [userInfo, setUserInfo] = useRecoilState(userState);

  // console.log('id:', id); // ตรวจสอบค่า id

  // if (!customer) {
  //   return <div>Not Found Data</div>;
  // }

  const handleEditClick = () => {
    navigateTo('/editProfileCustomer');
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    const fetchBorrowerData = async () => {
      try {
        const response = await fetch(`http://localhost:4400/api/getEachBorrowers/${id}`);
        const data = await response.json();
        if (id) {
          fetchBorrowerData();
          // อัปเดตค่า id ลงใน userState
          setUserInfo({ userNationID: id });
          //console.log(userInfo)
        }
        if (response.ok) {
          setBorrowerData(data);
          //console.log('Fetched borrowerData:', data);
          // อัปเดตค่าใน form เมื่อได้รับข้อมูลจาก API
          if (data && data.length > 0) {
            const { borrower } = data[0];
            setValue('nationID', borrower.nationID || '');
            setValue('firstName', borrower.firstName || '');
            setValue('lastName', borrower.lastName || '');
            setValue('birthDate', borrower.birthDate || null);
            setValue('job', borrower.job || '');
            setValue('income', borrower.income || '');
            setValue('phone', borrower.phone || '');
            setValue('phoneInJob', borrower.phoneInJob || '');
            setValue('status', borrower.status || '');
            setValue('kids', borrower.kids || '');
            setValue('addressReal', borrower.addressReal || '');
            setValue('addressCurrent', borrower.addressCurrent || '');
            setValue('addressJob', borrower.addressJob || '');
            setValue('googleMapAdressReal', borrower.googleMapAdressReal || '');
            setValue('googleMapAdressCurrent', borrower.googleMapAdressCurrent || '');
            setValue('googleMapAdressJob', borrower.googleMapAdressJob || '');
            setValue('firstNameOfSpouse', borrower.firstNameOfSpouse || '');
            setValue('lastNameOfSpouse', borrower.lastNameOfSpouse || '');
            setValue('jobOfSpouse', borrower.jobOfSpouse || '');
            setValue('incomeOfSpouse', borrower.incomeOfSpouse || '');
            setValue('phoneOfSpouseInJob', borrower.phoneOfSpouseInJob || '');
            setValue('phoneOfSpouse', borrower.phoneOfSpouse || '');
            setValue('addressOfSpouseJob', borrower.addressOfSpouseJob || '');
            setValue('googleMapAdressJobOfSpouse', borrower.googleMapAdressJobOfSpouse || '');
            setValue('guarantorNationID', borrower.guarantorNationID || '');
            setValue('guarantorFirstName', borrower.guarantorFirstName || '');
            setValue('guarantorLastName', borrower.guarantorLastName || '');
            setValue('phoneOfGuarantor', borrower.phoneOfGuarantor || '');
            setValue('addressOfGuarantorReal', borrower.addressOfGuarantorReal || '');
            setValue('addressOfGuarantorCurrent', borrower.addressOfGuarantorCurrent || '');
            setValue('addressOfGuarantorJob', borrower.addressOfGuarantorJob || '');
            setValue('googleMapAdressRealOfGuarantor', borrower.googleMapAdressRealOfGuarantor || '');
            setValue('googleMapAdressCurrentOfGuarantor', borrower.googleMapAdressCurrentOfGuarantor || '');
            setValue('googleMapAdressJobOfGuarantor', borrower.googleMapAdressJobOfGuarantor || '');
            setValue('jobOfGuarantor', borrower.jobOfGuarantor || '');
            setValue('incomeOfGuarantor', borrower.incomeOfGuarantor || '');
            setValue('phoneOfGuarantorInJob', borrower.phoneOfGuarantorInJob || '');
          }

        } else {
          console.error('Error fetching data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchBorrowerData();
    }
  }, [id, setValue]);

  // สร้างฟังก์ชันสำหรับการแสดงค่าเริ่มต้นจากข้อมูลที่ได้จาก API
  // const getDefaultValue = (fieldName) => {
  //   console.log(borrowerData)
  //   if (borrowerData && borrowerData.length > 0) {
  //     const { borrower } = borrowerData[0]; // สมมติว่าข้อมูลที่ได้จาก API มีโครงสร้างตามที่คุณระบุ
  //     console.log(borrower[fieldName])
  //     return borrower[fieldName]
  //   }
  // };

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '80%' }}>
        <Grid container className={classes.topContainer}>
          <Typography variant="h4" sx={{ marginLeft: '12.5px' }}>
            ประวัติผู้กู้
          </Typography>

          <EditIcon
            style={{ color: '#2196f3', width: '10%', marginTop: '10px', cursor: 'pointer' }}
            onClick={handleEditClick}
          />
        </Grid>

        <Grid container className={classes.formContainer}>
          <Grid className={classes.formBigContainer}>
            <Grid>
              <MenuList />
            </Grid>
            <Grid className={classes.formBigColumn}>
              <Grid item xs={6} className={classes.formColumn} sx={{ marginLeft: '50px' }}>
                <Grid container spacing={1}>
                  <Grid item xs={10}>
                    <Controller
                      name="nationID"
                      defaultValue={" "}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="เลขประจำตัวประชาชน"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <Controller
                      name="firstName"
                      // defaultValue={Users[0].first_name}
                      defaultValue={" "}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ชื่อ"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={10} sx={{ marginTop: '4px' }}>
                    <Controller
                      name="addressReal"
                      defaultValue={" "}
                      // defaultValue={Users[0].homeAddress.address}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ที่อยู่ตามบัตรประชาชน"
                          fullWidth
                          margin="dense"
                          multiline
                          rows={4}
                          className={classes.formField}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Controller
                      name="googleMapAdressReal"
                      defaultValue={" "}
                      //defaultValue={Users[0].homeAddress.googleMapLink}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Google Map link"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid container item spacing={2}>
                    <Grid item xs={5}>
                      <Controller
                        name="status"
                        defaultValue={" "}
                        //defaultValue={Users[0].status}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="สถานะภาพ"
                            variant="standard"
                            fullWidth
                            margin="dense"
                            className={classes.formField}
                            InputProps={{
                              readOnly: true,
                            }}
                          >
                            {statuses.map((status: string) => (
                              <MenuItem key={status} value={status}>
                                {status}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Controller
                        name="kids"
                        defaultValue={" "}
                        //defaultValue={Users[0].numOfChild}
                        control={control}
                        render={({ field }) => (
                          <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField
                              {...field}
                              label="จำนวนบุตร"
                              variant="standard"
                              fullWidth
                              margin="dense"
                              className={classes.formField}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                            <Typography sx={{ marginTop: '28px', marginLeft: '10px' }}>คน</Typography>
                          </Grid>
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={10}>
                    <Controller
                      name="phone"
                      defaultValue={" "}
                      //defaultValue={Users[0].phone}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="เบอร์โทรศัพท์"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid container item spacing={2}>
                    <Grid item xs={5}>
                      <Controller
                        name="job"
                        defaultValue={" "}
                        //defaultValue={Users[0].occupation}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="อาชีพ"
                            variant="standard"
                            fullWidth
                            margin="dense"
                            className={classes.formField}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Grid>
                        <Controller
                          name="income"
                          defaultValue={" "}
                          //defaultValue={Users[0].income}
                          control={control}
                          render={({ field }) => (
                            <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                              <TextField
                                {...field}
                                label="รายได้"
                                variant="standard"
                                fullWidth
                                margin="dense"
                                className={classes.formField}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                              <Typography sx={{ marginTop: '28px', marginLeft: '10px' }}>บาท</Typography>
                            </Grid>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={10}>
                    <Controller
                      name="phoneInJob"
                      defaultValue={" "}
                      //defaultValue={Users[0].workPhoneNumber}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="เบอร์ที่ทำงาน"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={10} sx={{ marginTop: '5px' }}>
                    <Controller
                      name="firstNameOfSpouse"
                      defaultValue={" "}
                      //defaultValue={Users[0].spouse.firstName}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ชื่อคู่สมรส"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={10} sx={{ marginTop: '16px' }}>
                    <Controller
                      name="phoneOfSpouse"
                      defaultValue={" "}
                      //defaultValue={Users[0].spouse.phoneNumber}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="เบอร์โทรศัพท์"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid container item spacing={2}>
                    <Grid item xs={5}>
                      <Controller
                        name="jobOfSpouse"
                        defaultValue={" "}
                        //defaultValue={Users[0].spouse.occupation}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="อาชีพ"
                            variant="standard"
                            fullWidth
                            margin="dense"
                            className={classes.formField}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Grid>
                        <Controller
                          name="incomeOfSpouse"
                          defaultValue={" "}
                          //defaultValue={Users[0].spouse.income}
                          control={control}
                          render={({ field }) => (
                            <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                              <TextField
                                {...field}
                                label="รายได้"
                                variant="standard"
                                fullWidth
                                margin="dense"
                                className={classes.formField}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                              <Typography sx={{ marginTop: '28px', marginLeft: '10px' }}>บาท</Typography>
                            </Grid>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={10}>
                    <Controller
                      name="phoneOfSpouseInJob"
                      defaultValue={" "}
                      // defaultValue={Users[0].spouse.workPhoneNumber}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="เบอร์ที่ทำงาน"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6} className={classes.formColumn}>
                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <Controller
                      name="birthDate"
                      control={control}
                      defaultValue={null}
                      //defaultValue={dayjs(Users[0].dateOfBirth)}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            {...field}
                            label="วันเกิด"
                            readOnly={true}
                            onChange={newValue => {
                              setValue('birthDate', newValue);
                              const age = calculate(newValue);
                              setValue('age', age);
                              setAge(age);
                            }}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </Grid>
                  <Grid item xs={5} sx={{ marginTop: '15px' }}>
                    <Controller
                      name="age"
                      control={control}
                      defaultValue={" "}
                      //defaultValue={Users[0].age}
                      render={({ field: { value } }) => (
                        <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Typography>{value ? `อายุ: ${value}` : 'อายุ'}</Typography>
                          <Typography sx={{ marginLeft: '10px' }}>ปี</Typography>
                        </Grid>
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={10} sx={{ marginTop: '3px' }}>
                  <Controller
                    name="lastName"
                    defaultValue={" "}
                    //defaultValue={Users[0].last_name}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="นามสกุล"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Controller
                    name="addressCurrent"
                    defaultValue={" "}
                    //defaultValue={Users[0].currentAddress.address}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ที่อยู่ปัจจุบัน"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        className={classes.formField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Controller
                    name="googleMapAdressCurrent"
                    defaultValue={" "}
                    //defaultValue={Users[0].currentAddress.googleMapLink}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Google Map link"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10} sx={{ marginTop: '48px' }}>
                  <Controller
                    name="addressJob"
                    defaultValue={" "}
                    //defaultValue={Users[0].work.workAddress}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ที่อยู่ที่ทำงาน"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        className={classes.formField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Controller
                    name="googleMapAdressJob"
                    defaultValue={" "}
                    //defaultValue={Users[0].work.googleMapLink}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Google Map link"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Controller
                    name="lastNameOfSpouse"
                    defaultValue={" "}
                    //defaultValue={Users[0].spouse.lastName}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="นามสกุล"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Controller
                    name="addressOfSpouseJob"
                    defaultValue={" "}
                    //defaultValue={Users[0].spouse.workAddress.address}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ที่อยู่ที่ทำงาน"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        className={classes.formField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Controller
                    name="googleMapAdressJobOfSpouse"
                    defaultValue={" "}
                    //defaultValue={Users[0].spouse.workAddress.googleMapLink}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Google Map link"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ProfileCustomer;
