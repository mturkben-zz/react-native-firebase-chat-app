import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {LoginScreen,SplashScreen,HomeScreen} from "./pages"

import Header from "./components/Header";

const Router = () => {
	const Stack = createStackNavigator();
	
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen name="SplashScreen" component={SplashScreen} />
				<Stack.Screen 
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: true,
            header: (...args) => <Header data={args}/>
          }} 
        />
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Router
