import React, {
  useContext,
  createContext,
  type PropsWithChildren,
} from "react";
import axios from "axios";

const AxiosContext = createContext<{
  post: (
    url: string,
    data?: any,
    token?: string | null | undefined
  ) => Promise<any>;
  get: (url: string, token: string | null | undefined) => Promise<any>;
}>({
  post: async () => null,
  get: async () => null,
});

export function useAxios() {
  const value = useContext(AxiosContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function AxiosProvider({ children }: PropsWithChildren) {
  return (
    <AxiosContext.Provider
      value={{
        post: async (url, data = null, token = null) => {
          try {
            if (token !== null) {
              return axios.post(`${process.env.EXPO_PUBLIC_URL}${url}`, data, {
                headers: { Authorization: `Bearer ${token}` },
              });
            }
            return axios.post(`${process.env.EXPO_PUBLIC_URL}${url}`, data);
          } catch (error) {
            console.error("Error POST:", error);
            throw error;
          }
        },
        get: async (url, token = null) => {
          try {
            if (token !== null) {
              return axios.get(`${process.env.EXPO_PUBLIC_URL}${url}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
            }
            return axios.get(`${process.env.EXPO_PUBLIC_URL}${url}`);
          } catch (error) {
            console.error("Error GET:", error);
            throw error;
          }
        },
      }}>
      {children}
    </AxiosContext.Provider>
  );
}
