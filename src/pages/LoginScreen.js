import React, {useEffect, useState} from "react";
import {
	Animated,
	Dimensions,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ToastAndroid
} from "react-native";
import {mainStyle} from "../stylesheet";
import {Ionicons} from '@expo/vector-icons';
import {auth} from "../configs/firabase"
import Alert from 'react-native-awesome-alerts';

const {width, height} = Dimensions.get("window")

const BOTTOM_COLOR = "#7952b3";

const LoginScreen = ({navigation}) => {
	
	const user = auth.currentUser || null;
	
	const [alert, setAlert] = useState(false);
	const [alertData, setAlertData] = useState({
		title: "Error",
		message: "Try Again"
	});
	
	const [ref, setRef] = useState(null);
	const textAnim = new Animated.Value(0);
	const [page, setPage] = useState(true);
	
	const [loginData, setLoginData] = useState({});
	const [signData, setSignData] = useState({});
	
	
	useEffect(() => {
		Animated.timing(textAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: false
		}).start();
	}, [page])
	
	
	const scroll = ({nativeEvent}) => {
		if (nativeEvent.contentOffset.x === nativeEvent.layoutMeasurement.width) {
			setPage(false);
		} else if (nativeEvent.contentOffset.x === 0) {
			setPage(true);
		}
	};
	
	
	const signUp = async () => {
		try {
			await auth.signInWithEmailAndPassword(loginData.email, loginData.password);
		} catch (e) {
			showAlert(e.code,e.message)
		}
		
		setLoginData({})
		
		navigation.reset({
			index: 0,
			routes: [{
					name: 'HomeScreen',
				}]
		})
	}
	
	
	const createUser = async () => {
		try {
			await auth.createUserWithEmailAndPassword(signData.email, signData.password);
		} catch (e) {
			showAlert(e.code, e.message)
		}
		
		if (user) {
			user.updateProfile({
				displayName: signData.nickname,
			}).catch(e => {
				showAlert(e.code, e.message)
			}).then(()=> {
				ref.scrollTo({x: 0, y: 0, animated: true})
				ToastAndroid.show("Successfuly",ToastAndroid.LONG)
			});
		}
		
	}
	
	
	const showAlert = (title, message) => {
		setAlertData({title, message})
		setAlert(true)
	}
	
	return (
		<View style={mainStyle.container}>
			<KeyboardAvoidingView style={style.main} behavior="height" keyboardVerticalOffset={-150}>
				<Animated.Text style={[style.headText, {
					opacity: textAnim.interpolate({
						inputRange: [0, 0.5, 1],
						outputRange: [1, 0, 1]
					})
				}
				]}>
					{page ? "Login Screen" : "Register Screen"}
				</Animated.Text>
				<View style={style.area}>
					
					<ScrollView
						ref={ref => setRef(ref)}
						style={{
							width: "100%",
							height: "100%",
							flexDirection: "row",
							flexWrap: "nowrap"
						}}
						onScroll={e => scroll(e)}
						pagingEnabled
						horizontal
					>
						<View style={style.items}>
							<TextInput
								style={style.inputs}
								value={loginData.username}
								onChangeText={val => setLoginData({...loginData, email: val})}
								placeholder="E-mail"
								keyboardType="email-address"
							/>
							<TextInput
								style={style.inputs}
								value={loginData.password}
								onChangeText={val => setLoginData({...loginData, password: val})}
								placeholder="Password"
								secureTextEntry
							/>
							
							<TouchableOpacity
								style={style.loginButton}
								onPress={() => signUp()}
							>
								<Text style={style.buttonsText}> Login </Text>
							</TouchableOpacity>
							
							<TouchableOpacity style={[style.loginButton, {
								borderColor: "#f54748"
							}]}>
								<Text style={style.buttonsText}> Login With Google </Text>
							</TouchableOpacity>
							
							<TouchableOpacity
								onPress={() => ref.scrollToEnd({animated: true})}
								style={style.bottomButton}
							>
								<Text style={style.bottomButtonText}> Register </Text>
								<Ionicons name="chevron-forward-outline" style={style.bottomIcon}/>
							</TouchableOpacity>
						
						</View>
						<View style={style.items}>
							<TextInput
								style={style.inputs}
								value={signData.nickname}
								onChangeText={val => setSignData({...signData, nickname: val})}
								placeholder="Nickname"
							/>
							<TextInput
								style={style.inputs}
								value={signData.username}
								onChangeText={val => setSignData({...signData, email: val})}
								placeholder="E-mail"
								keyboardType="email-address"
							/>
							<TextInput
								style={style.inputs}
								value={signData.password}
								onChangeText={val => setSignData({...signData, password: val})}
								placeholder="Password"
								secureTextEntry
							/>
							
							<TouchableOpacity
								style={[style.loginButton, {
									borderColor: "#005792"
								}]}
								onPress={() => createUser()}
							>
								<Text style={style.buttonsText}> Register </Text>
							</TouchableOpacity>
							
							
							<TouchableOpacity style={[style.loginButton, {
								borderColor: "#f54748"
							}]}>
								<Text style={style.buttonsText}> Sign With Google </Text>
							</TouchableOpacity>
							
							<TouchableOpacity
								style={style.bottomButton}
								onPress={() => ref.scrollTo({x: 0, y: 0, animated: true})}
							>
								<Ionicons name="chevron-back-outline" style={style.bottomIcon}/>
								<Text style={style.bottomButtonText}> Login </Text>
							</TouchableOpacity>
						
						</View>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
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
		</View>
	)
}


const style = StyleSheet.create({
	main: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		padding: "5%",
	},
	area: {
		width: "100%",
		height: "70%",
		backgroundColor: "#fff",
		elevation: 2,
		borderRadius: 4,
	},
	headText: {
		fontSize: 30,
		lineHeight: 35,
		fontFamily: "Titillium-Light"
	},
	items: {
		width: width / 1.1,
		height: height / 2,
		alignItems: "center",
		justifyContent: "center"
	},
	inputs: {
		backgroundColor: "#f3f3f3",
		width: "90%",
		marginVertical: "2.5%",
		padding: "2%",
		marginHorizontal: "5%",
		borderRadius: 5,
		fontFamily: "Titillium-Light",
		color: "#333"
	},
	loginButton: {
		width: "90%",
		marginVertical: "2.5%",
		padding: "2%",
		marginHorizontal: "5%",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#77acf1"
	},
	buttonsText: {
		fontFamily: "Titillium-Regular",
		textAlign: "center"
	},
	bottomButton: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		position: "absolute",
		bottom: 0,
		margin: "2%",
	},
	bottomButtonText: {
		fontFamily: "Titillium-Light",
		color: BOTTOM_COLOR,
		fontSize: 20,
		paddingVertical: "2%",
	},
	bottomIcon: {
		color: BOTTOM_COLOR,
		fontSize: 20,
	}
})

export {
	LoginScreen
}
