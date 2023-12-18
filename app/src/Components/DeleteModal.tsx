import { Box, Button, Dialog, DialogActions, DialogTitle, IconButton, styled } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
          <Box className="flex flex-row items-center justify-between gap-1">
              {children}
              <IconButton
                  aria-label="close"
                  onClick={onClose}
                  sx={{
                      position: 'relative',
                      right: 0,
                      top: 0,
                      color: (theme) => theme.palette.grey[500],
                  }}
              >
                  <CloseIcon />
              </IconButton>
          </Box>
      </DialogTitle>
  );
}


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
  },
  '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
  },
}));

function DeleteConfirmationModal({
  dimissCallback,
  confirmCallback,
  open,
}: {
  dimissCallback: () => void,
  confirmCallback: (data: any) => void,
  open: boolean,
}){
  return (
    <div className={`items-center`}>
      <BootstrapDialog onClose={dimissCallback}
                aria-labelledby="customized-dialog-title"
                open={open} className="modal">
        <BootstrapDialogTitle id="customized-dialog-title" onClose={dimissCallback}>
          Delete Contact
        </BootstrapDialogTitle>
        <DialogActions>
          <Button color='error' type='submit' variant='contained' className='border border-1 py-1 mt-1 hover:bg-white hover:text-black' onClick={dimissCallback}>
                        {"Cancel"}
          </Button>
          <Button color='success' variant='contained' className='border border-1 py-1 mt-1 hover:bg-white hover:text-black' onClick={confirmCallback}>
              {"Remove"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default DeleteConfirmationModal;
