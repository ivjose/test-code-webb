import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.jsonbin.io/v3',
});

const API_KEY = '$2b$10$vwYrv43Kkm/TR7I.v.kL1eYn1A.LrQT6UXbF6zLFGuGXtQWH4L9xW';
instance.defaults.headers.common['X-Master-Key'] = API_KEY;


export default instance;