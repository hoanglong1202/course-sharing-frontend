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

UpdateCreatorForm.propTypes = {
  creator: PropTypes.object,
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
  cover_picture: yup
    .mixed()
    .nullable()
    .notRequired()
    .test(
      'fileType',
      'Chỉ chấp nhập file image',
      (value) => {
        if (value && value[0]) {
          return SUPPORTED_FORMATS.includes(value[0].type);
        }
  
        return true;
      }
    ),
});


function UpdateCreatorForm({ creator, onFormSubmit }) {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      creator_id: creator?.id,
      email: creator?.email,
      username: creator?.username,
      description: creator?.description,
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
              Cập nhập thông tin người chia sẻ
            </Typography>
            <Typography className={classes.description}>
              Đây là xem chi tiết hoặc bạn có thể cập nhập thông tin người chia sẻ ở đây.
            </Typography>
            <InputField form={form} name="email" label="Email" />
            <InputField form={form} name="username" label="Tên người dùng" />
            <InputField form={form} name="description" label="Miêu tả" />

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
              disabled={!form.formState.isDirty}
            >
              Cập nhập
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdateCreatorForm;
