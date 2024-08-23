import axios from "axios";

export default function createAxiosInstance(token?: string | null | undefined) {
  let axiosInstance;

  if (token === undefined) {
    axiosInstance = axios.create({
      baseURL: `${process.env.EXPO_PUBLIC_URL}`,
    });
  } else {
    axiosInstance = axios.create({
      baseURL: `${process.env.EXPO_PUBLIC_URL}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
