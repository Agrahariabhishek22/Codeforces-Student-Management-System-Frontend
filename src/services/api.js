import axios from 'axios';

const api=axios.create({
    baseURL: 'https://codeforces-student-management-syste-tau.vercel.app/api',
    headers: {
        'Content-Type': 'application/json'
    }
});
 
export  default api;