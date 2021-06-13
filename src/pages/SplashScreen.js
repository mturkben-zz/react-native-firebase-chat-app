import React from "react";
import {Text, View,} from "react-native"
import {mainStyle} from "../stylesheet";
import * as Font from "expo-font"

const SplashScreen = ({navigation}) => {
	
	
	const [load, setLoad] = React.useState(false);
	
	const fonts = {
		"Titillium-Light": require('../../assets/fonts/TitilliumWeb-Light.ttf'),
		"Titillium-Regular": require('../../assets/fonts/TitilliumWeb-Regular.ttf'),
		"Titillium-Bold": require('../../assets/fonts/TitilliumWeb-Bold.ttf'),
		"Titillium-Black": require('../../assets/fonts/TitilliumWeb-Black.ttf'),
		"Titillium-ExtraLight": require('../../assets/fonts/TitilliumWeb-ExtraLight.ttf'),
	}
	
	
	React.useEffect(() => {
		loadFont();
	}, [])
	
	React.useEffect(() => {
		if (load) {
			setTimeout(() => navigation.reset({
				index: 0,
				routes: [{name: 'LoginScreen'}]
			}), 1000)
		}
	}, [load])
	
	
	const loadFont = async () => {
		await Font.loadAsync(fonts)
		setLoad(true);
	}
	
	
	return (
		<View style={mainStyle.container}>
			<Text> React-Native Firebase Chat App </Text>
		</View>
	)
}


export {
	SplashScreen
}
