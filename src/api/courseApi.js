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

  getLessons(courseId) {
    const url = `${BASE_URL}/lesson/${courseId}`;
    return axiosClient.get(url);
  },

  getLessonDetail(courseId, lessonId) {
    const url = `${BASE_URL}/lesson/${courseId}/${lessonId}`;
    return axiosClient.get(url);
  },

  getLessonTypes() {
    const url = `${BASE_URL}/lesson/types`;
    return axiosClient.get(url);
  },

  getCourseList(id) {
    const url = `${BASE_URL}/course-list/${id}`;
    return axiosClient.get(url);
  },
};

export default courseApi;
