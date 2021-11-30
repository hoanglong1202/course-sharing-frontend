import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import useStyles from './styles';
import {
  Avatar,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import Test from 'assets/images/test.jpg';
import clsx from 'clsx';
import Comments from './components/Comments';

LessonDetail.propTypes = {};

function LessonDetail(props) {
  const classes = useStyles();
  let { courseId, lessonId } = useParams();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box>
      <Box className={classes.titleBackground} />
      <Box className={classes.titleContainer}>
        <Grid container>
          <Grid item xs={12} md={9}>
            <iframe
              className={classes.mediaContainer}
              // src="https://drive.google.com/file/d/0BxxqCeuD1il5T2tmRF9ST19aRG8/preview?resourcekey=0-TTFP8JW_feWeGiAyEb3nRw"
              src="https://www.youtube.com/embed/w-_sOmdyI_I"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Box className={classes.chapterContainer}>
              <List component="nav" aria-label="secondary mailbox folder">
                {[...Array(20)].map((item, index) => (
                  <ListItemButton
                    className={clsx(
                      classes.chapterButton,
                      selectedIndex === index && classes.chapterButtonActive
                    )}
                    selected={selectedIndex === index}
                    key={index}
                    onClick={(event) => handleListItemClick(event, index)}
                  >
                    <Typography
                      className={clsx(
                        classes.chapterTitle,
                        selectedIndex === index && classes.chapterTitleActive
                      )}
                    >
                      Accel pzo
                    </Typography>
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
        <Typography className={classes.courseTitle} variant="h1">
          This is Lesson Detail of {lessonId} in course {courseId}
        </Typography>
      </Box>

      <Box className={classes.authorContainer}>
        <Avatar className={classes.authorAvatar} alt="Remy Sharp" src={Test} />
        <Box className={classes.authorHolder}>
          <Typography
            className={clsx(classes.authorDescription, classes.authorTitle)}
          >
            Easy Frontend
          </Typography>
          <Typography className={classes.authorDescription}>
            Senior tại NCC Soft
          </Typography>
        </Box>
      </Box>

      <Comments />
    </Box>
  );
}

export default LessonDetail;
