'use client';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRouter, useSearchParams } from 'next/navigation';
import 'react-multi-carousel/lib/styles.css';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSection: {
    marginBottom: '1.5rem',
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '50%',
    padding: '0 1rem',
  },
  formField: {
    marginBottom: '3rem',
  },
});

export default function MenuList() {
  const classes = useStyles();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || 'ประวัติผู้กู้';
  const menuList = [
    { label: 'ประวัติผู้กู้', route: '/profileCustomer?type=ประวัติผู้กู้' },
    { label: 'ชำระเงิน', route: '/Pay?type=ชำระเงิน' },
    { label: 'ประวัติการชำระเงิน', route: '/paymentHistory?type=ประวัติการชำระเงิน' },
    { label: 'สร้างการ์ดผ่อนสินค้า', route: '/addCard?type=สร้างการ์ดผ่อนสินค้า' },
    { label: 'ประวัติการผ่อนสินค้า', route: '#' },
    { label: 'ติดตามหนี้', route: '#' },
  ];

  return (
    <>
      <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
        <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', borderRight: '2px solid lightgray' }}>
          <Grid item sx={{ marginTop: '2rem' }}>
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
              {menuList.map(item => (
                <Grid item key={item.label}>
                  <Typography
                    sx={{ fontWeight: searchType === item.label ? 700 : 0, cursor: 'pointer' }}
                    onClick={() => {
                      router.push(item.route); // ใช้ route ที่กำหนดไว้ใน menuList
                    }}
                    component="span"
                  >
                    {item.label.toUpperCase()}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
