import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import SwitchComponent from "@/components/Search";
import Categories from "@/components/Categories";
import Routine from "@/components/Routine";
import { useSession } from "@/hooks/sessionContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { authHeader } from "@/constants/authorization";
const queryClient = new QueryClient();

const Home = () => {
  const session = useSession();
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_URL}/category/?limit=200&page=1`,
          authHeader(session.session)
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, [session]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <SwitchComponent onResults={setSearch} />
      <Categories categories={categories} filter={setCategoryFilter} />
      <QueryClientProvider client={queryClient}>
        <Routine search={search} categoriesFilter={categoryFilter} />
      </QueryClientProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
});

export default Home;
