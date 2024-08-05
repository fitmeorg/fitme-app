import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { Link } from "expo-router";
import { styles } from "./style";
import { stylePassword } from "./style";
import { handleSubmit } from "@/components/fetch/post";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Login = () => {
  const [password, onChangePassword] = React.useState("");
  const [mail, onChangeMail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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

      <Link href={"/home"} asChild>
        <Pressable
          style={styles.button}
          onPress={() => handleSubmit("auth/login", { mail, password })}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </Link>

      <Link push href={"/register"}>
        <Text>¿Has olvidado la contraseña?</Text>
      </Link>
    </View>
  );
};

export default Login;
