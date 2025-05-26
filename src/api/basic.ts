import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
const request = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: { 'content-type': 'application/json' },
  // withCredentials: true,
});
// 請求攔截器（可選）
api.interceptors.request.use((config) => {
  // const token = localStorage.getItem('token')
  // if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 回應攔截器（可選）
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  },
)
export const NormalGet = (module, url, data) => {
  const p = [];
  if (data) {
    Object.keys(data).forEach((key) => {
      // p.push(`${key}=${encodeURI(data[key] ? data[key].toString() : '').replace(/#/g, '%23').replace(/&/g, '%26')}`);
      const encodedKey = encodeURI(key);
      const encodedValue = encodeURI(data[key] ? data[key].toString() : '').replace(/\+/g, '%2B').replace(/#/g, '%23').replace(/&/g, '%26');
      p.push(`${encodedKey}=${encodedValue}`);
    });
  }
  const parms = p.length ? `?${p.join('&')}` : '';
  return request.get(`${module}${url}${parms}`);
};

export const NormalPost = (module, url, data) => {
  const postData = data ? JSON.stringify(data) : '';
  return request.post(`${module}${url}`, postData);
};

export const NormalPut = (module, url, data) => {
  const putData = data ? JSON.stringify(data) : '';
  return request.put(`${module}${url}`, putData,);
};

export const NormalDelete = (module, url, data) => {
  return request.delete(`${module}${url}`, { data });
};
export default api
