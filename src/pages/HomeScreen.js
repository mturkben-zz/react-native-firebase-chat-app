import React, {useEffect, useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import {auth, db} from "../configs/firabase"
import {mainStyle} from "../stylesheet";
import Alert from "react-native-awesome-alerts";

const HomeScreen = ({navigation, route}) => {
	
	const user = auth.currentUser;
	const [messages, setMessages] = useState([]);
	
	const [alert, setAlert] = useState(false);
	const [alertData, setAlertData] = useState({
		title: "Error",
		message: "Try Again"
	});
	
	useEffect(() => {
		authDB()
	}, [])
	
	const authDB = async () => {
		await db.collection("message").get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				setMessages([...messages, {
					id: doc.id,
					data: doc.data()
				}])
			});
		});
	}
	
	
	const signOut = async () => {
		
		try {
			await auth.signOut()
		} catch (e) {
			setAlertData(e.code, e.message);
		}
		
		navigation.reset({
			index: 0,
			routes: [{
				name: 'LoginScreen',
			}]
		})
		
		ToastAndroid.show("Successfuly",ToastAndroid.LONG);
		
	}
	
	return (
		<SafeAreaView style={mainStyle.container}>
			<View style={style.header}>
				<View style={{
					flexDirection: "row",
					alignItems: "center"
				}}>
					<Image
						style={{
							width: 50,
							height: 50,
							resizeMode: "contain"
						}}
						source={require("../../assets/profile.png")}
					/>
					<Text style={style.headText}> {user.displayName} </Text>
				</View>
				<View>
					<TouchableOpacity
						onPress={() => signOut()}
					>
						<Text style={style.headExitText}> Sign Out </Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={style.main}>
				<Text> HOME </Text>
			</View>
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
					setAlert(false)
				}}
				onConfirmPressed={() => {
					setAlert(false)
				}}
			/>
		</SafeAreaView>
	)
}


const style = StyleSheet.create({
	header: {
		width: "100%",
		height: "8%",
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
		fontFamily: "Titillium-Light"
	},
	headExitText: {
		fontSize: 16,
		fontFamily: "Titillium-Regular",
		
	},
	main: {
		height: "92%",
		width: "100%",
	}
})


export {
	HomeScreen
}
