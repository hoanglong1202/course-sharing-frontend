import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

SearchPage.propTypes = {};

function SearchPage(props) {
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return params;
  }, [location.search]);

  return <div>This is search Page is: {queryParams.search}</div>;
}

export default SearchPage;
