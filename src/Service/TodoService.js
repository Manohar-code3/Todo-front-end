import axios from "axios";
import { getToken } from "./AuthService";


const Base_url="http://localhost:8080/site/Todos"

axios.interceptors.request.use(function (config) {

    config.headers['Authorization']= getToken();
    return config;
  }, function (error) {
    
    return Promise.reject(error);
  });
  
export const getAllTodos = () =>  axios.get(Base_url)

export const saveTodo=(todo)=>axios.post(Base_url,todo)

export const getTodo=(id)=>axios.get(Base_url+"/"+id)
export const update =(id, todo)=>axios.put(Base_url+"/"+id,todo)


export const remove=(id)=> axios.delete(Base_url+"/"+id)

export const completed =(id) => axios.patch(Base_url+"/"+id+"/completed")

export const incompleted =(id) => axios.patch(Base_url+"/"+id+"/incompleted")
