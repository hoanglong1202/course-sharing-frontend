import axiosClient from './axiosClient';

const BASE_URL = '/creator';

const creatorApi = {
  getCreatorName() {
    const url = `${BASE_URL}/name`;
    return axiosClient.get(url);
  },

  getCreator(id) {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.get(url);
  },

  updateCreator(data) {
    const url = `${BASE_URL}/update-profile`;
    return axiosClient.put(url, data);
  },
};

export default creatorApi;
