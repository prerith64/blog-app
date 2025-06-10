import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
   const api = axios.create({baseURL:process.env.BACKEND_URL,
    withCredentials:true
})


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
