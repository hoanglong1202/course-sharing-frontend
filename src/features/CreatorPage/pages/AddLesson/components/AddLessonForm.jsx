import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MyPersonalFiles from 'assets/images/my_personal_files.svg';
import InputField from 'components/form-control/InputField';
import SelectField from 'components/form-control/SelectField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useStyles from '../../../styles';
import { validateFacebookUrl, validateYouTubeUrl } from 'utils';

AddLessonForm.propTypes = {
  onFormSubmit: PropTypes.func,
  lessonTypes: PropTypes.array,
};

function AddLessonForm({ lessonTypes, lesson, onFormSubmit }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    lesson_name: yup.string().required('Cần có tên bài học!'),
    description: yup.string().required('Cần có miêu tả bài học.'),
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
    lesson_types_id: yup.string().required('Cần chọn loại bài học.'),
  });

  const form = useForm({
    defaultValues: {
      lesson_name: '',
      description: '',
      content: '',
      lesson_types_id: 1,
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
              src={MyPersonalFiles}
              alt="My Personal Files"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            <Typography className={classes.title}>Thêm bài học</Typography>
            <Typography className={classes.description}>
              Đây là nơi thêm bài bài học mới của bạn. 
              Hãy đảm bảo rằng các thông tin được nhập vào là hợp lệ và bạn phải tự chịu trách nhiệm với bài học của bản thân
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
              disabled={!form.formState.isDirty}
            >
              THÊM MỚI
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

export default AddLessonForm;
