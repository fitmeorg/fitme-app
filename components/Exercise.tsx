import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";

interface ImageData {
  url: string;
  width: string;
  height: string;
}

interface ExerciseProps {
  name: string;
  images: ImageData[];
  duration_minutes: number;
}

export default function Exercise({
  name,
  images,
  duration_minutes,
}: ExerciseProps) {
  const screenHeight = Dimensions.get("window").height;
  const exerciseHeight = screenHeight / 8;

  const imageWidth =
    (Number(images[0].width) * exerciseHeight) / Number(images[0].height);

  return (
    <View style={[styles.container, { height: exerciseHeight }]}>
      <View style={styles.textContainer}>
        <Text style={styles.title} selectable={false}>
          {name}
        </Text>
        <Text style={styles.text} selectable={false}>
          Duration: {duration_minutes} min
        </Text>
      </View>
      <Image
        style={{
          width: imageWidth,
          height: exerciseHeight,
          marginLeft: 5,
        }}
        source={{ uri: images[0].url }}
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
