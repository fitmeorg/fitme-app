import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAxios } from "@/hooks/axiosContext";
import { useSession } from "@/hooks/sessionContext";
import Routine from "./Routine";

interface RoutineProps {
  search: string;
  categoriesFilter: string[];
}

export default function RoutineSearch({
  search,
  categoriesFilter,
}: RoutineProps) {
  const {session} = useSession();
  const { get } = useAxios();

  const fetchRoutines = async ({ pageParam = 1 }) => {
    const categoryParams = categoriesFilter
      .map((category: string) => `&categories=${category}`)
      .join("");

    const url = search
      ? `/routine?name=${search}&limit=3&page=${pageParam}${categoryParams}`
      : `/routine?limit=3&page=${pageParam}${categoryParams}`;

    try {
      const response = await get(url, session);
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error fetching routines:", error);
      throw new Error("Failed to fetch routines");
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    status,
  } = useInfiniteQuery({
    queryKey: ["routines", search, categoriesFilter],
    queryFn: fetchRoutines,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  useEffect(() => {
    refetch();
  }, [categoriesFilter]);

  if (status === "pending") {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      {data.pages.map((routines: any) => (
        <Routine routines={routines} />
      ))}
      <Button
        title={
          isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"
        }
        onPress={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      />
      {isFetching && !isFetchingNextPage ? <Text>Fetching...</Text> : null}
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
