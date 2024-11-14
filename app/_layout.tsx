import "react-native-gesture-handler";
import React from "react";
import { SessionProvider } from "@/hooks/sessionContext";
import { AxiosProvider } from "@/hooks/axiosContext";
import { Slot } from "expo-router";

export default function Root() {
  return (
    <SessionProvider>
      <AxiosProvider>
        <Slot />
      </AxiosProvider>
    </SessionProvider>
  );
}
