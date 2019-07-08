import axios from 'axios';

axios.defaults.baseURL = 'http://music.watasi.cn/api';
axios.defaults.timeout = 10000;

axios.interceptors.request.use((config: any) => {
  return config;
}, (err: any) => {
  return Promise.reject(err);
});

axios.interceptors.response.use((response: any) => {
  return response.data;
}, (err: any) => {
  return Promise.reject(err);
});

export default axios;
