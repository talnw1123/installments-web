'use client';
import { Card, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import 'react-multi-carousel/lib/styles.css';

import MenuList from './MenuList';

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
  },
});

export default function CustomerInformationPage() {
  const classes = useStyles();

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, minHeight: 800, width: '80%' }}>
        <MenuList />
        <profileCustomer />
      </Card>
    </Grid>
  );
}
