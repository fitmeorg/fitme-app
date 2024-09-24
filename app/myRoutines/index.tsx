import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Stack } from "expo-router";
import { useAxios } from "@/hooks/axiosContext";
import { useSession } from "@/hooks/sessionContext";
import Routine from "@/components/Routine";

interface Example {
  url: string;
  name: string;
}

interface Routine {
  name: string;
  exercises: string[];
  categories: string[];
  exerciseExample: Example[];
  createdBy: string;
  shareTo: string[];
}

export default function MyRoutine() {
  const { get } = useAxios();
  const session = useSession();

  const [routines, setRoutines] = useState<Routine[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/routine?page=0&limit=7", session.session);
        setRoutines(response.data.data);
      } catch (error) {
        console.error("Error fetching streak or groups:", error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack.Screen options={{ title: "Mis Rutinas" }} />
        <Routine routines={routines} />
      </ScrollView>
    </>
  );
}
