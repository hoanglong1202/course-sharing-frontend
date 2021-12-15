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

  addUserFavourite(courseId, userId) {
    const url = `${BASE_URL}/add-user-favourite/${courseId}/${userId}`;
    return axiosClient.get(url);
  },

  getUserFavourite(courseId, userId) {
    const url = `${BASE_URL}/user-favourite/${courseId}/${userId}`;
    return axiosClient.get(url);
  },

  removeUserFavourite(courseId, userId) {
    const url = `${BASE_URL}/user-favourite/${courseId}/${userId}`;
    return axiosClient.delete(url);
  },
};


export default userApi;
