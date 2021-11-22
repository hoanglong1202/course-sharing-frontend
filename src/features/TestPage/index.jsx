import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Breadcrumbs, Button, Grid, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import phongcanh3 from 'assets/images/phongcanh3.jpeg';

TestPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},

  titleBackground: {
    height: 350,
    backgroundColor: '#1c1d1f;',

    position: 'absolute',
    left: 0,
    right: 0,

    zIndex: -999,
  },

  itemCover: {
    padding: theme.spacing(0, 2),
  },

  titleContainer: {
    minHeight: 300,
    color: '#fff',
    padding: theme.spacing(3, 0),
  },

  icon: {
    color: '#fff',
  },

  breadcumb: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
  },

  courseTitle: {
    fontSize: 32,
    marginBottom: theme.spacing(1),
    fontWeight: 600,
  },

  courseDecription: {
    marginBottom: theme.spacing(2),
    fontSize: 19,
  },

  courseCover: {
    width: '100%',
  },
  courseLearnGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  courseLearn: {
    maxWidth: 300,
  },

  buttonContainer: {
    backgroundColor: '#fff',
    minHeight: 100,
  },
}));

function TestPage(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.titleBackground} />

      <Box className={classes.titleContainer}>
        <Grid container>
          <Grid item xs={12} md={7}>
            <Box className={classes.itemCover}>
              <Breadcrumbs
                separator={
                  <NavigateNextIcon className={classes.icon} fontSize="small" />
                }
              >
                <Link underline="hover" className={classes.breadcumb} href="/">
                  Trang chủ
                </Link>
                <Typography className={classes.breadcumb}>Khóa học</Typography>
              </Breadcrumbs>

              <Typography className={classes.courseTitle} variant="h1">
                Machine Learning A-Z™: Hands-On Python & R In Data Science
              </Typography>

              <Typography className={classes.courseDecription} variant="body2">
                Learn to create Machine Learning Algorithms in Python and R from
                two Data Science experts. Code templates included.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={5} className={classes.courseLearnGrid}>
            <Box className={classes.courseLearn}>
              <img className={classes.courseCover} src={phongcanh3} alt="tét" />
              <Box className={classes.buttonContainer}>
                <Button>Học ngay</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Typography>lolol</Typography>
    </Box>
  );
}

export default TestPage;
