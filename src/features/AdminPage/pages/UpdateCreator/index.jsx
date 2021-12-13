import { Box } from '@mui/system';
import creatorApi from 'api/creatorApi';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateCreatorForm from './components/UpdateCreatorForm';

function UpdateCreator(props) {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState({});

  useEffect(() => {
    (async () => {
      const { dataObj } = await creatorApi.getCreator(id);

      setCreator(dataObj);
      setLoading(false);
    })();

  }, [id]);

  const onSubmit = async (values) => {
    try {
      let temp = { ...values };

      temp.email = values.email.trim();
      temp.username = values.username.trim();
      temp.description = values.description.trim();
      temp.profile_picture = values?.cover_picture[0]?.name;
      delete temp.cover_picture;
  
      const formData = new FormData();
      formData.append('cover_picture', values?.cover_picture[0]);
      Object.keys(temp).forEach((key) => formData.append(key, temp[key]));

      const result =  await creatorApi.updateCreator(formData);

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
      {!loading && <UpdateCreatorForm onFormSubmit={onSubmit} creator={creator} />}
    </Box>
  );
}

export default UpdateCreator;
