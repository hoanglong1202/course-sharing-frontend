import axiosClient from './axiosClient';

const BASE_URL = '/user';

const userApi = {
  getUser(id) {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.get(url);
  },

  updateUser(data) {
    const url = `${BASE_URL}/update-profile`;
    return axiosClient.put(url, data);
  },
};


export default userApi;
