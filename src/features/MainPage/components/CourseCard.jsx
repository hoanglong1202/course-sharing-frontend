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
    height: '150px',

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

    buttonTitle: {
      fontSize: '125rem',
      letterSpacing: `0.1em`,
      color: '#fff',
      fontWeight: 600,
    },
  },
}));

export default function CourseCard() {
  const classes = useStyles();
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
          <Typography mb={0} gutterBottom variant="h5" component="div">
            Lizard
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
              <span className={classes.score}>45</span>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box className={classes.iconHolder}>
              <RemoveRedEyeIcon style={{ color: '#4A5568' }} />
              <span className={classes.score}>55</span>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          component="div"
          mt={1}
        >
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions className={classes.buttonContainer}>
        <div className={classes.buttonTitle}>Learn More</div>
      </CardActions>
    </Card>
  );
}
