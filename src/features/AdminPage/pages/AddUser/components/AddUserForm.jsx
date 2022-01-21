import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ConversationIllustration from 'assets/images/conversation.svg';
import InputField from 'components/form-control/InputField';
import PasswordField from 'components/form-control/PasswordField';
import UploadField from 'components/form-control/UploadField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import useStyles from '../../../styles';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SUPPORTED_FORMATS } from 'constants/common';

AddUserForm.propTypes = {
  onFormSubmit: PropTypes.func,
};

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Cần có tên người dùng!")
    .test(
      "usernameValidate",
      "Tên người dùng cần ít nhất 2 chữ.",
      (value) => {
        return value.split(" ").length >= 2;
      }
    ),
  email: yup
    .string()
    .required("Cần có email người dùng")
    .email("Hãy nhập email hợp lệ."),
  password: yup
    .string()
    .required("Hãy nhập mật khẩu.")
    .min(6, "Your password need at least 6 characters."),
  cover_picture: yup
    .mixed()
    .required('Cần thêm ảnh đại diện')
    .test('fileType', 'Chỉ chấp nhập file image', (value) => value && value[0] && SUPPORTED_FORMATS.includes(value[0].type)),
});

function AddUserForm({ onFormSubmit }) {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      cover_picture: null,
    },
    resolver: yupResolver(schema),
  });
  const formCoverImageValue = form.watch('cover_picture');

  const onSubmit = async (values) => {
    if (onFormSubmit) {
      await onFormSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Grid container spacing={3} className={classes.firstStepContainer}>
        <Grid item xs={12} md={7}>
          <Box className={classes.imageHolder}>
            <img
              style={{ width: '75%' }}
              className={classes.image}
              src={ConversationIllustration}
              alt="ConversationIllustration"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            <Typography className={classes.title}>
              Thêm user
            </Typography>
            <Typography className={classes.description}>
              Đây là trang thêm tài khoản mới với những thông tin của người dùng.
            </Typography>
            <InputField form={form} name="email" label="Email" />
            <InputField form={form} name="username" label="Tên người dùng" />
            <PasswordField form={form} name="password" label="Mật khẩu" />

            <Box mb={2}>
              <Box>
                <Typography className={classes.uploadLabel}>
                  Ảnh đại diện
                </Typography>
              </Box>
              <UploadField
                form={form}
                name="cover_picture"
                value={formCoverImageValue}
              />
            </Box>

            <Button
              className={classes.updateButton}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddUserForm;
