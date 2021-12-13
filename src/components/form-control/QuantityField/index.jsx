import {
  Box,
  FormControl,
  FormHelperText, OutlinedInput,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: 250,
  },
}));

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const { control, formState } = form;

  const hasError = formState.errors[name] ? true : false;

  return (
    <FormControl error={hasError} fullWidth margin="normal" variant="outlined">
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Box className={classes.box}>
            <OutlinedInput
              {...field}
              id={name}
              type="number"
              disabled={disabled}
            />
          </Box>
        )}
      />

      <FormHelperText>{formState.errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default QuantityField;
