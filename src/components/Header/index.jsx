import React, { useState } from 'react';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Menu,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CodeIcon from '@mui/icons-material/Code';
// import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import Register from 'features/Auth/components/Register';
import Login from 'features/Auth/components/Login';
import clsx from 'clsx';

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

const MODE = {
  REGISTER: 'register',
  LOGIN: 'login',
};

export default function Header() {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const history = useNavigate();

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserLogOut = () => {
    // dispatch(logOut());
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0} p={0}>
        <Toolbar className={classes.appBarContainer}>
          <Box className={classes.appCoverContainer}>
            <div className={classes.codeIcon}>
              <CodeIcon sx={{ color: `#fff`, fontSize: 20 }} />
            </div>
            <Typography
              className={classes.appCover}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Photos
            </Typography>
          </Box>

          <Box className={classes.appBarTitleContainer}>
            <Typography
              className={classes.appBarTitle}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Photos
            </Typography>
            <Typography
              className={classes.appBarTitle}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Photos
            </Typography>
            <Typography
              className={classes.appBarTitle}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Photos
            </Typography>

            {!auth && (
              <>
                <div color="inherit" onClick={handleClickOpen}>
                  <Typography
                    className={clsx(classes.appBarTitle, classes.login)}
                    variant="h6"
                    component="div"
                  >
                    Login
                  </Typography>
                </div>
                <Button
                  color="inherit"
                  onClick={handleClickOpen}
                  className={classes.signUpContainer}
                >
                  <Typography
                    className={classes.signUp}
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    Sign up
                  </Typography>
                </Button>
              </>
            )}

            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Toolbar>
  
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={handleChange}
                aria-label="login switch"
              />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup>
      </AppBar>

      <Dialog
        disableEscapeKeyDown
        open={open}
        aria-labelledby="form-dialog-title"
        onClose={handleClose}
      >
        <IconButton
          // style={{ position: 'absolute', top: `8px`, right: `8px`, zIndex: 1 }}
          className={classes.closeButton}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account? Login here.
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Don't have an account? Register here.
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
