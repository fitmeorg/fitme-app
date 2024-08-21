import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

export default function Categories({ categories, filter }: any) {
  const [colors, setColors] = useState(categories.map(() => "black"));
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  const handlePress = (index: number, categoryId: string) => {
    const newColors = [...colors];
    const isSelected = categoryFilter.includes(categoryId);

    if (isSelected) {
      newColors[index] = "black";
      const newCategoryFilter = categoryFilter.filter(
        (item) => item !== categoryId
      );
      setCategoryFilter(newCategoryFilter);
      filter(newCategoryFilter);
    } else {
      newColors[index] = "blue";
      const newCategoryFilter = [...categoryFilter, categoryId];
      setCategoryFilter(newCategoryFilter);
      filter(newCategoryFilter);
    }

    setColors(newColors);
  };

  return (
    <View style={styles.container}>
      {categories.map((category: any, index: number) => (
        <Pressable
          key={index}
          style={[styles.category, { backgroundColor: colors[index] }]}
          onPress={() => handlePress(index, category._id)}>
          <Text style={styles.text}>{category.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    marginRight: 10,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
