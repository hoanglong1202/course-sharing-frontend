import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: 15,

    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },

  commentContainer: {
    maxWidth: '100%',
    marginTop: theme.spacing(2),
  },

  commentTitle: {
    padding: theme.spacing(1, 2),
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

Comments.propTypes = {};

function Comments(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.commentBox}>
        <TextField
          placeholder="What are your thoughts?"
          fullWidth
          multiline
          rows={3}
          // defaultValue={text}
          onChange={handleChange}
        />
        <Box className={classes.panel}>
          <Box className={classes.commentAs}>
            Comment as {' '}
            <a href="#" className={classes.username}>
              Kevin
            </a>
          </Box>
          <button className={classes.button}>COMMENT</button>
        </Box>
      </Box>

      {[...Array(4)].map((item, index) => (
        <Comment key={index} />
      ))}
    </Box>
  );
}

function Comment(props) {
  const classes = useStyles();
  return (
    <Card className={classes.commentContainer}>
      <CardHeader
        className={classes.commentTitle}
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            L
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent className={classes.commentTitle}>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Comments;
