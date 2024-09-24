import { useAxios } from "@/hooks/axiosContext";
import { useSession } from "@/hooks/sessionContext";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface Images {
  url: string;
  height: number;
  width: number;
}

interface Exercise {
  name: string;
  images: Images[];
  duration_minutes: number;
  description: string;
}

export default function Exercise() {
  const { id } = useLocalSearchParams();
  const session = useSession();
  const [exercise, setExercise] = useState<Exercise>();
  const { get } = useAxios();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await get(`/exercise/${id}`, session.session);
        setExercise(response.data);
      } catch (error) {}
    };

    fetch();
  }, [session, id]);

  return (
    <>
      <Stack.Screen options={{ title: `${exercise?.name}` }} />
      <Image
        style={{
          width: "100%",
          height: 250,
        }}
        source={{ uri: exercise?.images[0].url }}
      />
      <View style={styles.container}>
        <Text style={styles.durationText}>
          Duration minutes: {exercise?.duration_minutes}
        </Text>
        <Text>{exercise?.description}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#c6c0c0",
    padding: 20,
    marginVertical: 30,
    marginHorizontal: 50,
    borderRadius: 10,
  },
  durationText: {
    textAlign: "right",
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});
