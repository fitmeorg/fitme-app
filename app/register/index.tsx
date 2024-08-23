import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSession } from "@/hooks/sessionContext";
import axios from "axios";
import { authStyles } from "@/constants/authStyles";

const Register = () => {
  const { signIn } = useSession();

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
          const response = await axios({
            method: "post",
            url: `${process.env.EXPO_PUBLIC_URL}/register`,
            data: {
              name,
              username,
              mail,
              password,
              phone,
            },
          });
          signIn(response);
          router.replace("/(home)");
        }}>
        <Text style={authStyles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
};

export default Register;
