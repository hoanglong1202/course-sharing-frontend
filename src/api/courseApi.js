import axiosClient from './axiosClient';

const BASE_URL = '/course';

const courseApi = {
  getAllCourse(params) {
    const url = `${BASE_URL}`;
    return axiosClient.get(url, { params });
  },

  getCourse(id) {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.get(url);
  },
};

export default courseApi;
