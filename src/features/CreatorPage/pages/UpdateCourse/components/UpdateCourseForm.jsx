import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ConversationIllustration from 'assets/images/conversation.svg';
import InputField from 'components/form-control/InputField';
import QuantityField from 'components/form-control/QuantityField';
import UploadField from 'components/form-control/UploadField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import useStyles from '../../../styles';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SUPPORTED_FORMATS } from 'constants/common';
import SelectField from 'components/form-control/SelectField';
import { useNavigate } from 'react-router-dom';

UpdateCourseForm.propTypes = {
  course: PropTypes.object,
  onFormSubmit: PropTypes.func,
  courseTypes: PropTypes.array,
};

const schema = yup.object().shape({
  course_name: yup
    .string()
    .required("Cần có tên khóa học!"),
  description: yup
    .string()
    .required("Cần có miêu tả khóa học."),
  max_user: yup
    .number(),
  types_id: yup
    .string()
    .required("Cần chọn danh mục khóa học."),
  profile_picture: yup
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

function UpdateCourseForm({ courseTypes, course, onFormSubmit }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      course_name: course?.course_name,
      description: course?.description,
      cover_picture: course?.cover_picture,
      max_user: course?.max_user || 0,
      types_id: course?.types_id,
      profile_picture: null,
    },
    resolver: yupResolver(schema),
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
              Đây là nơi cập nhập thông tin khóa học của bạn. Bạn có thể xem chi
              tiết hoặc thay đổi thông tin khóa học ở đây.
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
                  imageSource={course?.cover_picture}
                />
              </Grid>
            </Grid>

            <Button
              className={classes.updateButton}
              variant="contained"
              type="submit"
              startIcon={
                form.formState.isSubmitting && <CircularProgress size={20} />
              }
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              Cập nhập
            </Button>

            <Box mt={2}>
              <Button onClick={() => navigate(-1)} variant="outlined">
                Quay lại
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdateCourseForm;
