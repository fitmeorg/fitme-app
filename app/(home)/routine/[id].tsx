import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useSession } from "@/hooks/sessionContext";
import Exercise from "@/components/Exercise";
import createAxiosInstance from "@/constants/axiosConfig";
interface ImageData {
  url: string;
  width: string;
  height: string;
}

interface ExerciseProps {
  _id: string;
  name: string;
  images: ImageData[];
  duration_minutes: number;
}

export default function Routine() {
  const { id } = useLocalSearchParams();
  const [exercises, setExercises] = useState<ExerciseProps[]>([]);
  const [nameRoutine, setNameRoutine] = useState("");
  const session = useSession();

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const axiosInstance = createAxiosInstance(session.session);
        const response = await axiosInstance.get(`/routine/${id}`);
        setNameRoutine(response.data.name);
        setExercises(response.data.exercises);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRoutine();
  }, [session, id]);

  const renderExercise = ({ item }: { item: ExerciseProps }) => (
    <Exercise
      key={item._id}
      name={item.name}
      images={item.images}
      duration_minutes={item.duration_minutes}
    />
  );

  return (
    <FlatList
      data={exercises}
      renderItem={renderExercise}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
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
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
});
