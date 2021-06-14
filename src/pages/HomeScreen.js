import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from "react-native";
import { db } from "../configs/firabase";
import { mainStyle } from "../stylesheet";
import Alert from "react-native-awesome-alerts";
import Messages from "../components/Messages";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
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
    await db
      .collection("message")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setMessages([
            ...messages,
            {
              id: doc.id,
              data: doc.data(),
            },
          ]);
        });
      });
    setLoading(true);
  };

  const sendMessage = () => {};

  return (
    <SafeAreaView style={mainStyle.container}>
      {loading ? (
        <View style={style.main}>
          <ScrollView style={{padding: "2%"}}>
            {messages.length > 0
              ? messages.map((m, i) => <Messages key={i} data={m} />)
              : null}
          </ScrollView>
          <View style={style.sendMessageArea}>
            <TextInput
              value={userMessage}
              onChangeText={(val) => setUserMessage(val)}
              placeholder="Put a Value"
              style={style.sendMessageAreaInput}
            />
            <TouchableOpacity>
              <Ionicons name="chevron-back-outline" size={35} color="#444"/>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ActivityIndicator />
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
    height: "92%",
    width: "100%",
  },
  sendMessageArea: {
    width: "100%",
    height: 50,
    backgroundColor: "red",
    padding: "1%",
  },
  sendMessageAreaInput: {

  },
});

export { HomeScreen };
