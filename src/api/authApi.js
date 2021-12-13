import axiosClient from "./axiosClient";

const authApi = {
  register(data) {
    const url = `/auth/register`;
    return axiosClient.post(url, data);
  },
  
  login(data) {
    const url = `/auth/signin`;
    return axiosClient.post(url, data);
  },
};

export default authApi;
