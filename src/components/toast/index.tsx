import CheckCircle from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Snackbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC, ReactNode } from 'react';

interface ToastSuccessProps {
  openToast?: boolean;
  handleCloseToast?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  text?: string | ReactNode;
  showClose?: boolean;
}

const useStyles = makeStyles({
  snackbarStyleSuccess: {
    width: 500,
  },
  textToast: {
    color: 'rgb(15, 92, 46)',
    fontWeight: 500,
    fontSize: 16,
  },
});

const ToastSuccess: FC<ToastSuccessProps> = props => {
  const { openToast, handleCloseToast, text, showClose } = props;
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={openToast}
      onClose={handleCloseToast}
      ContentProps={{
        'aria-describedby': 'message-id',
        className: `${classes.snackbarStyleSuccess}`,
      }}
      sx={{
        '& .MuiSnackbarContent-root': {
          backgroundColor: '#E0F8D1',
        },
      }}
      message={
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
          <CheckCircle color="success" onClick={handleCloseToast} />
          <Typography variant="h6" sx={{ ml: 2, whiteSpace: 'pre-line' }} className={classes.textToast}>
            {text}
          </Typography>
          {showClose && (
            <CloseIcon
              sx={{ color: '#4F9E52', position: 'absolute', right: 20, cursor: 'pointer' }}
              onClick={handleCloseToast}
            />
          )}
        </Box>
      }
    />
  );
};

export default ToastSuccess;
