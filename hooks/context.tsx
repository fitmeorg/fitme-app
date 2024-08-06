import React, {
  useState,
  useContext,
  createContext,
  type PropsWithChildren,
} from "react";
import { useStorageState } from "./useStorageState";
import axios from "axios";

const AuthContext = createContext<{
  signIn: (url: string, data: any) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [[Loading, session], setSession] = useStorageState("session");

  const signIn = async (url: string, data: any) => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url,
        data,
      });

      setSession(response.data.access_token);
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
