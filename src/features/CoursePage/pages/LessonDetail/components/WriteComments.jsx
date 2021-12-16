import {
  TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { openDialog } from 'features/Auth/authSlice';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
}));

WriteComments.propTypes = {
  onSubmit: PropTypes.func,
};

function WriteComments({ onSubmit }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const { current: currentUser } = useSelector((state) => state.auth);
  const auth = currentUser.id ? true : false;

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    if (!auth) {
      dispatch(openDialog());
    }

    if (onSubmit && currentUser.role === 'user') {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.commentBox}>
        <TextField
          placeholder="What are your thoughts?"
          fullWidth
          multiline
          rows={3}
          value={content}
          onChange={handleChange}
        />
        <Box className={classes.panel}>
          {auth && (
            <Box className={classes.commentAs}>
              Comment as&nbsp;
              <span className={classes.username}>{currentUser.username}</span>
            </Box>
          )}

          <button onClick={handleSubmit} className={classes.button}>
            COMMENT
          </button>
        </Box>
      </Box>
    </Box>
  );
}

export default WriteComments;
