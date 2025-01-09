import axios from 'axios';
import {store} from '../redux/store'; // Assuming you have Redux store setup
import {setToken} from '../redux/action/ApiAction'; // Action to update token in Redux

const UNAUTHORIZED = 401;
const refreshAxios = axios.create({
  baseURL: 'https://aws.erav.lk/medihelp',
  headers: {
    'Content-Type': 'multipart/form-data',
  }, 
});
const axiosInstance = axios;

// Add a request interceptor to dynamically add token to Authorization header
axiosInstance.interceptors.request.use(
  async config => {
    const state = store.getState();
    const token = state.auth.access_token; // Access the token from Redux state
    config.headers['Content-Type'] = 'multipart/form-data';
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Add a response interceptor to handle 401 and refresh token
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    console.log('>>>>>>>Error', error.response.status);

    if (error.response && error.response.status) {
      try {
        const state = store.getState();
        var data = new FormData();
        data.append('username', state.auth.userName);
        console.log('>>>>>>>Error1111', error.response.status);
        await refreshAxios
          .post('/RegenerateToken', data)
          .then(res => {
            console.log(res.data);
            console.log(originalRequest.headers);
            store.dispatch(setToken(res.data.access_token));
            originalRequest.headers['Authorization'] = `${res.data.access_token}`;
            setTimeout(() => {
              return axiosInstance(originalRequest);
            }, 1000);
          })
          .catch(err => {
            console.log('...Error New', err.config);
          });
      } catch (refreshError) {
        console.log('Token refresh failed', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};
