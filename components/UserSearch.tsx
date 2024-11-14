import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAxios } from "@/hooks/axiosContext";
import { useSession } from "@/hooks/sessionContext";

interface SearchProps {
  search: string;
}

export default function UserSearch({ search }: SearchProps) {

  const {session} = useSession();
  const { get } = useAxios();

  const fetchUser = async ({ pageParam = 1 }) => {
    const url = `/auth/?page=${pageParam}&limit=3&username=${search}`;

    try {
      const response = await get(url, session);
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
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
    queryKey: ["user", search],
    queryFn: fetchUser,
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
  }, []);

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
      {data.pages.map((users: any) =>
        users.map((auth: any) => <Text key={auth._id}>{auth.username}</Text>)
      )}
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
