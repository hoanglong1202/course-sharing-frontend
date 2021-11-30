import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },

  title: {
    flexGrow: 1,
  },

  link: {
    textDecoration: 'none',
    color: '#fff',
  },

  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
  },

  appBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
  },

  appBarTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  appCoverContainer: {
    display: `flex`,
    flexDirection: 'row',
    alignItems: `center`,

    borderBottomWidth: `0px`,
    marginLeft: `0px !important`,
    cursor: 'pointer'
  },

  appCover: {
    fontWeight: 900,
    transitionDuration: `300ms`,
    fontSize: `1.5rem !important`,
    letterSpacing: `0.1em`,

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  appBarTitle: {
    fontSize: `0.875rem`,
    margin: `0px 1.5rem`,
    fontWeight: 600,
    transitionDuration: `300ms`,
    letterSpacing: `0.1em`,
    paddingBottom: `0 25rem`,
    border: '0 solid',
    borderBottomWidth: '2px',
    borderColor: `transparent`,
    textTransform: `none`,
    cursor: 'pointer',

    '&:hover': {
      color: theme.palette.primary.main,
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },

  signUpContainer: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: `100px`,
    borderBottomWidth: `0px`,
    padding: `0.75rem 2rem`,

    '&:hover': {
      backgroundColor: theme.palette.primary.hover,
    },
  },

  signUp: {
    fontSize: `0.875rem`,
    fontWeight: 600,
    transitionDuration: `300ms`,
    letterSpacing: `0.1em`,
    paddingBottom: `0 25rem`,
    border: '0 solid',
    borderBottomWidth: '2px',
    borderColor: `transparent`,
    textTransform: `none`,
    cursor: 'pointer',
  
    color: '#fff',
    margin: theme.spacing(0, 0.5),
  },

  login: {
    marginLeft: `44px !important`,
  },

  codeIcon: {
    display: 'flex',
    padding: theme.spacing(1),
    marginRight: theme.spacing(1.5),

    backgroundColor: theme.palette.primary.main,
    borderRadius: 5,
  },
}));

export default useStyles;