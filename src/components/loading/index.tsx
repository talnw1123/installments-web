'use client';
import { Grid } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';

function MyLoader() {
  return (
    <Grid
      className="sweet-loading"
      sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}
    >
      <ClipLoader color="lightpink" loading={true} size={200} />
    </Grid>
  );
}

export default MyLoader;
