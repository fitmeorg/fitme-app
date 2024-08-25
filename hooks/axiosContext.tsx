import React, {
  useContext,
  createContext,
  type PropsWithChildren,
} from "react";
import axios from "axios";

const AxiosContext = createContext<{
  post: (url: string, data: any) => Promise<any>;
  getAuth: (url: string, token: string | null | undefined) => Promise<any>;
}>({
  post: async () => null,
  getAuth: async () => null,
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
        post: async (url, data) => {
          try {
            return axios.post(`${process.env.EXPO_PUBLIC_URL}${url}`, data);
          } catch (error) {
            console.error("Error POST:", error);
            throw error;
          }
        },
        getAuth: async (url, token) => {
          try {
            return axios.get(`${process.env.EXPO_PUBLIC_URL}${url}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
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
