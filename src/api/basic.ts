import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
type QueryParams = Record<string, string | number | boolean | undefined | null>

function encodeQuery(params: QueryParams): string {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(String(value))
        .replace(/\+/g, '%2B')
        .replace(/#/g, '%23')
        .replace(/&/g, '%26');
      return `${encodedKey}=${encodedValue}`;
    })
    .join('&');
}

export const NormalGet = (
  module: string,
  url: string,
  data?: QueryParams
) => {
  const queryString = data ? `?${encodeQuery(data)}` : '';
  return request.get(`${module}${url}${queryString}`);
};

export const NormalPost = (
  module: string,
  url: string,
  data?: object
) => {
  return request.post(`${module}${url}`, data ?? {});
};

export const NormalPut = (
  module: string,
  url: string,
  data?: object
) => {
  return request.put(`${module}${url}`, data ?? {});
};

export const NormalDelete = (
  module: string,
  url: string,
  data?: object
) => {
  return request.delete(`${module}${url}`, { data });
};
export default api
