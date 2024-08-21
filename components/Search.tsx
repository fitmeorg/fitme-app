import React, { useState, useEffect } from "react";
import { SearchBar } from "@rneui/themed";
import { View, StyleSheet } from "react-native";

type SearchBarComponentProps = {
  onResults: (search: string) => void;
};

const SwitchComponent: React.FunctionComponent<SearchBarComponentProps> = ({
  onResults,
}) => {
  const [search, setSearch] = useState("");

  const updateSearch = async (text: string) => {
    setSearch(text);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.length !== 0) {
        onResults(search);
      } else {
        onResults("");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Buscar"
        onChangeText={updateSearch}
        value={search}
        placeholderTextColor="#888"
        inputStyle={styles.input}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  inputContainer: {
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  input: {
    color: "#000",
  },
});

export default SwitchComponent;
