import { makeStyles } from '@mui/styles';

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

  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectContainer: {
    display: 'flex',
    margin: theme.spacing(1, 6),
    padding: theme.spacing(2, 3),
  },

  selectHolder: {
    margin: theme.spacing(1, 1, 0, 0),
    minWidth: 200,
  },
}));

export default useStyles;
