import {
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import clsx from 'clsx';
import InputField from 'components/form-control/InputField';
import SelectField from 'components/form-control/SelectField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import useStyles from '../../../styles';
import QuantityField from 'components/form-control/QuantityField';
import UploadField from 'components/form-control/UploadField';
import OpinionIllustration from 'assets/images/opinion.svg';
import BookmarkIllustration from 'assets/images/bookmark.svg';
import PublishIllustration from 'assets/images/publish.svg';
import CaculatorIllustration from 'assets/images/caculator.svg';
import SuccessIllustration from 'assets/images/success.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SUPPORTED_FORMATS } from 'constants/common';
import InputFieldArray from 'components/form-control/InputFieldArray';
import SelectFieldArray from 'components/form-control/SelectFieldArray';

const schema = yup.object().shape({
  course_name: yup.string().required('Cần có tên khóa học!'),
  description: yup.string().required('Cần có miêu tả khóa học.'),
  max_user: yup.number(),
  types_id: yup.string().required('Cần chọn danh mục khóa học.'),
  profile_picture: yup
    .mixed()
    .test(
      'fileType',
      'Chỉ chấp nhập file image',
      (value) => value && value[0] && SUPPORTED_FORMATS.includes(value[0].type)
    ),
  lesson: yup
    .array(
      yup.object({
        lesson_name: yup.string().required('Cần có tên bài học'),
        description: yup.string().required('Cần có miêu tả bài học.'),
        content: yup.string().required('Cần có nội dung bài học.'),
        lesson_types_id: yup.string().required('Cần loại bài học.'),
      })
    )
    .min(1, 'Cần có ít nhất 1 bài học.'),
});

AddCourseForm.propTypes = {
  types: PropTypes.array,
  courseTypes: PropTypes.array,
  onFormSubmit: PropTypes.func,
};

const steps = [
  'Thêm nội dung khóa học',
  'Thêm nội dung bài học',
  'Kiểm tra thông tin',
];

function AddCourseForm({ courseTypes, types, onFormSubmit }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const form = useForm({
    defaultValues: {
      course_name: '',
      description: '',
      max_user: 0,
      profile_picture: null,
      types_id: '',
      lesson: [
        { lesson_name: '', description: '', content: '', lesson_types_id: '' },
      ],
    },
    resolver: yupResolver(schema),
  });
  const formCoverImageValue = form.watch('profile_picture');

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lesson',
  });

  const onSubmit = async (values) => {
    if (onFormSubmit) {
      await onFormSubmit(values);
    }

    console.log(JSON.stringify(form))
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
      <Box className={classes.stepperContainer}>
        <Box className={classes.stepperHolder}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Box>

      {activeStep === 0 && (
        <Grid container spacing={3} className={classes.firstStepContainer}>
          <Grid item xs={12} md={7}>
            <Box className={classes.imageHolder}>
              <img
                className={classes.image}
                src={OpinionIllustration}
                alt="OpinionIllustration"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box>
              <Typography className={classes.title}>
                Tạo thông tin khóa học
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
            </Box>
          </Grid>
        </Grid>
      )}

      {activeStep === 1 && (
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
              Thêm bài học của bạn
            </Typography>
            <Typography className={classes.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              possimus architecto sed ab
            </Typography>
            {fields.map((field, index) => (
              <Box key={field.id} className={classes.lessonFieldContainer}>
                <Box className={classes.lessonField}>
                  <InputFieldArray
                    form={form}
                    name={`lesson.${index}.lesson_name`}
                    label="Tên bài học"
                    arrIndex={index}
                    subName="lesson_name"
                  />
                </Box>

                <Box
                  className={clsx(classes.lessonField, classes.contentField)}
                >
                  <InputFieldArray
                    form={form}
                    name={`lesson.${index}.description`}
                    label="Miêu tả"
                    arrIndex={index}
                    subName="description"
                  />
                </Box>

                <Box
                  className={clsx(classes.lessonField, classes.contentField)}
                >
                  <InputFieldArray
                    form={form}
                    name={`lesson.${index}.content`}
                    label="Nội dung"
                    arrIndex={index}
                    subName="content"
                  />
                </Box>

                <Box className={classes.lessonField}>
                  <SelectFieldArray
                    form={form}
                    name={`lesson.${index}.lesson_types_id`}
                    label="Loại nội dung"
                    values={types}
                    disable={false}
                    arrIndex={index}
                    subName="lesson_types_id"
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
      )}

      {activeStep === steps.length - 1 && (
        <Grid container spacing={3} className={classes.firstStepContainer}>
          <Grid item xs={12} md={5}>
            <Typography className={classes.title}>
              Kiểm tra thông tin khóa học
            </Typography>
            <Typography className={classes.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              possimus architecto sed ab
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={6}>
                Tên khóa học
              </Grid>
              <Grid item xs={12} sm={6}>
                {values?.course_name}
              </Grid>

              <Grid item xs={12} sm={6}>
                Miêu tả
              </Grid>
              <Grid item xs={12} sm={6}>
                {values?.description}
              </Grid>

              <Grid item xs={12} sm={6}>
                Giới hạn người dùng
              </Grid>
              <Grid item xs={12} sm={6}>
                {values?.max_user === 0
                  ? 'Không giới hạn'
                  : `${parseInt(values.max_user)} người dùng`}
              </Grid>

              <Grid item xs={12} sm={6}>
                Số lượng bài học
              </Grid>
              <Grid item xs={12} sm={6}>
                {values?.lesson?.length}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box className={classes.imageHolder}>
              <img
                className={classes.image}
                src={BookmarkIllustration}
                alt="Bookmark Illustration"
              />
            </Box>
          </Grid>
        </Grid>
      )}

      {activeStep === steps.length ? (
        <>
          <Typography className={classes.title}>
            All steps completed - you&apos;re finished
          </Typography>
          <Typography className={classes.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            possimus architecto sed ab
          </Typography>
          <Box className={classes.imageHolder}>
            <img
              className={classes.imageSubmit}
              src={SuccessIllustration}
              alt="SuccessIllustration"
            />
          </Box>
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
