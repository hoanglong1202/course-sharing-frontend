import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import BlankCanvasIllustration from 'assets/images/blank_canvas.svg';
import InputField from 'components/form-control/InputField';
import SelectField from 'components/form-control/SelectField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useStyles from '../../../styles';
import { validateFacebookUrl, validateYouTubeUrl } from 'utils';

UpdateLessonForm.propTypes = {
  lesson: PropTypes.object,
  onFormSubmit: PropTypes.func,
  lessonTypes: PropTypes.array,
};

function UpdateLessonForm({ lessonTypes, lesson, onFormSubmit }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    lesson_name: yup
      .string()
      .required("Cần có tên bài học!"),
    description: yup
      .string()
      .required("Cần có miêu tả bài học."),
    lesson_types_id: yup
      .string()
      .required("Cần chọn loại bài học."),
    content: yup
      .string()
      .required('Cần có nội dung bài học.')
      .test('ValidURL', 'Cần nhập đúng định dạng URL', (value) => {
        const type = parseInt(form.getValues('lesson_types_id'));
        if (value && type === 1) {
          const temp = validateYouTubeUrl(value.trim());
  
          return !(temp === '');
        }

        if (value && type === 2) {
          const temp = validateFacebookUrl(value.trim());
  
          return !(temp === '');
        }
        return true;
      }),
  });

  const form = useForm({
    defaultValues: {
      lesson_name: lesson?.lesson_name,
      description: lesson?.description,
      content: lesson?.content,
      lesson_types_id: lesson?.types,
    },
    resolver: yupResolver(schema),
  });

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
              src={BlankCanvasIllustration}
              alt="Blank Canvas Illustration"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            <Typography className={classes.title}>
              Cập nhập thông tin bài học
            </Typography>
            <Typography className={classes.description}>
              Đây là nơi cập nhập thông tin bài học của bạn. Bạn có thể xem chi tiết hoặc thay đổi thông tin bài học ở đây.
            </Typography>
            <InputField form={form} name="lesson_name" label="Tên khóa học" />
            <InputField form={form} name="description" label="Miêu tả" />
            <Box className={classes.lessonField}>
              <SelectField
                form={form}
                name="lesson_types_id"
                label="Danh mục"
                values={lessonTypes}
                disable={false}
              />
            </Box>
            <InputField form={form} name="content" label="Link" />

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
              <Button onClick={() => navigate(-1)} variant="outlined">Quay lại</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdateLessonForm;
