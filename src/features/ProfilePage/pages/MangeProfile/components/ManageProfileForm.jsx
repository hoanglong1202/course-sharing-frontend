import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Grid, Typography
} from '@mui/material';
import { Box } from '@mui/system';
import CaculatorIllustration from 'assets/images/caculator.svg';
import PublishIllustration from 'assets/images/publish.svg';
import clsx from 'clsx';
import { SUPPORTED_FORMATS } from 'constants/common';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useStyles from '../../../styles';

const schema = yup.object().shape({
  course_name: yup.string().required('Cần có tên khóa học!'),
  description: yup.string().required('Cần có miêu tả khóa học.'),
  profile_picture: yup
    .mixed()
    .test(
      'fileType',
      'Chỉ chấp nhập file image',
      (value) => value && value[0] && SUPPORTED_FORMATS.includes(value[0].type)
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
      course_name: '',
      description: '',
      profile_picture: null,
    },
    resolver: yupResolver(schema),
  });
  // const formCoverImageValue = form.watch('profile_picture');

  const onSubmit = async (values) => {
    if (onFormSubmit) {
      await onFormSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
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

        <Grid item xs={8}>
          <Typography className={classes.title}>
            Trang cá nhân
          </Typography>
          <Typography className={classes.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            possimus architecto sed ab
          </Typography>

          {JSON.stringify(profile)}
        </Grid>

        <Grid item xs={2}>
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

      <>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button color="inherit" sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          <Button>hi</Button>
        </Box>
      </>
    </form>
  );
}

export default ManageProfileForm;
