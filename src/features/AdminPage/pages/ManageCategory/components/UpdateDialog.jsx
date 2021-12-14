import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

UpdateDialog.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  item: PropTypes.string,
};

export default function UpdateDialog({
  isOpen,
  onSubmit,
  handleClose,
  title,
  item,
}) {
  const [value, setValue] = useState('');

  const handleTextChange = (e) => {
    setValue(e.target.value)
  }

  const handleCloseDialog = () => {
    if (handleClose) {
      handleClose();
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleCloseDialog}>
        <DialogTitle>{`${title}: ${item}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Danh mục"
            fullWidth
            variant="standard"
            onChange={handleTextChange}
          />
        </DialogContent>
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
