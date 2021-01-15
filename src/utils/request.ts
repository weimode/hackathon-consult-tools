import { extend } from 'umi-request';
import { Toast } from 'antd-mobile';
// const isHttpReg = /http[s]{0,1}:\/\/([\w.]+\/?)\S*/;

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const { statusText } = response;
    Toast.fail(statusText);
  } else if (!response) {
    Toast.fail('网络异常');
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  prefix: 'http://aichronic-api.sstir.cn',
  errorHandler, // 默认错误处理
  // headers: {},
});

// request拦截器
// request.interceptors.request.use((url, options) => {
//   let headers = { ...options.headers };
//   return {
//     url,
//     options: { ...options, headers },
//   };
// });

// response拦截器, 处理response
// request.interceptors.response.use(async (response) => {
//   const data = await response.clone().json();
//   if (data.code !== 200) {
//     throw data;
//   }
//   return response;
// });

export default request;
