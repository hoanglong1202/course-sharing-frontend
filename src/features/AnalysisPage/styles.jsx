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
}));

export default useStyles;
