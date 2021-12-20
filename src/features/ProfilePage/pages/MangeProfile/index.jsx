import { Box } from '@mui/system';
import creatorApi from 'api/creatorApi';
import userApi from 'api/userApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

ManageProfile.propTypes = {};

function ManageProfile(props) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  const {
    current: { id, role },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let result;
      if (role === 'user') {
        result = await userApi.getUser(id);
      } else if (role === 'creator') {
        result = await creatorApi.getCreator(id);
      }

      setProfile(result);
    })();
    setLoading(false);
  }, [id, role]);

  return (
    <Box>
      This is Manage Profile
      {!loading && JSON.stringify(profile)}
    </Box>
  );
}

export default ManageProfile;
