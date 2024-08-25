import React from "react";
import { Slot } from "expo-router";
import { SessionProvider } from "@/hooks/sessionContext";
import { AxiosProvider } from "@/hooks/axiosContext";

export default function Root() {
  return (
    <AxiosProvider>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </AxiosProvider>
  );
}
