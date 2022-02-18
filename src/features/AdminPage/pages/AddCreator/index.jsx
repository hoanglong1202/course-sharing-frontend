import { Box } from '@mui/system';
import adminApi from 'api/adminApi';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddCreatorForm from './components/AddCreatorForm';

function AddCreator(props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      let temp = { ...values };

      temp.email = values.email.trim();
      temp.username = values.username.trim();
      temp.description = values.description.trim();
      temp.password = values.password.trim();
      temp.profile_picture = values?.cover_picture[0]?.name;
      delete temp.cover_picture;
  
      const formData = new FormData();
      formData.append('cover_picture', values?.cover_picture[0]);
      Object.keys(temp).forEach((key) => formData.append(key, temp[key]));

      const result =  await adminApi.addCreator(formData);

      if (result.success) {
        enqueueSnackbar('Thêm người chia sẻ thành công!', {
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
      <AddCreatorForm onFormSubmit={onSubmit} />
    </Box>
  );
}

export default AddCreator;
