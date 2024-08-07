import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { router } from "expo-router";
import { styles } from "../constants/style";
import { stylePassword } from "../constants/style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSession } from "@/hooks/context";
import axios from "axios";

const Login = () => {
  const { signIn } = useSession();

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

      <Pressable
        style={styles.button}
        onPress={async () => {
          const response = await axios({
            method: "post",
            url: "http://localhost:3000/auth/login",
            data: { mail, password },
          });

          signIn(response);
          router.replace("/(home)");
        }}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Text onPress={() => router.push("/register")}>
        ¿Has olvidado la contraseña?
      </Text>
    </View>
  );
};

export default Login;
