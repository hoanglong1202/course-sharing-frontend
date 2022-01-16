import axios from 'axios';
import StorageKeys from 'constants/storage-keys';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_STATIC_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(StorageKeys.TOKEN) || null;
    config.headers.Authorization = token;
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const { enqueueSnackbar } = useSnackbar();
    const statusCode = error.response.status;
    if (statusCode === 404) {
      window.location.href = '/not-found';
      return;
    }
    if (statusCode === 401) {
      window.location.href = '/unauthorized';
      return;
    }
    if (statusCode === 403) {
      window.location.href = '/forbidden';
      return;
    }
    if (statusCode === 500) {
      // show notification
      alert(error.message)
      return;
    };

    return Promise.reject(error);
  }
);

export default axiosClient;
