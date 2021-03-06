import axiosClient from './axiosClient';

const BASE_URL = '/course';

const courseApi = {
  getAllCourse(params) {
    const url = `${BASE_URL}`;
    return axiosClient.get(url, { params });
  },

  searchCourse(params) {
    const url = `${BASE_URL}/search`;
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

  getCourseTypes() {
    const url = `${BASE_URL}/types`;
    return axiosClient.get(url);
  },

  getCourseList(id) {
    const url = `${BASE_URL}/course-list/${id}`;
    return axiosClient.get(url);
  },

  addCourse: async (data) => {
    const url = `${BASE_URL}/add-course`;
    const result = await axiosClient.post(url, data);
    return result;
  },

  updateCourse: async (data) => {
    const url = `${BASE_URL}/update-course`;
    const result = await axiosClient.put(url, data);
    return result;
  },

  deleteCourse: async (id) => {
    const url = `${BASE_URL}/delete-course/${id}`;
    const result = await axiosClient.delete(url);
    return result;
  },

  deleteLesson: async (courseId, lessonId) => {
    const url = `${BASE_URL}/lesson/${courseId}/${lessonId}`;
    const result = await axiosClient.delete(url);
    return result;
  },

  updateLesson: async (courseId, lessonId, data) => {
    const url = `${BASE_URL}/lesson/${courseId}/${lessonId}`;
    const result = await axiosClient.put(url, data);
    return result;
  },

  countCourseViewed: async (id) => {
    const url = `${BASE_URL}/count-view/${id}`;
    const result = await axiosClient.get(url);
    return result;
  },

  getCourseRating: async (id) => {
    const url = `${BASE_URL}/rating/${id}`;
    const result = await axiosClient.get(url);
    return result;
  },

  addCourseRating: async (data) => {
    const url = `${BASE_URL}/rating`;
    const result = await axiosClient.post(url, data);
    return result;
  },

  getLessonComment(courseId, lessonId) {
    const url = `${BASE_URL}/lesson/comment/${courseId}/${lessonId}`;
    return axiosClient.get(url);
  },

  addLessonComment(data) {
    const url = `${BASE_URL}/lesson/comment`;
    return axiosClient.post(url, data);
  },

  addSingleLesson (data) {
    const url = `${BASE_URL}/lesson`;
    return axiosClient.post(url, data);
  },

  addCourseRegister(courseId, userId) {
    const url = `${BASE_URL}/course-register/${courseId}/${userId}`;
    return axiosClient.post(url);
  },

  getCourseRegister(courseId) {
    const url = `${BASE_URL}/course-register/${courseId}`;
    return axiosClient.get(url);
  },

  getUserLessonHistory(courseId, userId) {
    const url = `${BASE_URL}/lesson-history/${courseId}/${userId}`;
    return axiosClient.get(url);
  },
};

export default courseApi;
