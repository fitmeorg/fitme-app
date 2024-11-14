import { useAxios } from "@/hooks/axiosContext";
import { useSession } from "@/hooks/sessionContext";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

interface User {
  _id: string;
  name: string;
}

interface Streak {
  count: number;
  user: User;
}

export default function StreakRanking({ users }: any) {
  const [streaks, setStreaks] = useState<Streak[] | undefined>([]);
  const {session} = useSession();
  const { post } = useAxios();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await post(
          `/streak/all/?page=0&limit=${users.length}&sort[by]=count&sort[order]=desc`,
          { users },
          session
        );
        setStreaks(response.data.data);
      } catch (error) {}
    };

    fetch();
  }, [session, users]);

  return (
    <>
      {streaks?.map((streak, index: number) => (
        <View
          key={index}
          style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={stylesImage.tinyLogo}
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          />

          <Link
            href={{
              pathname: "/profile/[id]",
              params: { id: streak.user._id },
            }}>
            <View
              style={{
                ...style.bar,
                width: (streak.count * 600) / streaks[0].count,
              }}></View>
          </Link>

          {index < 3 && (
            <Image
              style={stylesImage.tinyLogo}
              source={{
                uri: "https://st.depositphotos.com/1579454/2746/i/450/depositphotos_27463535-stock-photo-gold-crown-isolated-on-white.jpg",
              }}
            />
          )}
        </View>
      ))}
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
  bar: {
    height: 30,
    backgroundColor: "blue",
    marginLeft: 10,
  },
});

const stylesImage = StyleSheet.create({
  tinyLogo: {
    width: 60,
    height: 60,
    marginLeft: 60,
    marginRight: 10,
    borderRadius: 30,
    marginTop: 15,
  },
});
