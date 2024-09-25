import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Categories from "./Categories";
import { Link } from "expo-router";

export default function Routine({ routines }: any) {
  return (
    <View>
      {routines.map((routine: any, index: number) => (
        <View key={index} style={styles.container}>
          <Link
            key={routine._id}
            style={styles.title}
            selectable={false}
            href={{
              pathname: "/routine/[id]",
              params: { id: routine._id },
            }}>
            {routine.name}
          </Link>
          <Text key={index}>creado por {routine.createdBy.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>compartido por </Text>
            {routine.shareTo.map((user: any) => (
              <Text key={user._id}>{user.name}</Text>
            ))}
          </View>
          <Categories categories={routine.categories} filter={null} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#c6c0c0",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});
