import React, {
  useContext,
  createContext,
  type PropsWithChildren,
} from "react";
import axios from "axios";
import { useSession } from "./sessionContext";

const AxiosContext = createContext<{
  post: (url: string, data: any) => Promise<any>;
  getWithAuth: (url: string) => Promise<any>;
}>({
  post: async () => null,
  getWithAuth: async () => null,
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
        getWithAuth: async (url) => {
          const session = useSession();
          try {
            return axios.get(`${process.env.EXPO_PUBLIC_URL}${url}`, {
              headers: { Authorization: `Bearer ${session.session}` },
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
