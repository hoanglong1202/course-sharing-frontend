import React, { useState } from 'react';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  // Switch,
  // FormControlLabel,
  // FormGroup,
  MenuItem,
  Menu,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CodeIcon from '@mui/icons-material/Code';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import Register from 'features/Auth/components/Register';
import Login from 'features/Auth/components/Login';
import clsx from 'clsx';
import SearchAppBar from './components/SearchAppBar';
import useStyles from './styles';
import { logOut } from 'features/Auth/authSlice';
import Can from 'components/Can';

const MODE = {
  REGISTER: 'register',
  LOGIN: 'login',
};

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.current);
  const auth = currentUser.id ? true : false;
  // const auth = true;

  const handleNavigate = (path) => {
    navigate(path);
  };

  // const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const handleClickOpenLogin = () => {
    setMode(MODE.LOGIN);
    setOpen(true);
  };

  const handleClickOpenRegister = () => {
    setMode(MODE.REGISTER);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserLogOut = () => {
    dispatch(logOut());
    handleMenuClose();
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
              Courses Sharing
            </Typography>
          </Box>

          <Box className={classes.appBarTitleContainer}>
            <SearchAppBar />

            <Typography
              className={classes.appBarTitle}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Quản trị
            </Typography>

            <Can roles={['admin', 'creator']}>
              <Typography
                className={classes.appBarTitle}
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                onClick={() => handleNavigate('/manage/course')}
              >
                Chia sẻ
              </Typography>
            </Can>

            <Typography
              className={classes.appBarTitle}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Khóa học
            </Typography>
            <Typography
              className={classes.appBarTitle}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Thảo luận
            </Typography>

            {!auth && (
              <>
                <div color="inherit" onClick={handleClickOpenLogin}>
                  <Typography
                    className={clsx(classes.appBarTitle, classes.login)}
                    variant="h6"
                    component="div"
                  >
                    Đăng nhập
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
                    Đăng ký
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
                  <MenuItem onClick={handleMenuClose}>Cá nhân</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Tài khoản</MenuItem>
                  <MenuItem onClick={handleUserLogOut}>Đăng xuất</MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Toolbar>

        {/* <FormGroup>
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
        </FormGroup> */}
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
                  Bạn đã có tài khoản? &nbsp;
                  <b>Đăng nhập ngay!</b>
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Bạn không có tài khoản? &nbsp;
                  <b>Đăng ký ngay!</b>
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
