import { Box } from '@mui/system';
import creatorApi from 'api/creatorApi';
import userApi from 'api/userApi';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ManageProfileForm from './components/ManageProfileForm';

ManageProfile.propTypes = {};

function ManageProfile(props) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const { enqueueSnackbar } = useSnackbar();

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

  const onSubmit = async () => {
    try {
     
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }

  return (
    <Box>
      {!loading && <ManageProfileForm profile={profile} onFormSubmit={onSubmit} />}
    </Box>
  );
}

export default ManageProfile;
