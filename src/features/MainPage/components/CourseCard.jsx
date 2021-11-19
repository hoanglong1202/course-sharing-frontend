import * as React from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';
import Test from 'assets/images/test.jpg';
import phongcanh3 from 'assets/images/phongcanh3.jpeg';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'space-between',

    marginBottom: `0.35em`,
  },

  cardContent: {
    padding: theme.spacing(2, 4, 2, 2),
    height: '100px',

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
}));

export default function CourseCard() {
  const classes = useStyles();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={phongcanh3}
        alt="green iguana"
      />
      <CardContent className={classes.cardContent}>
        <Box className={classes.titleContainer}>
          <Typography mb={0} gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <div className={classes.iconHolder}>
            <StarIcon style={{ color: '#ffbc00' }} />
            <span className={classes.score}>4.5</span>
          </div>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
