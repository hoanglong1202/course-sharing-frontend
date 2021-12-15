import { StarBorder } from '@mui/icons-material';
import { Rating, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openDialog } from 'features/Auth/authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid #ddd',
    borderRadius: 15,

    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },

  commentContent: {
    paddingTop: theme.spacing(1),
  },

  commentBox: {
    borderRadius: 8,
    border: `solid 1px #3d4953`,
    overflow: `hidden`,

    marginBottom: theme.spacing(2),
  },

  panel: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1c1d1f',
    padding: theme.spacing(1),
  },

  button: {
    fontSize: 14,
    marginLeft: 'auto',
  },

  commentAs: {
    fontSize: 14,
    color: '#cccccc',
    marginRight: theme.spacing(1),
  },

  username: {
    display: 'inline-block',
    color: '#4f9eed',
  },

  ratingContainer: {
    marginTop: 0,
    padding: theme.spacing(0.5, 2),

    display: 'flex',
    alignItems: 'center',
  },

  ratingTitle: {
    color: '#fff',
    fontWeight: 600,
    marginRight: theme.spacing(0.5),
  },

  customTextField: {
    borderColor: '#f0f !important',
  },
}));

WriteComments.propTypes = {
  onSubmit: PropTypes.func,
};

function WriteComments({ onSubmit }) {
  const classes = useStyles();
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const [point, setPoint] = React.useState(2);

  const { current: currentUser } = useSelector((state) => state.auth);

  const auth = currentUser.id ? true : false;

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handlePointChange = (event, newValue) => {
    setPoint(newValue);
  };

  const handleSubmit = () => {
    if (!auth) {
      dispatch(openDialog());
    }

    if (onSubmit && currentUser.role === 'user') {
      onSubmit({
        content,
        point,
      });
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.commentBox}>
        <TextField
          className={classes.customTextField}
          placeholder="What are your thoughts?"
          fullWidth
          multiline
          rows={3}
          value={content}
          onChange={handleChange}
        />

        <Box className={classes.panel}>
          <Box className={classes.ratingContainer}>
            <Typography className={classes.ratingTitle}>Đánh giá:</Typography>
            <Rating
              emptyIcon={<StarBorder fontSize="inherit" color="info" />}
              name="rating"
              value={point}
              precision={0.5}
              onChange={handlePointChange}
            />
          </Box>
          {auth && (
            <Box className={classes.commentAs}>
              Comment as <span className={classes.username}>{currentUser.username}</span>
            </Box>
          )}
          <button
            className={classes.button}
            onClick={handleSubmit}
            disabled={
              currentUser.role === 'creator' || currentUser.role === 'admin'
            }
          >
            COMMENT
          </button>
        </Box>
      </Box>
    </Box>
  );
}

export default WriteComments;
