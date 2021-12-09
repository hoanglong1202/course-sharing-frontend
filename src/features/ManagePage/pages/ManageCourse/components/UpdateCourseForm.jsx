import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ConversationIllustration from 'assets/images/conversation.svg';
import InputField from 'components/form-control/InputField';
import QuantityField from 'components/form-control/QuantityField';
import UploadField from 'components/form-control/UploadField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import useStyles from '../styles';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectField from 'components/form-control/SelectField';

UpdateCourseForm.propTypes = {
  course: PropTypes.object,
  onFormSubmit: PropTypes.func,
  courseTypes: PropTypes.array,
};

function UpdateCourseForm({ courseTypes, course, onFormSubmit }) {
  const classes = useStyles();
  console.log(course.course_name);
  const temp = course.course_name;
  const form = useForm({
    defaultValues: {
      course_name: temp,
      description: course?.description,
      max_user: course?.max_user || 0,
      // profile_picture: '',
      types_id: course?.types_id,
      profile_picture: course?.profile_picture,
    },
    // resolver: yupResolver(schema),
  });
  const formCoverImageValue = form.watch('profile_picture');

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
              Cập nhập thông tin khóa học
            </Typography>
            <Typography className={classes.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              possimus architecto sed ab
            </Typography>
            <InputField form={form} name="course_name" label="Tên khóa học" />
            <InputField form={form} name="description" label="Miêu tả" />
            <Grid container>
              <Grid item xs={12} sm={6}>
                <QuantityField
                  form={form}
                  name="max_user"
                  label="Giới hạn người dùng (optional)"
                />
                <Box className={classes.lessonField}>
                  <SelectField
                    form={form}
                    name="types_id"
                    label="Danh mục"
                    values={courseTypes}
                    disable={false}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography className={classes.uploadLabel}>
                    Ảnh đại diện
                  </Typography>
                </Box>
                <UploadField
                  form={form}
                  name="profile_picture"
                  value={formCoverImageValue}
                />
              </Grid>
            </Grid>

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

export default UpdateCourseForm;
