import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  lessonFieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  lessonField: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'space-around',

    minWidth: 120,
    // maxWidth: 300,
    marginRight: theme.spacing(1),
  },

  contentField: {
    width: 350,
  },

  image: {
    width: '100%',
  },

  firstStepContainer: {
    marginTop: theme.spacing(2),
  },

  imageHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: '100%',
    width: '100%',
  },

  description: {
    fontSize: theme.spacing(2),
    margin: theme.spacing(1, 0),
    color: '#ccc',

    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },

  title: {
    fontSize: theme.spacing(2.5),
    margin: theme.spacing(0, 0, 1, 0),
    color: theme.palette.tertiary.second,
    fontWeight: 600,
  },

  stepperContainer: {
    display: 'flex',
    justifyContent: 'center',

    width: '100%',
    marginBottom: theme.spacing(5),
  },

  stepperHolder: {
    width: '70%',
  },

  uploadLabel: {
    marginTop: theme.spacing(2),
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

  imageSubmit: {
    width: '60%',
  },

  updateButton: {
    width: '100%',
    borderRadius: 5,

    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
