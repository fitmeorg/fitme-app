import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";

export default function Exercise({ exercise }: any) {
  const screenHeight = Dimensions.get("window").height;

  const exerciseHeight = screenHeight / 8;

  const imageWidth =
    (Number(exercise.images[0].width) * exerciseHeight) /
    Number(exercise.images[0].height);

  return (
    <View style={[styles.container, { height: exerciseHeight }]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{exercise.name}</Text>
        <Text style={styles.text}>
          Duration: {exercise.duration_minutes} min
        </Text>
      </View>
      <Image
        style={{
          width: imageWidth,
          height: exerciseHeight,
          marginLeft: 5,
        }}
        source={{ uri: exercise.images[0].url }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#c6c0c0",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
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
    color: "black",
  },
});
