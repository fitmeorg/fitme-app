import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSession } from "@/hooks/sessionContext";
import { useAxios } from "@/hooks/axiosContext";
import { Image, StyleSheet, View, Text } from "react-native";

interface User {
  name: string;
}

interface Exercise {
  name: string;
  repetitions: number;
}

interface Routine {
  name: string;
  exercises: Exercise[];
}

export default function Profile() {
  const { id } = useLocalSearchParams();
  const { session } = useSession();
  const { get } = useAxios();

  const [user, setUser] = useState<User>();
  const [routine, setRoutine] = useState<Routine>();

  useEffect(() => {
    const fetchRoutineData = async () => {
      try {
        const userResponse = await get(`/user/${id}`, session);
        setUser(userResponse.data);

        const routineResponse = await get(`/routine/shareTo/${id}`, session);
        setRoutine(routineResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRoutineData();
  }, [session, id]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Profile" }} />

      <Image
        style={styles.profileImage}
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
      />

      <Text style={styles.userName}>{user?.name}</Text>
      <Text style={styles.sectionTitle}>Actividad de hoy: {routine?.name}</Text>

      {routine?.exercises.map((exercise, index) => (
        <Text key={index} style={styles.exerciseText}>
          {exercise.name}: {exercise.repetitions} repeticiones
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileImage: {
    marginVertical: 16,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#666",
    marginVertical: 12,
  },
  exerciseText: {
    fontSize: 16,
    color: "#444",
    marginVertical: 4,
  },
});
