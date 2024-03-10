// todosService.js
import axios from 'axios';


export const getProduct = async (url) => {
    return axios.get(url);
};

export const createProduct = async (url, data) => {
    return axios.post(url, data);
};

export const updateProduct = async (url, data) => {
    return axios.put(url, data);
};

export const deleteProduct = async (url) => {
    return axios.delete(url);
};
