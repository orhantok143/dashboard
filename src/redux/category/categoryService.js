
import axios from 'axios';





export const getCategory = async (url) => {
    return axios.get(url);
};

export const createCategory = async (url, data) => {
    return axios.post(url, data);
};

export const updateCategory = async (url, data) => {
    return axios.put(url, data);
};

export const deleteCategory = async (url) => {
    return axios.delete(url);
};
