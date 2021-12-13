import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
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

  uploadLabel: {
    marginTop: theme.spacing(2),
  },

  updateButton: {
    width: '100%',
    borderRadius: 5,

    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
