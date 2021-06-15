import React from "react";
import { View, Text, Image, TouchableOpacity, ToastAndroid } from "react-native";
import { auth } from "../configs/firabase";
import { StatusBar } from "expo-status-bar";

const Header = ({data}) => {

  const navigation = data[0].navigation;
  const user = auth.currentUser !== undefined ? auth.currentUser : null;

  const style = {
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#e1f4f3",
      elevation: 4,
    },
    headText: {
      fontSize: 20,
      fontFamily: "Titillium-Light",
    },
    headExitText: {
      fontSize: 16,
      fontFamily: "Titillium-Regular",
    },
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      setAlertData(e.code, e.message);
    }

    navigation.reset({
      index: 0,
      routes: [
        {
          name: "LoginScreen",
        },
      ],
    });

    ToastAndroid.show("Successfuly", ToastAndroid.LONG);
  };

  return (
    <>
      <StatusBar
        animated
        backgroundColor="#61dafb"
        barStyle="dark-content"
      />
      <View style={style.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
            }}
            source={require("../../assets/profile.png")}
          />
          <Text style={style.headText}> {user.displayName} </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => signOut()}>
            <Text style={style.headExitText}> Sign Out </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Header;
