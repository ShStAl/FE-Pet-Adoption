import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pet-adoption-be-shst.vercel.app',
  withCredentials: true,
});

export default instance;
