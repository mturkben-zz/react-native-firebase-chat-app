import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth } from "../configs/firabase";
const Messages = ({ data }) => {
  const _user = auth.currentUser;
  const { data: user } = data;
  
  const status = user.uid === _user.uid;

  if (status) {
    return (
      <View style={[style.container,{
        alignItems: "flex-end"
      }]}>
        <View style={[style.messageArea,{

        }]}>
          <Text style={style.userID}>{user.userName}</Text>
          <Text style={style.mainText}>{"   " + user.text}</Text>
        </View>
        <Text style={style.dateText}> {user.createdAt} </Text>
      </View>
    );
  } else {
    return (
      <View style={style.container}>
        <View style={style.messageArea}>
          <Text style={style.userID}>{user.userName}</Text>
          <Text style={style.mainText}>{"   " + user.text}</Text>
        </View>
        <Text style={style.dateText}> {user.createdAt} </Text>
      </View>
    );
  }
};

const style = StyleSheet.create({
  container: {
    height: 70,
    marginVertical: "2%",
  },
  messageArea: {
    maxWidth: "80%",
    backgroundColor: "#FDFAF6",
    borderRadius: 5,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#FFF5FD",
    paddingVertical: "1%",
    paddingHorizontal: "2%",
  },
  userID: {
    fontSize: 14,
    fontFamily: "Titillium-Regular",
    color: "#1687A7",
  },
  mainText: {
    fontSize: 16,
    fontFamily: "Titillium-Light",
  },
  dateText: {
    fontSize: 10,
    fontFamily: "Titillium-ExtraLight",
  },
});

export default Messages;
