import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import React from 'react';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  commentContainer: {
    maxWidth: '100%',
    marginTop: theme.spacing(2),
  },

  commentTitle: {
    padding: theme.spacing(1, 2),
  },

  ratingContainer: {
    marginTop: 0,
    padding: theme.spacing(0.5, 2),

    display: 'flex',
    alignItems: 'center',
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

      <Box className={classes.ratingContainer}>
        <Typography className={classes.ratingTitle}>Đánh giá:</Typography>
        <Rating name="read-only" value={item.point} precision={0.5} readOnly />
      </Box>

      <CardContent className={classes.commentTitle}>
        <Typography variant="body2" color="text.secondary">
          {item.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Comment;
