import React from "react";
import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/hooks/sessionContext";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="group" options={{ headerShown: false }} />
    </Stack>
  );
}
