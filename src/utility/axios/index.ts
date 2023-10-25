import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL
})

export const setAxiosToken = (token: string) => {
  axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + token;
    return config;
  })
}
export const catchHelper = (reject: (error: FetchError) => void, error: { response: { data: object } }) => {
  if (axios.isCancel(error)) return;
  console.warn(error?.response?.data || error);
  reject(error?.response?.data || { message: "Network error.", code: 500 });
};