import React from "react";
import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";

interface RegisterDTO {
  mail: string;
  password: string;
  phone: string;
  name: string;
  username: string;
}

const handleSubmit = (registerDTO: RegisterDTO) => {
  fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerDTO),
  })
    .then((response) => response.json())
    .then((token) => {
      console.log(token);
    })
    .catch((error) => console.error(error));
};

const Register = () => {
  const [password, onChangePassword] = React.useState("");
  const [mail, onChangeMail] = React.useState("");
  const [name, onChangeName] = React.useState("");
  const [username, onChangeUsername] = React.useState("");
  const [phone, onChangePhone] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>fitme</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="name"
        secureTextEntry={false}
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        value={username}
        placeholder="username"
        secureTextEntry={false}
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangePhone}
        value={phone}
        placeholder="phone"
        secureTextEntry={false}
        inputMode="tel"
      />

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

      <Link href="/home" asChild>
        <Pressable
          style={styles.button}
          onPress={() =>
            handleSubmit({ mail, username, name, phone, password })
          }>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
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

export default Register;
