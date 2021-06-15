import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../configs/firabase";
import { mainStyle } from "../stylesheet";
import Alert from "react-native-awesome-alerts";
import Messages from "../components/Messages";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const user = auth.currentUser;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "Error",
    message: "Try Again",
  });

  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    authDB();
  }, []);

  const authDB = async () => {
    let msg = []
    await db
      .collection("message")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          msg = [...msg, { id: doc.id, data: doc.data() }];
        });
      });
    setLoading(true)
    setMessages(msg.sort());
  };

  const sendMessage = async () => {
    const doc_id = `${parseInt(messages[messages.length - 1].id) + 1}`;
    const date = new Date();
    const createdAt = date.toLocaleString();
    const { uid, displayName: userName } = user;

    await db.collection("message").doc(doc_id).set({
      text: userMessage,
      uid,
      userName,
      createdAt,
    });
    authDB();
  };

  const showAlert = (title, message) => {
    setAlertData({ title, message });
    setAlert(true);
  };

  return (
    <SafeAreaView style={mainStyle.container}>
      {loading ? (
        <View style={style.main}>
          <ScrollView style={{ width: "100%", height: "100%", padding: "2%" }}>
            {messages.length > 0
              ? messages.map((m, i) => <Messages key={i} data={m} />)
              : null}
          </ScrollView>
          <View style={style.sendMessageArea}>
            <TextInput
              value={userMessage}
              onChangeText={(val) => setUserMessage(val)}
              placeholder="Go On"
              multiline
              style={style.sendMessageAreaInput}
            />
            <TouchableOpacity
              style={style.sendMessageAreaButton}
              onPress={() => sendMessage()}
            >
              <Ionicons
                name="arrow-forward-circle-outline"
                size={35}
                color="#022E57"
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ActivityIndicator color="#333" />
      )}
      <Alert
        show={alert}
        showProgress={false}
        title={alertData.title}
        message={alertData.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Okey"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setAlert(false);
        }}
        onConfirmPressed={() => {
          setAlert(false);
        }}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F6F5F5",
  },
  sendMessageArea: {
    flexDirection: "row",
  },
  sendMessageAreaInput: {
    width: "85%",
    padding: "1%",
    margin: "1%",
    backgroundColor: "#FAF1E6",
    borderRadius: 25,
  },
  sendMessageAreaButton: {
    width: "15%",
    zIndex: 5,
    padding: "1%",
    margin: "1%",
  },
});

export { HomeScreen };
