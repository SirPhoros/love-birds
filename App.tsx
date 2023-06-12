import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Nav from './src/Nav';
import EggNavigator from './src/Home_Children/SendEggIcon';

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
		  <Nav />
		</NavigationContainer>
	)
}





			// <View className="flex-1 items-center justify-center bg-white">
			// 	<Text className='text-green-500'>In APP</Text>
			// 	<HomePage />
			// 	<StatusBar style="auto" />
			// </View>