import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import SwitchComponent from "@/components/Search";
import Categories from "@/components/Categories";
import RoutineSearch from "@/components/RoutineSearch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAxios } from "@/hooks/axiosContext";
import { useSession } from "@/hooks/sessionContext";

const queryClient = new QueryClient();

const Home = () => {
  const { session } = useSession();
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const { get } = useAxios();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await get("/category/?limit=200&page=1", session);
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
      {search !== "" && (
        <QueryClientProvider client={queryClient}>
          <RoutineSearch search={search} categoriesFilter={categoryFilter} />
        </QueryClientProvider>
      )}
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
