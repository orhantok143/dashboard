
import axios from 'axios';
import { headers } from '../baseUrl';


// headers: {
//     'Content-Type': 'application/json',
// },
// withCredentials: true,
// credentials: 'include'



export const userLogin = async (url, data) => {
    return axios.post(url, data, {
        headers

    }

    );

};


export const userLogout = async (url) => {
    return axios.get(url, { headers });
};

