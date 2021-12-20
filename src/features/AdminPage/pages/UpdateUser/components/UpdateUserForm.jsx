import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ConversationIllustration from 'assets/images/conversation.svg';
import InputField from 'components/form-control/InputField';
import UploadField from 'components/form-control/UploadField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import useStyles from '../../../styles';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SUPPORTED_FORMATS } from 'constants/common';

UpdateUserForm.propTypes = {
  user: PropTypes.object,
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
  cover_picture: yup
    .mixed()
    .required('Cần thêm ảnh đại diện')
    .test('fileType', 'Chỉ chấp nhập file image', (value) => value && value[0] && SUPPORTED_FORMATS.includes(value[0].type)),
});

function UpdateUserForm({ user, onFormSubmit }) {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      user_id: user?.id,
      email: user?.email,
      username: user?.username,
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
              Cập nhập thông tin user
            </Typography>
            <Typography className={classes.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              possimus architecto sed ab
            </Typography>
            <InputField form={form} name="email" label="Email" />
            <InputField form={form} name="username" label="Tên người dùng" />

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
              Cập nhập
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdateUserForm;
