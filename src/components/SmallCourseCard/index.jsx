import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import PhongCanh from 'assets/images/phongcanh3.jpeg';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

SmallCourseCard.propTypes = {
  item: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 300,
    overflow: 'hidden',
  },

  imgHolder: {
    width: '100%',
    maxHeight: 150,
    objectFit: 'cover',
    borderRadius: 16,
  },

  title: {
    color: '#292929',
    lineHeight: 1.8,
    fontWeight: 600,
    overflow: 'hidden',
    wordWrap: 'break-word',
    margin: 0,
    paddingLeft: theme.spacing(1),

    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 1,
  },

  description: {
    color: '#757575',
    lineHeight: 1.8,
    fontSize: 16,
    margin: 0,
    paddingLeft: theme.spacing(1),

    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 1,
    textOverflow: `ellipsis`,
    overflow: 'hidden',
  },
}));

function SmallCourseCard({ item }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const learnedPercent =
    item?.learned && item?.total
      ? Math.round((item?.learned * 100) / item?.total)
      : null;
  const learnedDate = moment(item?.timestamp).format('DD-MM-YYYY');

  const handleNavigate = () => {
    if (item.courseId && item.lessonId) {
      navigate(`/course/${item.courseId}/${item.lessonId}`);
    }
    if (item.courseId && !item.lessonId) {
      navigate(`/course/${item.courseId}`);
    }
  };

  return (
    <Box className={classes.root} onClick={handleNavigate}>
      <img className={classes.imgHolder} src={PhongCanh} alt="nana" />
      <h3 className={classes.title}>{item?.courseName}</h3>

      {learnedPercent && learnedDate && (
        <p className={classes.description}>
          Tiến độ: {learnedPercent}% · {learnedDate}
        </p>
      )}
    </Box>
  );
}

export default SmallCourseCard;
