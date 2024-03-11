
import axios from 'axios';
import { headers } from '../baseUrl';





export const getCategory = async (url) => {
    return axios.get(url, { headers });
};

export const createCategory = async (url, data) => {
    return axios.post(url, data, { headers });
};

export const updateCategory = async (url, data) => {
    return axios.put(url, data, { headers });
};

export const deleteCategory = async (url) => {
    return axios.delete(url, { headers });
};
