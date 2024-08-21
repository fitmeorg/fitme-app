import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import axios from "axios";
import { useSession } from "@/hooks/sessionContext";
import Exercise from "@/components/Exercise";

export default function Routine() {
  const { id } = useLocalSearchParams();
  const session = useSession();
  const [exercises, setExercise] = useState([]);
  const [nameRoutine, setNameRoutine] = useState("");

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_URL}/routine/${id}`,
          { headers: { Authorization: `Bearer ${session.session}` } }
        );
        setNameRoutine(response.data.name);
        setExercise(response.data.exercises);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRoutine();
  }, [session, id]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: `${nameRoutine}`,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      {exercises.map((exercise: any) => (
        <Exercise key={exercise._id} exercise={exercise} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
});
