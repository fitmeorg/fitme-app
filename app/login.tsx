import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSession } from "@/hooks/sessionContext";
import { authStyles } from "@/constants/authStyles";
import { useAxios } from "@/hooks/axiosContext";

const Login = () => {
  const { signIn } = useSession();
  const { post } = useAxios();

  const [password, onChangePassword] = React.useState("");
  const [mail, onChangeMail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>fitme</Text>

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
            mail,
            password,
          });

          signIn(response);
          router.replace("/(home)");
        }}>
        <Text style={authStyles.buttonText}>Login</Text>
      </Pressable>

      <Text onPress={() => router.push("/register")}>
        ¿Has olvidado la contraseña?
      </Text>
    </View>
  );
};

export default Login;
