import { Box } from '@mui/system';
import userApi from 'api/userApi';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateUserForm from './components/UpdateUserForm';

function UpdateUser(props) {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const { dataObj } = await userApi.getUser(id);

      setUser(dataObj);
      setLoading(false);
    })();

  }, [id]);

  const onSubmit = async (values) => {
    try {
      let temp = { ...values };

      temp.email = values.email.trim();
      temp.username = values.username.trim();
      temp.profile_picture = values?.cover_picture[0]?.name;
      delete temp.cover_picture;
  
      const formData = new FormData();
      formData.append('cover_picture', values?.cover_picture[0]);
      Object.keys(temp).forEach((key) => formData.append(key, temp[key]));

      const result =  await userApi.updateUser(formData);

      if (result.success) {
        enqueueSnackbar('Update user profile successfully!', {
          variant: 'success',
        });

        navigate(`/admin`);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Box>
      {!loading && <UpdateUserForm onFormSubmit={onSubmit} user={user} />}
    </Box>
  );
}

export default UpdateUser;
