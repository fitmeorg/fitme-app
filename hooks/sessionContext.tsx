import React, {
  useContext,
  createContext,
  type PropsWithChildren,
} from "react";
import { useStorageState } from "./useStorageState";
import { isExpired } from "react-jwt";

const AuthContext = createContext<{
  signIn: (response: any) => void;
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
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (response) => {
          const token = isExpired(response.data.access_token);

          if (!token) {
            setSession(response.data.access_token);
          } else {
            setSession(null);
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
