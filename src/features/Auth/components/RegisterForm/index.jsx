import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  LinearProgress,
  Typography,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import CodeIcon from "@mui/icons-material/Code";
import InputField from "components/form-control/InputField";
import PasswordField from "components/form-control/PasswordField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(4),
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 4, 0),
    textAlign: "center",
  },
  submit: {
    margin: '24px 0 16px 0',
  },
  progress: {
    position: "absolute",
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required("Please enter your name!")
      .test(
        "fullNameValidate",
        "Your name should have at least two words.",
        (value) => {
          return value.split(" ").length >= 2;
        }
      ),
    email: yup
      .string()
      .required("Please enter your email address.")
      .email("Please enter valid email address."),
    password: yup
      .string()
      .required("Please enter your password.")
      .min(6, "Your password need at least 6 characters."),
    retypePassword: yup
      .string()
      .required("Please retype your password.")
      .oneOf([yup.ref("password")], "Password does not match."),
  });

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (values) => {
    const { onSubmit } = props;

    if (onSubmit) {
      await onSubmit(values);
    }

  };

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Avatar className={classes.avatar}>
          <CodeIcon />
        </Avatar>

        <Typography component="h3" variant="h5" className={classes.title}>
          Tạo tài khoản
        </Typography>

        <InputField form={form} name="fullName" label="Full Name" />
        <InputField form={form} name="email" label="Email" />
        <PasswordField form={form} name="password" label="Password" />
        <PasswordField
          form={form}
          name="retypePassword"
          label="Retype Password"
        />

        <Button
          className={classes.submit}
          disabled={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
        >
          Đăng ký
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
