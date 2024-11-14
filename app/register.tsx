import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSession } from "@/hooks/sessionContext";
import { authStyles } from "@/constants/authStyles";
import { useAxios } from "@/hooks/axiosContext";
import { StyleSheet } from "react-native";

const Register = () => {
  const { signIn } = useSession();
  const { post } = useAxios();

  const [password, onChangePassword] = React.useState("");
  const [mail, onChangeMail] = React.useState("");
  const [name, onChangeName] = React.useState("");
  const [username, onChangeUsername] = React.useState("");
  const [phone, onChangePhone] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>fitme</Text>

      <TextInput
        style={authStyles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="name"
        secureTextEntry={false}
      />

      <TextInput
        style={authStyles.input}
        onChangeText={onChangeUsername}
        value={username}
        placeholder="username"
        secureTextEntry={false}
      />

      <TextInput
        style={authStyles.input}
        onChangeText={onChangePhone}
        value={phone}
        placeholder="phone"
        secureTextEntry={false}
        inputMode="tel"
      />

      <TextInput
        style={authStyles.input}
        onChangeText={onChangeMail}
        value={mail}
        placeholder="mail"
        secureTextEntry={false}
        inputMode="email"
      />

      <View style={authStyles.passwordContainer}>
        <TextInput
          style={authStyles.passwordInput}
          onChangeText={onChangePassword}
          value={password}
          placeholder="password"
          secureTextEntry={!showPassword}
        />
        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="#aaa"
          onPress={toggleShowPassword}
        />
      </View>

      <Pressable
        style={authStyles.button}
        onPress={async () => {
          const response = await post("/auth/login", {
            name,
            username,
            mail,
            password,
            phone,
          });
          signIn(response);
          router.replace("/(home)");
        }}>
        <Text style={authStyles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
};

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

export default Register;
