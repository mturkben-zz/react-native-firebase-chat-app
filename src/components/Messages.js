import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Messages = ({data}) => {

  const { data: user} = data;
  const date = new Date(user.createdAt.seconds*1000)

  console.log(user)
  
  return (
    <View style={style.container}>
      <View style={style.messageArea}>
        <Text style={style.userID}>{user.userName}</Text>
        <Text style={style.mainText}>{"   " + user.text}</Text>
      </View>
      <Text style={style.dateText}> {date.toLocaleString()} </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginVertical: "2%",
  },
  messageArea: {
    maxWidth: "80%",
    backgroundColor: "#FDFAF6",
    borderRadius: 5,
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
