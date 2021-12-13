import { ErrorMessage } from '@hookform/error-message';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  error: {
    fontSize: 12,
    color: '#F44336',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',

    margin: theme.spacing(1, 1.75, 0),
  },

  slide: {
    width: '60%',
    maxWidth: 200,
    height: 150,
    objectFit: 'cover',
  },
}));

function UploadField({ form, name, value, imageSource }) {
  const classes = useStyles();
  const {
    formState: { errors },
    register,
  } = form;
  const imagePlaceholder = 'https://via.placeholder.com/150';
  const uploadImage = imageSource || imagePlaceholder;
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (value && value[0]) {
      setImage(URL.createObjectURL(value[0]));
      return;
    }
    setImage(null);
  }, [value]);

  return (
    <Box>
      <Box>
        <img className={classes.slide} src={image || uploadImage} alt={name} />
      </Box>
      <input {...register(name)} accept="image/*" type="file" name={name} />
      <ErrorMessage
        errors={errors}
        name={name}
        as="p"
        className={classes.error}
      />
    </Box>
  );
}

UploadField.propTypes = {
  value: PropTypes.any,
  imageSource: PropTypes.string,
  name: PropTypes.string,

  form: PropTypes.object.isRequired,
};

export default UploadField;
