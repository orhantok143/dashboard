// todosService.js
import axios from 'axios';
import { headers } from '../baseUrl';


export const getProduct = async (url) => {
    return axios.get(url, headers);
};

export const createProduct = async (url, data) => {
    return axios.post(url, data, { headers });
};

export const updateProduct = async (url, data) => {
    return axios.put(url, data, { headers });
};

export const deleteProduct = async (url) => {
    return axios.delete(url, { headers });
};
