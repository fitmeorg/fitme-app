import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import { styles } from "./style";
import { stylePassword } from "./style";
import { handleSubmit } from "@/components/fetch/post";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Register = () => {
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

      <View style={stylePassword.container}>
        <TextInput
          style={stylePassword.input}
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

      <Link href="/home" asChild>
        <Pressable
          style={styles.button}
          onPress={() =>
            handleSubmit("auth/registe", {
              mail,
              username,
              name,
              phone,
              password,
            })
          }>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Register;
