import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from './src/HomePage'
import SendEggIcon from './src/Home_Children/SendEggIcon';
import ProfilePage from './src/ProfilePage';
import AboutPage from './src/Nav_Children/AboutPage';


const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
		  <Tab.Navigator>
			<Tab.Screen name="Home" component={ HomePage }/>
			<Tab.Screen name="Send Egg" component={ SendEggIcon } />
			<Tab.Screen name="Profile" component={ ProfilePage } />
			<Tab.Screen name="About" component={ AboutPage } />
		  </Tab.Navigator>
		</NavigationContainer>
	)
}















			// <View className="flex-1 items-center justify-center bg-white">
			// 	<Text className='text-green-500'>In APP</Text>
			// 	<HomePage />
			// 	<StatusBar style="auto" />
			// </View>