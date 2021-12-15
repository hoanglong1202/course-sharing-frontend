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

  addCreator(data) {
    const url = `${BASE_URL}/add-creator`;
    return axiosClient.post(url, data);
  },

  getAdminCourseList() {
    const url = `${BASE_URL}/course-list`;
    return axiosClient.get(url);
  },

  approveCourse(id) {
    const url = `${BASE_URL}/approved-course/${id}`;
    return axiosClient.put(url);
  },

  removeCourseType(id) {
    const url = `${BASE_URL}/delete-course-type/${id}`;
    return axiosClient.delete(url);
  },

  addCourseType(data) {
    const url = `${BASE_URL}/add-course-type`;
    return axiosClient.post(url, data);
  },

  updateCourseType(data) {
    const url = `${BASE_URL}/update-course-type`;
    return axiosClient.put(url, data);
  },
};

export default adminApi;
