
import axios from 'axios';
import { headers } from '../baseUrl';





export const userLogin = async (url, data) => {
    return axios.post(url, data, {
        // CORS configuration settings
        headers: {
            'Content-Type': 'application/json', // Assuming JSON data
            'Access-Control-Allow-Origin': 'https://flamingodb.netlify.app, https://flamingo-mn.netlify.app',
        },
        withCredentials: true, // Send credentials (if applicable)
    });
};


export const userLogout = async (url) => {
    return axios.get(url, headers);
};

