import React from "react";
import { useDispatch } from "react-redux";
import RegisterForm from "../RegisterForm";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { register } from "features/Auth/authSlice";

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      delete values.retypePassword;
      const result = await dispatch(register(values));
      unwrapResult(result);

      //close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      //show Snackbar
      enqueueSnackbar("Register successful!", { variant: "success" });
    } catch (error) {
      console.log("Some errors occer: " + JSON.stringify(error));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
