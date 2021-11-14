import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  makeStyles,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    maxWidth: 250,
  },
}));

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const { control, formState, getValues, setValue } = form;

  const hasError = formState.errors[name] ? true : false;

  const getQuantity = () => {
    return Number.parseInt(getValues("quantity"));
  };
  return (
    <FormControl error={hasError} fullWidth margin="normal" variant="outlined">
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Box className={classes.box}>
            <IconButton
              onClick={() =>
                setValue(name, getQuantity() > 0 ? getQuantity() - 1 : 1)
              }
            >
              <RemoveCircleOutline />
            </IconButton>

            <OutlinedInput
              {...field}
              id={name}
              type="number"
              disabled={disabled}
            />

            <IconButton
              onClick={() =>
                setValue(name, getQuantity() > 0 ? getQuantity() + 1 : 1)
              }
            >
              <AddCircleOutline />
            </IconButton>
          </Box>
        )}
      />

      <FormHelperText>{formState.errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default QuantityField;
