import { Button, Grid, Typography } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box } from '@mui/system';
import AdvancedCustomization from 'assets/images/advanced_customization.svg';
import InputField from 'components/form-control/InputField';
import PasswordField from 'components/form-control/PasswordField';
import UploadField from 'components/form-control/UploadField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import useStyles from '../../../styles';
import { SUPPORTED_FORMATS } from 'constants/common';
import { useNavigate } from 'react-router-dom';

AddCreatorForm.propTypes = {
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
  description: yup
    .string()
    .required("Cần có miêu tả người dùng."),
  password: yup
    .string()
    .required("Hãy nhập mật khẩu.")
    .min(6, "Your password need at least 6 characters."),
  cover_picture: yup
    .mixed()
    .required('Cần thêm ảnh đại diện')
    .test('fileType', 'Chỉ chấp nhập file image', (value) => value && value[0] && SUPPORTED_FORMATS.includes(value[0].type)),
});

function AddCreatorForm({ onFormSubmit }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
      username: '',
      description: '',
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
              src={AdvancedCustomization}
              alt="Advanced Customization"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            <Typography className={classes.title}>
              Thêm người chia sẻ
            </Typography>
            <Typography className={classes.description}>
              Đây là trang thêm mới với các thông tin của người chia sẻ ở đây.
            </Typography>
            <InputField form={form} name="email" label="Email" />
            <InputField form={form} name="username" label="Tên người dùng" />
            <InputField form={form} name="description" label="Miêu tả" />
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
            <Box mt={2}>
              <Button onClick={() => navigate(-1)} variant="outlined">Quay lại</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddCreatorForm;
