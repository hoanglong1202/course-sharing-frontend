import React from 'react';
import DesignIllustration from 'assets/images/design-illustration-2.svg';
import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(12),
  },
  image: {
    width: '100%',
  },
}));

function MainPage(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Box>
            <Typography>Lorem, ipsum dolor sit amet MEO MEO</Typography>
            <Typography>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              nisi ex nesciunt eveniet ipsam beatae quidem ratione quaerat
              aperiam voluptatem excepturi ab impedit qui tenetur nobis quod
              quisquam, in facere?
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box>
            <img className={classes.image} src={DesignIllustration} alt="gg" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainPage;
