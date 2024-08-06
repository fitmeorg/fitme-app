import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  button: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export const stylePassword = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    height: 40,
  },
  input: {
    width: "100%",
  },
});
