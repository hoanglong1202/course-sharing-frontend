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

}));

export default useStyles;
