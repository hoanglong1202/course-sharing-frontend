import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

InputFieldArray.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  arrIndex: PropTypes.number,
  subName: PropTypes.string,
};

function InputFieldArray({ form, name, label, disabled, arrIndex, subName }) {
  const {
    control,
    formState: { errors },
  } = form;

  const error = errors[`lesson`];
  const hasError = error && error.length > 0 && error[arrIndex] && error[arrIndex][subName];
  const errorMessage = hasError ? error[arrIndex][subName]?.message : null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          margin="normal"
          variant="outlined"
          disabled={disabled}
          error={hasError}
          helperText={errorMessage}
        />
      )}
    />
  );
}

export default InputFieldArray;
