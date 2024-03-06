//step2
'use client';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
  },
  formField: {
    marginBottom: '3rem',
  },
});

export default function StepTwoPage() {
  const classes = useStyles();

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '75%' }}>
        <Typography variant="h5" style={{ marginBottom: '20px' }}>
          ข้อมูลผู้กู้ที่ประกัน
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="เลขประจำตัวประชาชน" variant="outlined" margin="normal" />
            <TextField fullWidth label="ชื่อ" variant="outlined" margin="normal" />
            <TextField fullWidth label="นามสุกล" variant="outlined" margin="normal" />
            <TextField fullWidth label="เบอร์โทรศัพท์" variant="outlined" margin="normal" />
            <TextField fullWidth label="ที่อยู่" variant="outlined" margin="normal" />
            <TextField fullWidth label="ที่อยู่ปัจจุบัน" variant="outlined" margin="normal" />
            <TextField
              label="Google Map link"
              variant="standard"
              fullWidth
              margin="normal"
              className={classes.formField}
            />
            <TextField
              label="Google Map link"
              variant="standard"
              fullWidth
              margin="normal"
              className={classes.formField}
            />
            <TextField fullWidth label="อาชีพ" variant="outlined" margin="normal" />
            <TextField fullWidth label="รายได้" variant="outlined" margin="normal" />
            <TextField fullWidth label="เบอร์โทรศัพท์ที่ทำงาน" variant="outlined" margin="normal" />
            <TextField fullWidth label="เบอร์แฟกซ์ที่ทำงาน" variant="outlined" margin="normal" />
            <TextField fullWidth label="ที่อยู่ที่ทำงาน" variant="outlined" margin="normal" />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Next
        </Button>
      </Card>
    </Grid>
  );
}
