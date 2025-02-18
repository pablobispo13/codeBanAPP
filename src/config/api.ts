
import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://apicodeban.vercel.app/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});