import { Box } from '@mui/system';
import adminApi from 'api/adminApi';
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
      } else if (role === 'admin') {
        result = await adminApi.getAdmin(id);
      }

      setProfile(result.dataObj);
      setLoading(false);
    })();
  }, [id, role]);

  const onSubmit = async (values) => {
    try {
      const temp = { ...values };
      const formData = new FormData();

      temp.email = values.email.trim();
      temp.username = values.username.trim();

      if (values.cover_picture && values.cover_picture.length > 0) {
        temp.profile_picture = values?.cover_picture[0]?.name;
        formData.append('cover_picture', values?.cover_picture[0]);
      }
      delete temp.cover_picture;

      Object.keys(temp).forEach((key) => formData.append(key, temp[key]));

      let result;
      if (role === 'user') {
        formData.append('user_id', id);
        formData.delete('description');
        result = await userApi.updateUser(formData);
      }

      if (role === 'creator') {
        formData.append('creator_id', id);
        result = await creatorApi.updateCreator(formData);
      }

      if (role === 'admin') {
        formData.append('admin_id', id);
        formData.delete('description');
        result = await adminApi.updateAdmin(formData);
      }

      if (result.success) {
        enqueueSnackbar('Update user profile successfully!', {
          variant: 'success',
        });

        setProfile(result.dataObj);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Box>
      {!loading && (
        <ManageProfileForm profile={profile} onFormSubmit={onSubmit} />
      )}
    </Box>
  );
}

export default ManageProfile;
