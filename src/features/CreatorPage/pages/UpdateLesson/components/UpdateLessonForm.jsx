import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import BlankCanvasIllustration from 'assets/images/blank_canvas.svg';
import InputField from 'components/form-control/InputField';
import SelectField from 'components/form-control/SelectField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import { yupResolver } from '@hookform/resolvers/yup';
import useStyles from '../../../styles';

UpdateLessonForm.propTypes = {
  lesson: PropTypes.object,
  onFormSubmit: PropTypes.func,
  lessonTypes: PropTypes.array,
};

function UpdateLessonForm({ lessonTypes, lesson, onFormSubmit }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      lesson_name: lesson?.lesson_name,
      description: lesson?.description,
      content: lesson?.content,
      lesson_types_id: lesson?.types,
    },
    // resolver: yupResolver(schema),
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              possimus architecto sed ab
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
            >
              Cập nhập
            </Button>

            <Box mt={2}>
              <Button onClick={() => navigate(-1)} variant="outlined">Back</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdateLessonForm;
