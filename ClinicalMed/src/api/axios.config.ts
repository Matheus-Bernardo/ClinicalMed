import axios from 'axios';
import { urlApi } from '../environments/urlApi';

const api = axios.create({
    baseURL:urlApi.BASEURL,
    timeout:10000,
    headers:{
        'Content-Type':'application/json'
    }

})

export default api;