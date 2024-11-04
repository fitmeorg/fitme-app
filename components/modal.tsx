import React, { useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet, Alert } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAxios } from "@/hooks/axiosContext";
import { useSession } from "@/hooks/sessionContext";

export default function ModalActivity() {
  const [modalVisible, setModalVisible] = useState(false);
  const { post } = useAxios();
  const {session} = useSession();

  const activity = (type: string) => {
    return (
      <Text
        style={styles.modalText}
        onPress={async () => {
          await post(`/streak/activity/${type}`, null, session);
          setModalVisible(!modalVisible);
        }}>
        {type.toLowerCase()}
      </Text>
    );
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ marginRight: 10 }}>Actividad</Text>
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
            {activity("FREE")}
            {activity("SPORT")}
            {activity("MY_ROUTINE")}
            {activity("DIET")}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <AntDesign name="check" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
