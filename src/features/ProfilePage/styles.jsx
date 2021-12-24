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

  updateButton: {
    width: '100%',
    borderRadius: 5,

    marginTop: theme.spacing(2),
  },

  profileForm: {
    margin: theme.spacing(0, 2),
  },

  userHistoryWrapper: {
    height: 400,
    overflow: 'scroll',
    margin: theme.spacing(2, 0)
  },

  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing(3)
  },

  features: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: `0.2em`,
    margin: theme.spacing(2, 1),
  },
}));

export default useStyles;
