import { useSession } from "@/hooks/context";
import { router } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const Home = () => {
  const { signOut } = useSession();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text
        onPress={() => {
          signOut();
          router.replace("/");
        }}>
        Hola
      </Text>
    </View>
  );
};

export default Home;
