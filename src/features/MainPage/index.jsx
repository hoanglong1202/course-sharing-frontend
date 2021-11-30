import React from 'react';
import DesignIllustration from 'assets/images/design-illustration-2.svg';
import UDN from 'assets/images/UDN.jpg';
import UTE from 'assets/images/UTE.png';
import { Box } from '@mui/system';
import { Card, Grid, Pagination, Typography } from '@mui/material';
import clsx from 'clsx';
import CourseCard from './components/CourseCard';
import useStyles from './styles';

function MainPage(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container spacing={0} pb={'96px'}>
        <Grid item xs={12} md={5}>
          <Box className={classes.titleBox}>
            <Typography className={classes.title}>
              Nơi chia sẻ khóa học lập trình {` `}
              <span className={clsx(classes.title, classes.strong)}>
                miễn phí
              </span>
            </Typography>
            <Typography className={classes.description}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              nisi ex nesciunt eveniet ipsam beatae quidem ratione quaerat
              aperiam voluptatem
            </Typography>

            <Box className={classes.customerContainer}>
              <Typography className={classes.customerTitle}>
                OUR TRUSTED CUSTOMER
              </Typography>
              <Box className={classes.logoContainer}>
                <img src={UDN} alt="UDN" className={classes.logo} />
                <img src={UTE} alt="UTE" className={classes.logo} />
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box>
            <img className={classes.image} src={DesignIllustration} alt="gg" />
          </Box>
        </Grid>
      </Grid>

      <Box className={classes.sectionContainer}>
        <span className={classes.features}>Most Viewed</span>
        <Typography variant="h2" className={classes.title}>
          Khóa học{' '}
          <span className={clsx(classes.title, classes.strong)}>
            xem nhiều nhất
          </span>
        </Typography>
      </Box>

      <Box mt={5} mb={10}>
        <Grid container spacing={3} className={classes.courseContainer}>
          {[...Array(3)].map((x) => (
            <Grid item>
              <CourseCard />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box className={classes.sectionContainer}>
        <span className={classes.features}>Most Favourited</span>
        <Typography variant="h2" className={classes.title}>
          Khóa học{' '}
          <span className={clsx(classes.title, classes.strong)}>
            yêu thích nhất
          </span>
        </Typography>
      </Box>

      <Box mt={5} mb={10}>
        <Grid container spacing={3} className={classes.courseContainer}>
          {[...Array(3)].map((x) => (
            <Grid item>
              <CourseCard />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* <Box className={classes.sectionContainer}>
        <span className={classes.features}>features</span>
        <Typography variant="h2" className={classes.title}>
          We have Amazing{' '}
          <span className={clsx(classes.title, classes.strong)}>Services</span>
        </Typography>
        <p className={clsx(classes.description, classes.sectionDescription)}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam nisi
          ex nesciunt eveniet ipsam beatae quidem ratione quaerat aperiam
          voluptatem
        </p>
      </Box> */}

      <Box className={classes.sectionContainer}>
        <span className={classes.features}>All courses</span>
      </Box>

      <Box mt={3} mb={2}>
        <Box mt={3}>
          <Grid container spacing={3} className={classes.courseContainer}>
            {[...Array(6)].map((x) => (
              <Grid item>
                <CourseCard />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mt={3} className={classes.pagination}>
          <Pagination count={10} color="primary" />
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage;
