import { useAxios } from "@/hooks/axiosContext";
import { useSession } from "@/hooks/sessionContext";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Button } from "react-native";
import { Link, Stack } from "expo-router";
import Routine from "@/components/Routine";
import ModalActivity from "@/components/modal";

interface Streak {
  _id: string;
  user: string;
  count: number;
  updatedAt: string;
}

interface Group {
  _id: string;
  name: string;
  admins: string[];
  members: string[];
  description: string;
}

interface Example {
  url: string;
  name: string;
}

interface User {
  _id: string;
  name: string;
  auth: string;
}
interface Routine {
  name: string;
  exercises: string[];
  categories: User;
  exerciseExample: Example[];
  createdBy: string;
  shareTo: User[];
}

export default function index() {
  const { session } = useSession();
  const { get } = useAxios();

  const [streak, setStreak] = useState<Streak>();
  const [groups, setGroups] = useState<Group[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [routines, setRoutines] = useState<Routine[]>([]);

  const fetchGroups = async (pageNumber: number) => {
    try {
      let response = await get(`/group/?limit=3&page=${pageNumber}`, session);

      const newGroups = response.data.data;

      response = await get("/routine?page=0&limit=1", session);
      setRoutines(response.data.data);

      if (newGroups.length === 0) {
        setHasMore(false);
      } else {
        setGroups((prevGroups) => [...prevGroups, ...newGroups]);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/streak", session);
        setStreak(response.data);
        fetchGroups(1);
      } catch (error) {
        console.error("Error fetching streak or groups:", error);
      }
    };

    fetchData();
  }, [session]);

  const loadMoreGroups = () => {
    if (hasMore) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchGroups(nextPage);
        return nextPage;
      });
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "fitme" }} />
      <View style={style.streak}>
        <Text style={style.text}>Racha</Text>
        <Text>count {streak?.count}</Text>
      </View>

      <View style={style.group}>
        <Text style={style.text}>Grupos</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: 200 }}>
          {groups?.map((group: Group, index: number) => (
            <View key={index}>
              <View>
                <Link
                  href={{
                    pathname: "/group/[id]",
                    params: { id: group._id },
                  }}>
                  {group.name}
                </Link>
              </View>
            </View>
          ))}
        </ScrollView>
        {hasMore && <Button title="Cargar más" onPress={loadMoreGroups} />}
      </View>

      <View style={style.routine}>
        <Text style={style.text}>Rutinas</Text>
        <Routine routines={routines} />
        <Link push href="/myRoutines" style={{ marginTop: "auto" }}>
          Ver mas
        </Link>
      </View>

      <View style={style.activityModal}>
        <ModalActivity></ModalActivity>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  streak: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    marginTop: 20,
    marginHorizontal: 50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  group: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    height: 150,
    marginTop: 20,
    marginHorizontal: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
  },
  routine: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    height: 260,
    marginTop: 20,
    marginHorizontal: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
  },
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
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
