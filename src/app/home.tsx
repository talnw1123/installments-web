'use client';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  animationBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: '40px',
    transition: 'transform 0.3s ease-in-out',
  },
  title: {
    marginBottom: '30px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxProduct: {
    padding: '20px',
    backgroundColor: 'lightpink',
    width: '250px',
    height: '300px',
    margin: '50px',
    borderRadius: '20px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    marginTop: '20px',
  },
  productImage: {
    background: 'pink',
    height: '65%',
    width: '100%',
  },
  shortDetail: {
    marginTop: '8%',
    color: 'black',
  },
  textDetail: {
    marginTop: '5px',
  },
  allButton: {
    borderRadius: '100px',
    padding: '20px',
    width: '150px',
    height: '30px',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  imageSize: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export default function HomePage() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} sx={{ mb: 8 }}>
      <Grid item xs={12} sx={{ display: 'grid' }}></Grid>
    </Grid>
  );
}
