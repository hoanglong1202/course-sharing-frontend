/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

function SelectField({
  form,
  // control,
  // errors,
  label,
  name,
  values,
  onChange,
  disable,
}) {
  const {
    control,
    formState: { errors },
  } = form;
  const handleSelectChange = (e) => {
    if (!onChange) return;

    onChange(e.target.value);
  };

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <FormControl disabled={disable} fullWidth error={!!errors[name]}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <NativeSelect
              {...field}
              onChange={(e) => {
                handleSelectChange(e);
                field.onChange(e);
              }}
            >
              <option key="all" value="">
                Chọn
              </option>
              {values.map((x) => (
                <option key={x.name} value={x.id}>
                  {x.name}
                </option>
              ))}
            </NativeSelect>
          )}
        />

        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </>
  );
}

SelectField.propTypes = {
  control: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func,

  values: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  disable: PropTypes.bool,
};

export default SelectField;
