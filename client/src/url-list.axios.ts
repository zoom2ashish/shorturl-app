import axios from 'axios';

const instance = axios.create({
  baseURL: './'
});

export function setupAuthorization(token: string) {
  instance.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  });
}

export default instance;