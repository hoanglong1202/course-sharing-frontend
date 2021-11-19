import React from 'react';
import DesignIllustration from 'assets/images/design-illustration-2.svg';
import UDN from 'assets/images/UDN.jpg';
import UTE from 'assets/images/UTE.png';
import { Box } from '@mui/system';
import { Card, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import CourseCard from './components/CourseCard';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(12),
  },

  titleBox: {
    paddingRight: theme.spacing(1),

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },

  image: {
    width: '100%',
  },

  title: {
    fontSize: theme.spacing(6),
    fontWeight: 600,
    color: theme.palette.tertiary.main,

    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },

  strong: {
    color: theme.palette.primary.main,
  },

  description: {
    fontSize: theme.spacing(2.2),
    margin: theme.spacing(4, 0),
    color: theme.palette.tertiary.second,

    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },

  logo: {
    maxWidth: 50,
    maxHeight: 50,
    marginRight: theme.spacing(1),
    opacity: 0.5,
  },

  customerContainer: {
    [theme.breakpoints.up('md')]: {
      marginTop: '5rem',
    },

    [theme.breakpoints.down('md')]: {
      marginTop: `0 !important`,
    },
  },

  customerTitle: {
    color: theme.palette.tertiary.third,
    fontWeight: 600,
    textTransform: 'uppercase',
    fontSize: theme.spacing(1.5),
  },

  logoContainer: {
    marginTop: theme.spacing(2),
  },

  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  features: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: `0.2em`,
    marginBottom: theme.spacing(2),
  },

  sectionDescription: {
    maxWidth: '576px',
    marginTop: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.tertiary.third,
  },

  courseContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function MainPage(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container spacing={0} pb={'96px'}>
        <Grid item xs={12} md={5}>
          <Box className={classes.titleBox}>
            <Typography className={classes.title}>
              Lorem, ipsum dolor sit amet {` `}
              <span className={clsx(classes.title, classes.strong)}>
                MEO MEO
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
      </Box>

      <Box mt={5}>
        <Grid container spacing={3} className={classes.courseContainer}>
          {[...Array(6)].map((x) => (
            <Grid item>
              <CourseCard />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default MainPage;
