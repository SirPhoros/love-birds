import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import About from './src/screens/About';
import SendEgg from './src/screens/SendEgg';
import Nest from './src/screens/Nest';
import Game from './src/screens/Game';
import MyEgg from './src/screens/MyEgg';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomeStack () {
	return (
			<Stack.Navigator screenOptions={{ headerStyle: {
          backgroundColor: 'red',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }}}>
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}}/>
		<Stack.Screen name="Send Egg" component={SendEgg} />
		<Stack.Screen name="Nest" component={Nest} />
		<Stack.Screen name="Game" component={Game} />
		<Stack.Screen name="My Egg" component={MyEgg} />
      </Stack.Navigator>
	)
}

function App() {
  return (
    <NavigationContainer>
	<Tab.Navigator screenOptions={{ headerStyle: {
          backgroundColor: 'red',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }}}>
		<Tab.Screen name="About" component={About} />
		<Tab.Screen name="Home" component={HomeStack} options={{headerShown: false}}/>
		<Tab.Screen name="Send Egg" component={SendEgg} />
		<Tab.Screen name="Profile" component={Profile} />
	</Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

    


// function HomeScreen({ navigation }: HomeScreenProps) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
// 	   <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// function DetailsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//     </View>
//   );
// }