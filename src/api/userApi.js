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

  getUserFavourite(userId) {
    const url = `${BASE_URL}/user-favourite/${userId}`;
    return axiosClient.get(url);
  },

  removeUserFavourite(courseId, userId) {
    const url = `${BASE_URL}/user-favourite/${courseId}/${userId}`;
    return axiosClient.delete(url);
  },

  addUserHistory(data) {
    const url = `${BASE_URL}/user-history`;
    return axiosClient.post(url, data);
  },

  getUserHistoryList(userId) {
    const url = `${BASE_URL}/user-history/${userId}`;
    return axiosClient.get(url);
  },
};


export default userApi;
