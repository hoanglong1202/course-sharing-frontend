import { Close } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CodeIcon from '@mui/icons-material/Code';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import Can from 'components/Can';
import { logOut, openDialog, closeDialog } from 'features/Auth/authSlice';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchAppBar from './components/SearchAppBar';
import useStyles from './styles';

const MODE = {
  REGISTER: 'register',
  LOGIN: 'login',
};

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current: currentUser, openDialog: open } = useSelector(
    (state) => state.auth
  );
  const { enqueueSnackbar } = useSnackbar();
  const auth = currentUser.id ? true : false;

  const handleNavigate = (path) => {
    navigate(path);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  // const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const handleClickOpenLogin = () => {
    setMode(MODE.LOGIN);
    dispatch(openDialog());
    // setOpen(true);
  };

  const handleClickOpenRegister = () => {
    setMode(MODE.REGISTER);
    dispatch(openDialog());
    // setOpen(true);
  };

  const handleClose = () => {
    dispatch(closeDialog());
    // setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handeNavigateProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleUserLogOut = () => {
    dispatch(logOut());
    handleMenuClose();

    enqueueSnackbar('????ng xu???t th??nh c??ng', {
      variant: 'success',
    });

    handleNavigate('/');
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
              onClick={() => handleNavigate('/')}
            >
              UTE Courses Sharing
            </Typography>
          </Box>

          <Box className={classes.appBarTitleContainer}>
            <SearchAppBar />

            <Can roles={['admin']}>
              <Typography
                className={classes.appBarTitle}
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                onClick={() => handleNavigate('/admin')}
              >
                Qu???n tr???
              </Typography>
            </Can>

            <Can roles={['admin']}>
              <Typography
                className={classes.appBarTitle}
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                onClick={() => handleNavigate('/analysis')}
              >
                Th???ng k??
              </Typography>
            </Can>

            <Can roles={['creator']}>
              <Typography
                className={classes.appBarTitle}
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                onClick={() => handleNavigate('/creator')}
              >
                Chia s???
              </Typography>
            </Can>

            <Typography
              className={classes.appBarTitle}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              onClick={() => handleNavigate('/all')}
            >
              Kh??a h???c
            </Typography>
            {!auth && (
              <>
                <div color="inherit" onClick={handleClickOpenLogin}>
                  <Typography
                    className={clsx(classes.appBarTitle, classes.login)}
                    variant="h6"
                    component="div"
                  >
                    ????ng nh???p
                  </Typography>
                </div>
                <Button
                  color="inherit"
                  onClick={handleClickOpenRegister}
                  className={classes.signUpContainer}
                >
                  <Typography
                    className={classes.signUp}
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    ????ng k??
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
                    vertical: 'bottom',
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
                  <MenuItem onClick={handeNavigateProfile}>C?? nh??n</MenuItem>
                  <MenuItem onClick={handleUserLogOut}>????ng xu???t</MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog
        disableEscapeKeyDown
        open={open}
        aria-labelledby="form-dialog-title"
        onClose={handleClose}
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  B???n ???? c?? t??i kho???n? &nbsp;
                  <b>????ng nh???p ngay!</b>
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  B???n kh??ng c?? t??i kho???n? &nbsp;
                  <b>????ng k?? ngay!</b>
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
