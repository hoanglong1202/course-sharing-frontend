import axiosClient from './axiosClient';

const BASE_URL = '/admin';

const adminApi = {
  getUserList() {
    const url = `${BASE_URL}`;
    return axiosClient.get(url);
  },

  removeUser(id) {
    const url = `${BASE_URL}/delete-user/${id}`;
    return axiosClient.delete(url);
  },

  removeCreator(id) {
    const url = `${BASE_URL}/delete-creator/${id}`;
    return axiosClient.delete(url);
  },
};

export default adminApi;
