import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable, FlatList } from "react-native";

interface Category {
  _id: string;
  name: string;
}
interface CategoriesProps {
  categories: Category[];
  filter: any;
}

export default function Categories({ categories, filter }: CategoriesProps) {
  const [colors, setColors] = useState(categories.map(() => "black"));
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  const handlePress = (index: number, categoryId: string) => {
    const newColors = [...colors];
    const isSelected = categoryFilter.includes(categoryId);
    let newCategoryFilter;

    newColors[index] = "blue";
    newCategoryFilter = [...categoryFilter, categoryId];

    if (isSelected) {
      newColors[index] = "black";
      newCategoryFilter = categoryFilter.filter((item) => item !== categoryId);
    }

    setCategoryFilter(newCategoryFilter);
    filter(newCategoryFilter);

    setColors(newColors);
  };

  const renderCategory = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => {
    if (filter === null) {
      return (
        <View
          key={item._id}
          style={[styles.category, { backgroundColor: colors[index] }]}>
          <Text style={styles.text} selectable={false}>
            {item.name}
          </Text>
        </View>
      );
    }
    return (
      <Pressable
        key={item._id}
        style={[styles.category, { backgroundColor: colors[index] }]}
        onPress={() => {
          handlePress(index, item._id);
        }}>
        <Text style={styles.text} selectable={false}>
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(category) => category._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
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
