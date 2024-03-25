'use client';

import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, Grid, Typography, styled } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useCallback, useRef, useState } from 'react';

const useStyles = makeStyles({
  bigContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
  },
  container: {
    display: 'block',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80%',
  },
  graph: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
    alignItems: 'center',
    marginTop: '30px',
    marginBottom: '30px',
  },
});

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

export default function SummaryPage() {
  const classes = useStyles();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const isMounted = useRef(false);
  const [openAlertDialogError, setOpenAlertDialogError] = useState<boolean>(false);

  const handleOnCloseDialog = () => {
    setOpenAlertDialogError(false);
  };

  const [outstandingBalance, setOutstandingBalance] = useState(0);

  const searchSummary = useCallback(async () => {
    const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : null;
    const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : null;
  });

  function ccyFormat(number: number | undefined): string {
    return number ? number.toFixed(2) : '0.00';
  }

  return (
    <Grid container className={classes.bigContainer}>
      <Card sx={{ padding: 3, width: '80%' }}>
        <Grid container>
          <Typography sx={{ mb: 2, mt: -0.5, fontSize: '30px', fontWeight: 'bold' }}>สรุปการผ่อนชำระสินค้า</Typography>
        </Grid>
        <Grid container className={classes.container}>
          <Grid
            item
            xs={12}
            container
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', mt: '-5px' }}
          >
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="วันเริ่มต้น" value={startDate} onChange={setStartDate} />
              </LocalizationProvider>
            </Grid>

            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="วันสิ้นสุด" value={endDate} onChange={setEndDate} />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={2} sm={1}>
              <Button
                variant="contained"
                onClick={searchSummary}
                fullWidth
                sx={{
                  borderRadius: 200,
                  padding: '6px 6px',
                  minWidth: 0,
                  backgroundColor: '#f7d769',
                  '&:hover': {
                    backgroundColor: '#ffe55a',
                  },
                  width: 'auto',
                }}
              >
                <SearchIcon />
              </Button>
            </Grid>
          </Grid>

          <Grid className={classes.container}>
            <Card style={{ height: 480, width: '100%' }} className={classes.graph}>
              Graph
            </Card>

            <Grid sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Typography sx={{ mb: 2, mt: -0.5, fontSize: '20px', fontWeight: 'bold', color: 'red' }}>
                ยอดค้างทั้งสิ้น {outstandingBalance} บาท
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
