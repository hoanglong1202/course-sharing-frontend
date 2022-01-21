import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  gridWrap: {
    marginTop: 20,
    paddingTop: 20,
    padding: 10,
  },

  totalBox: {
    padding: theme.spacing(1, 2, 4, 2),
    marginBottom: theme.spacing(2),
  },

  line: {
    maxHeight: 450,
  },

  title: {
    fontSize: theme.spacing(2.5),
    margin: theme.spacing(2, 0, 1, 0),
    color: theme.palette.tertiary.second,
    fontWeight: 600,
  },

  description: {
    fontSize: theme.spacing(2),
    margin: theme.spacing(1, 0),
    color: '#ccc',

    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },

}));

export default useStyles;
