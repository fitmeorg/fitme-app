import React from "react";
import { Slot } from "expo-router";
import { SessionProvider } from "@/hooks/context";

export default function Root() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}