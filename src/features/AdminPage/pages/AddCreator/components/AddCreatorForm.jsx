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

AddCreatorForm.propTypes = {
  onFormSubmit: PropTypes.func,
};

function AddCreatorForm({ onFormSubmit }) {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      email: '',
      username: '',
      description: '',
      password: '',
      cover_picture: null,
    },
    // resolver: yupResolver(schema),
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
              Thêm creator
            </Typography>
            <Typography className={classes.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              possimus architecto sed ab
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
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddCreatorForm;
