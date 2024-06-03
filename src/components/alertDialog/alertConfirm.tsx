'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FC, memo } from 'react';

interface AlertDialogConfirmProps {
  openAlertDialog: boolean;
  handleOnCloseDialog: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const AlertDialogConfirm: FC<AlertDialogConfirmProps> = props => {
  const { openAlertDialog, handleOnCloseDialog, onConfirm, title, message } = props;
  return (
    <Dialog fullScreen={false} open={openAlertDialog} onClose={handleOnCloseDialog}>
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleOnCloseDialog} color="error">
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(AlertDialogConfirm);
