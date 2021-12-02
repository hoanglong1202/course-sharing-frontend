import * as React from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import Test from 'assets/images/test.jpg';
import phongcanh3 from 'assets/images/phongcanh3.jpeg';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    borderRadius: '2.5rem 0 2.5rem 0',
  },

  titleContainer: {
    display: 'flex',
    alignItems: 'center',

    marginBottom: `0.35em`,

    fontSize: `1.5rem`,
    fontWeight: 700,
    color: theme.palette.tertiary.second,
  },

  cardContent: {
    padding: theme.spacing(3, 5),
    height: 120,

    overflow: `hidden`,
    textOverflow: `ellipsis`,
  },

  iconHolder: {
    display: 'flex',
    alignItems: 'center',

    marginBottom: 0,
  },

  score: {
    marginLeft: `0.5rem`,
    fontWeight: 700,
  },

  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    transitionDuration: `200ms`,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(3, 4),
    cursor: 'pointer',

    fontSize: '1.125rem',
    color: '#fff',
    fontWeight: 600,
    letterSpacing: `0.1em`,

    '&:hover': {
      backgroundColor: theme.palette.primary.hover,
    },
  },

  buttonTitle: {},

  title: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 1,
    textOverflow: `ellipsis`,
    overflow: 'hidden',

  },

  description: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 3,
    textOverflow: `ellipsis`,
    overflow: 'hidden',

  },
}));

CourseCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default function CourseCard({ item }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/course/${item.id}`);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        height="250"
        image={phongcanh3}
        alt="green iguana"
      />
      <CardContent className={classes.cardContent}>
        <Box className={classes.titleContainer}>
          <Typography
            mb={0}
            className={classes.title}
            gutterBottom
            variant="h5"
            component="div"
          >
            {item?.course_name}
          </Typography>
        </Box>

        <Grid container>
          <Grid item xs={4}>
            <Box className={classes.iconHolder}>
              <StarIcon style={{ color: '#ffbc00' }} />
              <span className={classes.score}>4.5</span>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box className={classes.iconHolder}>
              <FavoriteIcon style={{ color: 'rgb(255 76 106)' }} />
              <span className={classes.score}>{item?.favourited}</span>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box className={classes.iconHolder}>
              <RemoveRedEyeIcon style={{ color: '#4A5568' }} />
              <span className={classes.score}>{item?.viewed}</span>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body2" component="div" mt={1} className={classes.description}>
          {item?.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.buttonContainer} onClick={handleNavigate}>
        <div className={classes.buttonTitle}>Học ngay</div>
      </CardActions>
    </Card>
  );
}
