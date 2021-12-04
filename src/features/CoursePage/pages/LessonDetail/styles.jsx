import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  root: {},

  titleBackground: {
    height: 620,
    backgroundColor: '#1c1d1f',

    position: 'absolute',
    left: 0,
    right: 0,

    zIndex: -999,
  },

  titleContainer: {
    width: '100%',
    minHeight: 500,
    color: '#fff',
    overflow: 'hidden',

    padding: theme.spacing(3, 0),
    marginBottom: theme.spacing(2),
  },

  mediaContainer: {
    width: '100%',
    height: 500,
  },

  chapterContainer: {
    background: '#fff',
    height: '100%',
    maxHeight: 500,
    padding: theme.spacing(0, 1),
    overflow: 'auto',
  },

  chapterTitle: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 1,
    textOverflow: `ellipsis`,
    overflow: 'hidden',

    padding: theme.spacing(0.625, 0),
    color: theme.palette.tertiary.main,
    fontWeight: 600,
  },

  chapterTitleActive: {
    color: '#fff !important',
  },

  chapterButton: {
    borderRadius: 15,
    '&:hover': {
      backgroundColor: theme.palette.primary.lightHover,
    },
  },

  chapterButtonActive: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },

  courseTitle: {
    fontSize: 20,
    margin: theme.spacing(1, 0),
    fontWeight: 600,
    maxWidth: 950,

    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 1,
    textOverflow: `ellipsis`,
    overflow: 'hidden',
  },

  courseDescription: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    textOverflow: `ellipsis`,
    overflow: 'hidden',

    maxWidth: 950,
  },

  authorContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: 15,
    maxWidth: 500,
    padding: theme.spacing(2),
  },

  authorHolder: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
  },

  authorAvatar: {
    minWidth: 70,
    minHeight: 70,
  },

  authorTitle: {
    color: theme.palette.tertiary.main,
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
}));

export default useStyles;
