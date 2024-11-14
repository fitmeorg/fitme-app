import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import SwitchComponent from "@/components/Search";
import { useLocalSearchParams } from "expo-router";
import { useSession } from "@/hooks/sessionContext";
import { useAxios } from "@/hooks/axiosContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserSearch from "@/components/UserSearch";
import { jwtDecode } from "jwt-decode";

interface User {
  _id: string;
  name: string;
  auth: string;
}

interface Groups {
  name: string;
  admins: User[];
  members: User[];
}

function UserAccess({
  admins = [],
  members = [],
}: {
  admins: User[];
  members: User[];
}) {
  return (
    <ScrollView
      contentContainerStyle={styles.accessList}
      showsVerticalScrollIndicator={false}>
      {[...admins, ...members].map((user, index) => (
        <View key={index} style={styles.userCard}>
          <Image
            style={stylesImage.userAvatar}
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>correo electronico</Text>
            <Text style={styles.userRole}>
              {admins.includes(user) ? "Administrador" : "Integrante"}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const queryClient = new QueryClient();

export function ShareGroup(props: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const { id } = useLocalSearchParams();
  const {session} = useSession();
  const { get } = useAxios();
  const [group, setGroup] = useState<Groups | undefined>();

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await get(`/group/${id}`, session);
        setGroup(response.data);
      } catch (error) {}
    };

    fetchGroupData();
  }, [session, id]);

  let idUser: any;

  if (session) {
    idUser = jwtDecode(session);
  }

  const isAdmin = group?.admins.some((admin) => admin._id === idUser?.sub);

  return (
    <>
      {isAdmin ? (
        <View style={{ flex: 1 }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={
                    styles.modalTitle
                  }>{`Compartir "${group?.name}"`}</Text>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.container}>
                  <SwitchComponent onResults={setSearch} />
                  {search !== "" && (
                    <QueryClientProvider client={queryClient}>
                      <UserSearch search={search} />
                    </QueryClientProvider>
                  )}
                </ScrollView>
                <Text style={styles.modalSubtitle}>Personas con acceso</Text>
                <UserAccess
                  admins={group?.admins || []}
                  members={group?.members || []}
                />
                <View style={styles.buttonRow}>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Feather name="link" size={20} color="white" />
                    <Text style={styles.textStyle}>Copiar enlace</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Hecho</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Compartir grupo"
              onPress={() => setModalVisible(true)}
            />
          </DrawerContentScrollView>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: 320,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  accessList: {
    paddingVertical: 10,
    height: 200,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  userEmail: {
    fontSize: 12,
    color: "#555",
  },
  userRole: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "auto",
  },
  button: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 7,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
});

const stylesImage = StyleSheet.create({
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
