import React, { useEffect, useState } from "react";
import ModalActivity from "@/components/modal";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSession } from "@/hooks/sessionContext";
import { useAxios } from "@/hooks/axiosContext";
import Drawer from "expo-router/drawer";
import StreakRanking from "@/components/streakRanking";
import { useNavigation } from "expo-router";

interface Groups {
  name: string;
  admins: string[];
  members: string[];
}

export default function Group() {
  const { id } = useLocalSearchParams();
  const { session } = useSession();
  const { get } = useAxios();
  const [group, setGroup] = useState<Groups | undefined>();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await get(`/group/${id}`, session);
        setGroup(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [session, id]);

  return (
    <>
      <Drawer.Screen options={{ title: group?.name || "Grupo" }} />

      <StreakRanking
        users={[...(group?.admins || []), ...(group?.members || [])]}
      />
      <View style={style.activityModal}>
        <ModalActivity />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  activityModal: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 50,
    marginVertical: 20,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
});
