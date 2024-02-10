'use client';

import { Card, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const useStyles = makeStyles({
  bigContainer: {
    padding: '2rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  breadcrumbsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50px',
    marginLeft: '50px',
    alignItems: 'left',
  },
  textBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'left',
    marginLeft: '50px',
    marginTop: '20px',
    marginRight: '50px',
    width: '95%',
  },
  smallBox: {
    marginTop: '20px',
    marginBottom: '30px',
  },
  shortTitle: {
    color: '#8c8c8c',
    marginBottom: '10px',
  },
});

export default function AddCardPage() {
  const classes = useStyles();

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, minHeight: 700, width: '100%' }}>
        <Grid container className={classes.container}>
          <Grid container direction="column" className={classes.textBox}>
            <Grid>
              <h2>About Webname</h2>
              <Grid className={classes.smallBox}>
                <h3 className={classes.shortTitle}>Description</h3>
                <Typography>
                  ANGLE ACS FLAGSHIP STORE 126 PRACHA UTHIT RD BANGKOK THAILAND OPEN DAILY 11.30 AM - 20.30 PM
                </Typography>
                <Typography>E-MAIL: ANGLE.ACS@GMAIL.COM </Typography>

                <Typography>LINE ID: @ANGLEACS</Typography>
              </Grid>
              <Grid className={classes.smallBox}>
                <h3 className={classes.shortTitle}>Company</h3>
                <Typography>Angle acs co.,itd</Typography>
              </Grid>
              <Grid className={classes.smallBox}>
                <h3 className={classes.shortTitle}>Phone</h3>
                <Typography>091-212312</Typography>
              </Grid>
              <Grid className={classes.smallBox}>
                <h3 className={classes.shortTitle}>Address</h3>
                <Typography>126 PRACHA UTHIT RD BANGKOK THAILAND 10140</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
