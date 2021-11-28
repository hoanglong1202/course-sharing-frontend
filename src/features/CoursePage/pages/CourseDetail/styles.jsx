import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  root: {},

  titleBackground: {
    height: 350,
    backgroundColor: '#1c1d1f',

    position: 'absolute',
    left: 0,
    right: 0,

    zIndex: -999,
  },

  itemCover: {
    padding: theme.spacing(0, 2),
  },

  titleContainer: {
    minHeight: 300,
    color: '#fff',
    padding: theme.spacing(3, 0),
  },

  icon: {
    color: '#fff',
  },

  breadcumb: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
  },

  courseTitle: {
    fontSize: 32,
    marginBottom: theme.spacing(1),
    fontWeight: 600,
  },

  courseDecription: {
    marginBottom: theme.spacing(2),
    fontSize: 19,
  },

  courseCover: {
    width: '100%',
  },
  courseLearnGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  courseLearn: {
    maxWidth: 300,
    border: '1px solid #fff',
  },

  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    backgroundColor: '#fff',
    minHeight: 100,
  },

  learnButton: {
    width: '95%',
    padding: theme.spacing(1),
    margin: theme.spacing(0.5, 2, 0.5, 2),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',

    '&:hover': {
      backgroundColor: theme.palette.primary.hover,
    },
  },

  loveButton: {
    width: '95%',
    padding: theme.spacing(1),
    margin: theme.spacing(0.5, 2, 0.5, 2),

    '&:hover': {
      backgroundColor: '#ddd',
    },
  },

  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  iconHolder: {
    display: 'flex',
    alignItems: 'center',

    margin: theme.spacing(0, 1),
  },

  score: {
    marginLeft: `0.5rem`,
    fontWeight: 700,
  },

  authorContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',

    padding: theme.spacing(1),
  },

  authorHolder: {
    display: 'flex',
    // justifyContent: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
  },

  authorTitle: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 18,
  },

  authorDescription: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    textOverflow: `ellipsis`,
    overflow: 'hidden',
  },

  content: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    border: '1px solid #ddd',
  },

  contentTitle: {
    color: '#1c1d1f',
    marginBottom: theme.spacing(2),
    fontSize: 24,
    fontWeight: 600,
  },

  contentInfor: {
    display: 'flex',

    padding: theme.spacing(0.5, 0),

    marginTop: theme.spacing(1),
  },

  infor: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    overflow: 'hidden',

    width: '100%',
    height: `auto`,

    marginLeft: theme.spacing(2)
  },
}));

export default useStyles;
