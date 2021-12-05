import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import clsx from 'clsx';
import InputField from 'components/form-control/InputField';
import SelectField from 'components/form-control/SelectField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useStyles from '../styles';
import QuantityField from 'components/form-control/QuantityField';
import UploadField from 'components/form-control/UploadField';

AddCourseForm.propTypes = {
  types: PropTypes.array,
  onFormSubmit: PropTypes.func,
};
const steps = [
  'Thêm nội dung khóa học',
  'Thêm nội dung bài học',
  'Kiểm tra thông tin',
];

function AddCourseForm({ types, onFormSubmit }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const form = useForm({
    defaultValues: {
      course_name: '',
      description: '',
      max_user: 0,
      // cover_picture: '',
      cover_picture: null,
      lesson: [
        { lesson_name: '', description: '', content: '', lesson_types_id: 1 },
      ],
    },
    // resolver: yupResolver(schema),
  });
  const formCoverImageValue = form.watch('cover_picture');

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lesson',
  });

  const onSubmit = async (values) => {
    if (onFormSubmit) {
      await onFormSubmit(values);
    }
  };

  const addLessonField = () => {
    append({
      lesson_name: '',
      description: '',
      content: '',
      lesson_types_id: '',
    });
  };

  const handleNextStep = () => {
    if (steps.length + 1 !== activeStep + 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const values = form.getValues();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === 0 && (
        <Box>
          <InputField form={form} name="course_name" label="Tên khóa học" />
          <InputField form={form} name="description" label="Miêu tả" />
          <QuantityField
            form={form}
            name="max_user"
            label="Giới hạn người dùng (optional)"
          />

          <UploadField form={form} name="cover_picture" value={formCoverImageValue} />
        </Box>
      )}

      {activeStep === 1 && (
        <>
          {fields.map((field, index) => (
            <Box key={field.id} className={classes.lessonFieldContainer}>
              <Box className={classes.lessonField}>
                <InputField
                  form={form}
                  name={`lesson.${index}.lesson_name`}
                  label="Tên bài học"
                />
              </Box>

              <Box className={clsx(classes.lessonField, classes.contentField)}>
                <InputField
                  form={form}
                  name={`lesson.${index}.description`}
                  label="Miêu tả"
                />
              </Box>

              <Box className={clsx(classes.lessonField, classes.contentField)}>
                <InputField
                  form={form}
                  name={`lesson.${index}.content`}
                  label="Nội dung"
                />
              </Box>

              <Box className={classes.lessonField}>
                <SelectField
                  form={form}
                  name={`lesson.${index}.lesson_types_id`}
                  label="Loại nội dung"
                  values={types}
                  disable={false}
                />
              </Box>

              <Box display="flex" alignItems="center">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
          <Button variant="outlined" onClick={addLessonField}>
            Add Lesson
          </Button>
        </>
      )}

      {activeStep === steps.length - 1 && (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Kiểm tra thông tin
            {JSON.stringify(values)}

          </Typography>
        </>
      )}

      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBackStep}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Box>
              <Button
                variant="outlined"
                disabled={activeStep !== steps.length}
                type="submit"
              >
                SUBMIT
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBackStep}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNextStep}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </form>
  );
}

export default AddCourseForm;
