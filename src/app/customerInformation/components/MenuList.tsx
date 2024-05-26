'use client';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRecoilState, userState } from '@store/index';
import { useRouter, useSearchParams } from 'next/navigation';
import 'react-multi-carousel/lib/styles.css';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px',
    marginLeft: '15px',
    marginTop: '10px',
  },
});

export default function MenuList() {
  const classes = useStyles();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const id = searchParams.get('id');
  const searchType = searchParams.get('type') || 'ประวัติผู้กู้';
  const menuList = [
    { label: 'ประวัติผู้กู้', route: `/profileCustomer?id=${userInfo.userNationID}` },
    { label: 'ชำระเงิน', route: `/Pay?type=${userInfo.userNationID}` },
    { label: 'ประวัติการชำระเงิน', route: `/paymentHistory?type=${userInfo.userNationID}` },
    { label: 'สร้างการ์ดผ่อนสินค้า', route: `/addCard?type=${userInfo.userNationID}` },
    { label: 'ประวัติการผ่อนสินค้า', route: `/installmentHis?type=${userInfo.userNationID}` },
    { label: 'ติดตามหนี้', route: `/debtCollection?type=${userInfo.userNationID}` },
  ];
  return (
    <>
      <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
        <Grid className={classes.menu}>
          <Grid item>
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
