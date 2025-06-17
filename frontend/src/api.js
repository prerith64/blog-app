import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ,
  withCredentials: true
});


// let token = null;


// export function setToken(newToken) {
//   token = newToken
// }

// export function clearToken() {
//   token = null
// }

// api.interceptors.request.use( req => {
//      if(token){
//          req.headers.Authorization =  `Bearer ${token}`
//      }
//      return req;
// },
// error => Promise.reject(error)
// )

// api.interceptors.response.use(
//     response => response,
//     error => Promise.reject(error)
// )

export default api;
