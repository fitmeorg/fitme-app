import React, { createContext } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { Link, router } from "expo-router";

let access_token;

const handleSubmit = (mail: string, password: string) => {
  fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mail,
      password,
    }),
  })
    .then((response) => response.json())
    .then((token) => {
      access_token = token;
    })
    .catch((error) => console.error(error));
};

const Login = () => {
  const [password, onChangePassword] = React.useState("");
  const [mail, onChangeMail] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>fitme</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeMail}
        value={mail}
        placeholder="mail"
        secureTextEntry={false}
        inputMode="email"
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="password"
        secureTextEntry
      />

      <Link href={"/home"} asChild>
        <Pressable
          style={styles.button}
          onPress={() => handleSubmit(mail, password)}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </Link>

      <Link push href={"/register"}>
        <Text>¿Has olvidado la contraseña?</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Login;
export { access_token };
