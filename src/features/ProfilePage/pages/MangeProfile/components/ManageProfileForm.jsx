import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CaculatorIllustration from 'assets/images/caculator.svg';
import PublishIllustration from 'assets/images/publish.svg';
import clsx from 'clsx';
import Can from 'components/Can';
import InputField from 'components/form-control/InputField';
import UploadField from 'components/form-control/UploadField';
import { SUPPORTED_FORMATS } from 'constants/common';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useStyles from '../../../styles';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Cần có tên người dùng!')
    .test('usernameValidate', 'Tên người dùng cần ít nhất 2 chữ.', (value) => {
      return value.split(' ').length >= 2;
    }),
  email: yup
    .string()
    .required('Cần có email người dùng')
    .email('Hãy nhập email hợp lệ.'),
  description: yup.string('Hãy nhập email hợp lệ.'),
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

ManageProfileForm.propTypes = {
  profile: PropTypes.object,
  onFormSubmit: PropTypes.func,
};

function ManageProfileForm({ profile, onFormSubmit }) {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      email: profile?.email,
      username: profile?.username,
      description: profile?.description,
      profile_picture: profile?.profile_picture,
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
    <form onSubmit={form.handleSubmit(onSubmit)} className={classes.profileForm}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box className={classes.imageHolder}>
            <img
              className={clsx(
                classes.image,
                classes.imageStepTwo,
                classes.imageStepTwoLeft
              )}
              src={CaculatorIllustration}
              alt="Caculator Illustration"
            />
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Typography className={classes.title}>Trang cá nhân</Typography>
          <Typography className={classes.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            possimus architecto sed ab
          </Typography>

          <InputField form={form} name="email" label="Email" disabled={true} />
          <InputField form={form} name="username" label="Tên người dùng" />

          <Can roles={['creator']}>
            <InputField form={form} name="description" label="Miêu tả" />
          </Can>

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
              imageSource={profile?.profile_picture}
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
        </Grid>

        <Grid item xs={3}>
          <Box className={classes.imageHolder}>
            <img
              className={clsx(
                classes.image,
                classes.imageStepTwo,
                classes.imageStepTwoRight
              )}
              src={PublishIllustration}
              alt="Publish Illustration"
            />
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default ManageProfileForm;
