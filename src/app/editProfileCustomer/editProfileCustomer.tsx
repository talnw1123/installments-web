'use client';

import { Card, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRecoilState, userState } from '@store/index';
import MenuList from 'app/customerInformation/page';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import 'react-multi-carousel/lib/styles.css';
import { DataContext } from './editProfileData';

import dayjs from 'dayjs';
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

const EditProfileCustomer = () => {
  const { control, statuses, setValue, calculate, setAge } = useContext(DataContext);
  const classes = useStyles();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  console.log(id);

  const [borrowerData, setBorrowerData] = useState(null);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const handleEditClick = () => {
    navigateTo('/profileCustomer?id=${id}');
  };

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  useEffect(() => {
    const fetchBorrowerData = async () => {
      try {
        const response = await fetch(`http://localhost:4400/api/getEachBorrowers/${id}`);
        const data = await response.json();

        if (response.ok) {
          setBorrowerData(data);
          if (data && data.length > 0) {
            const { borrower } = data[0];
            setValue('nationID', borrower.nationID || '');
            setValue('firstName', borrower.firstName || '');
            setValue('lastName', borrower.lastName || '');
            setValue('birthDate', dayjs(borrower.birthDate) || null);
            //console.log(dayjs(borrower.birthDate))
            const now = dayjs();
            setValue('age', now.diff(borrower.birthDate, 'year') || '');
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

            setUserInfo(prevState => ({
              ...prevState,
              userNationID: id as string,
            }));
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
  }, [id, setValue, setUserInfo, calculate]);
  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '80%' }}>
        <Grid container className={classes.topContainer}>
          <Grid item>
            <Grid container sx={{ mb: 3, mt: 1, color: 'red', fontSize: '16px', marginLeft: '1070px' }}>
              <Link href={`/profileCustomer?id=${id}`}>{'ย้อนกลับ'}</Link>
            </Grid>

            <Typography variant="h4" sx={{ marginLeft: '12.5px' }}>
              ประวัติลูกค้า
            </Typography>
          </Grid>
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
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="เลขประจำตัวประชาชน"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <Controller
                      name="firstName"
                      defaultValue={''}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ชื่อ"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={10} sx={{ marginTop: '4px' }}>
                    <Controller
                      name="addressReal"
                      defaultValue={''}
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
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Controller
                      name="googleMapAdressReal"
                      defaultValue={''}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Google Map link"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>

                  <Grid container item spacing={2}>
                    <Grid item xs={5}>
                      <Controller
                        name="status"
                        defaultValue={''}
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
                        defaultValue={''}
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
                      defaultValue={''}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="เบอร์โทรศัพท์"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>

                  <Grid container item spacing={2}>
                    <Grid item xs={5}>
                      <Controller
                        name="job"
                        defaultValue={''}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="อาชีพ"
                            variant="standard"
                            fullWidth
                            margin="dense"
                            className={classes.formField}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Grid>
                        <Controller
                          name="income"
                          defaultValue={''}
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
                      defaultValue={''}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="เบอร์ที่ทำงาน"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={10} sx={{ marginTop: '5px' }}>
                    <Controller
                      name="firstNameOfSpouse"
                      defaultValue={''}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="ชื่อคู่สมรส"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={10} sx={{ marginTop: '16px' }}>
                    <Controller
                      name="phoneOfSpouse"
                      defaultValue={''}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="เบอร์โทรศัพท์"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
                        />
                      )}
                    />
                  </Grid>

                  <Grid container item spacing={2}>
                    <Grid item xs={5}>
                      <Controller
                        name="phoneOfSpouse"
                        defaultValue={''}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="อาชีพ"
                            variant="standard"
                            fullWidth
                            margin="dense"
                            className={classes.formField}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Grid>
                        <Controller
                          name="jobOfSpouse"
                          defaultValue={''}
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
                      defaultValue={''}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="เบอร์ที่ทำงาน"
                          variant="standard"
                          fullWidth
                          margin="dense"
                          className={classes.formField}
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
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            {...field}
                            label="วันเกิด"
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
                    defaultValue={''}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="นามสกุล"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Controller
                    name="addressCurrent"
                    defaultValue={''}
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
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Controller
                    name="googleMapAdressCurrent"
                    defaultValue={''}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Google Map link"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10} sx={{ marginTop: '48px' }}>
                  <Controller
                    name="addressJob"
                    defaultValue={''}
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
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Controller
                    name="googleMapAdressJob"
                    defaultValue={''}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Google Map link"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Controller
                    name="lastNameOfSpouse"
                    defaultValue={''}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="นามสกุล"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Controller
                    name="addressOfSpouseJob"
                    defaultValue={''}
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
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Controller
                    name="googleMapAdressJobOfSpouse"
                    defaultValue={''}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Google Map link"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        className={classes.formField}
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

export default EditProfileCustomer;
