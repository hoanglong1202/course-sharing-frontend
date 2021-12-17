import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  commentContainer: {
    maxWidth: '100%',
    marginTop: theme.spacing(2),
  },

  commentTitle: {
    padding: theme.spacing(1, 2),
  },
}));

Comment.propTypes = {
  item: PropTypes.object,
};

function Comment({ item }) {
  const classes = useStyles();
  return (
    <Card className={classes.commentContainer}>
      <CardHeader
        className={classes.commentTitle}
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {item.username.slice(0, 1)}
          </Avatar>
        }
        title={item.username}
        subheader={moment(item.timestamp).format('DD-MM-YYYY')}
      />
      <CardContent className={classes.commentTitle}>
      <Typography variant="body2" color="text.secondary">
          {item.isCreator === 'true' && <b>Tác giả</b>}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Comment;
