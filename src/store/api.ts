import axios from '../utils/axios';

/**
 * 基于 axios 封装的 get 请求
 * @param url { string }
 * @param params { any }
 */
export const fetch = (url: string, params: object = {}): Promise<any> => {
  return new Promise((resolve: any, reject: any) => {
    axios.get(url, { params })
      .then((res: any) => {
        if (res.code === 200) {
          resolve(res);
        } else {
          alert('请求错误');
        }
      })
      .catch(reject);
  });
};
