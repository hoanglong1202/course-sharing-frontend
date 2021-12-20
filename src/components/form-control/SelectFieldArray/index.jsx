import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

function SelectFieldArray({
  form,
  label,
  name,
  values,
  onChange,
  disable,
  arrIndex,
  subName,
}) {
  const {
    control,
    formState: { errors },
  } = form;

  const handleSelectChange = (e) => {
    if (!onChange) return;

    onChange(e.target.value);
  };

  const error = errors[`lesson`];
  const hasError = error && error.length > 0 && error[arrIndex] && error[arrIndex][subName];
  const errorMessage = hasError ? error[arrIndex][subName]?.message : null;

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <FormControl disabled={disable} fullWidth error={hasError}>
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

        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </>
  );
}

SelectFieldArray.propTypes = {
  control: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func,

  values: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  disable: PropTypes.bool,
  arrIndex: PropTypes.number,
  subName: PropTypes.string,
};

export default SelectFieldArray;
