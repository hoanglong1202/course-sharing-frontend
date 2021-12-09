import axiosClient from './axiosClient';

const BASE_URL = '/creator';

const creatorApi = {
  getCreatorName() {
    const url = `${BASE_URL}/name`;
    return axiosClient.get(url);
  },
};

export default creatorApi;
