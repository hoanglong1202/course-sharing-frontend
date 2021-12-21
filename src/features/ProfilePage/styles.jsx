import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  imageHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: '100%',
    width: '100%',
  },

  image: {
    width: '100%',
  },

  imageStepTwo: {
    minHeight: 600,
    objectFit: 'cover',
  },

  imageStepTwoLeft: {
    objectPosition: `10% 50%`,
  },

  imageStepTwoRight: {
    objectPosition: `79% 50%`,
  },

  title: {
    fontSize: theme.spacing(2.5),
    margin: theme.spacing(0, 0, 1, 0),
    color: theme.palette.tertiary.second,
    fontWeight: 600,
  },
}));

export default useStyles;
