import { Box } from '@mui/system';
import authApi from 'api/authApi';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddUserForm from './components/AddUserForm';

function AddUser(props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      let temp = { ...values };

      temp.email = values.email.trim();
      temp.username = values.username.trim();
      temp.password = values.password.trim();
      temp.profile_picture = values?.cover_picture[0]?.name;
      delete temp.cover_picture;
  
      const formData = new FormData();
      formData.append('cover_picture', values?.cover_picture[0]);
      Object.keys(temp).forEach((key) => formData.append(key, temp[key]));

      const result =  await authApi.register(formData);

      if (result.success) {
        enqueueSnackbar('Add user successfully!', {
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
      <AddUserForm onFormSubmit={onSubmit} />
    </Box>
  );
}

export default AddUser;
