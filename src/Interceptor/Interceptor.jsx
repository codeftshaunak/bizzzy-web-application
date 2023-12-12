import axios from "axios";
import { BASE_URL } from "../helpers/proxy";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authtoken')
        
        if(token){
            config.headers['Token'] = token
        }
        config.headers['Content-Type'] = 'application/json';
        return config
    },
    error =>{
        console.log(error)
        Promise.reject(error)
    }
)
axiosInstance.interceptors.response.use(
    function(response){
        return response;
    },
    function (error){
    const access_token = localStorage.getItem('authtoken');
    if(error.response.status === 401 && access_token){
        localStorage.clear();
        // window.location.replace('/')
    }else{
        console.log(error)
    }
    return Promise.reject(error);
}
);

export default axiosInstance;