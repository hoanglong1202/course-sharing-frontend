import React from 'react';
import PropTypes from 'prop-types';
import StorageKeys from 'constants/storage-keys';
import jwt from 'jsonwebtoken';

Can.propTypes = {
  roles: PropTypes.array,
  children: PropTypes.any,
};

function Can({ roles, children }) {
  const token = localStorage.getItem(StorageKeys.TOKEN) || null;
  let userRole;

  if (token) {
    const decoded = jwt.verify(token, process.env.REACT_APP_SECRET_JWT_KEY);
    userRole = decoded.role;
  }

  const checkCondition = roles.includes(userRole);

  return <>{checkCondition && children}</>;
}

export default Can;
