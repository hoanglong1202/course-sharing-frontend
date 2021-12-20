import { Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useResolvedPath } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    listStyleType: 'none',

    '& > li': {
      padding: theme.spacing(2, 4),
    },

    '& > li > a': {
      color: theme.palette.grey[700],
      textDecoration: 'none',
      border: '0 solid',
      borderBottomWidth: '2px',
      borderColor: `transparent`,
      paddingBottom: theme.spacing(0.8),
    },

    '& > li > a.active': {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
      transition: 'all 0.1s',
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
}));

function LinkMenu(props) {
  const { pathname } = useResolvedPath('');
  const {
    current: { role },
  } = useSelector((state) => state.auth);

  const classes = useStyles();

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={`${pathname}`} end>
          Trang cá nhân
        </Link>
      </li>
      {role && role === 'user' && (
        <li>
          <Link component={NavLink} to={`${pathname}/course`}>
            Danh sách
          </Link>
        </li>
      )}
    </Box>
  );
}

export default LinkMenu;
