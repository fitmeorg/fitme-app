import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ShareGroup } from "@/components/shareGroup";
import Group from "./[id]";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function DrawerGroup() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <ShareGroup {...props} />}
      screenOptions={{
        drawerPosition: "right",
      }}>
      <Drawer.Screen
        name="[id]"
        component={Group}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => null,
          headerRight: () => (
            <Pressable onPress={() => navigation.toggleDrawer()}>
              <MaterialIcons
                name="menu"
                size={24}
                color="white"
                style={{ marginRight: 10 }}
              />
            </Pressable>
          ),
        })}
      />
    </Drawer.Navigator>
  );
}
