import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  item: PropTypes.string,
};

export default function ConfirmDialog({
  isOpen,
  onSubmit,
  handleClose,
  title,
  item,
}) {
  const handleCloseDialog = () => {
    if (handleClose) {
      handleClose();
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleCloseDialog}>
        <DialogTitle>{`${title}: ${item}`}</DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy bỏ</Button>
          <Button onClick={handleSubmit} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
