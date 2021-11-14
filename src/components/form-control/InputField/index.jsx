import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { control, formState } = form;
  const hasError = formState.errors[name] ? true : false;

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
          helperText={formState.errors[name]?.message}
        />
      )}
    />
  );
}

export default InputField;
