import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import About from './src/screens/About';
import SendEgg from './src/screens/SendEgg';
import Nest from './src/screens/Nest';
import Game from './src/screens/Game';
import MyEgg from './src/screens/MyEgg';
import Relationship from './src/Profile_Children/Relationship';
import 'react-native-gesture-handler';
import Welcome from './src/SignIn_Children/Welcome';
import Register from './src/SignIn_Children/RegisterPage';
import LogIn from './src/SignIn_Children/LogIn';

import { UserContextProvider } from './Context/UserContext';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomeTabs() {
  return (
  <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: {
              backgroundColor: '#eb8cda',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            tabBarStyle: {
              backgroundColor: '#eb8cda', //nav bar bg colour
            },
            tabBarActiveTintColor: '#8ceb9d', //nav bar active icon colour
            tabBarInactiveTintColor: '#fff', //nav bar inactive icons colour
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Send Egg') {
                iconName = 'send';
              } else if (route.name === 'Profile') {
                iconName = 'user';
              } else if (route.name === 'About') {
                iconName = 'info';
              }

              return <Icon name={iconName} type="font-awesome" color={color} size={size} />;
            },
          })}
        >
		<Tab.Screen name="Home" component={Home}/>
		<Tab.Screen name="Send Egg" component={SendEgg} />
		<Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="About" component={About} />
	</Tab.Navigator>
  )
}

function ProfileTabs() {
  return (
    	<Tab.Navigator>
		<Tab.Screen name="Home" component={Home} />
		<Tab.Screen name="Send Egg" component={SendEgg} />
		<Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="About" component={About} />
	</Tab.Navigator>
  )
}

function SendEggTabs () {
  return (
    	<Tab.Navigator >
		<Tab.Screen name="Home" component={Home} />
		<Tab.Screen name="Send Egg" component={SendEgg} />
		<Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="About" component={About} />
	</Tab.Navigator>
  )
}

function RelationshipTabs () {
  return (
    	<Tab.Navigator>
		<Tab.Screen name="Home" component={Home} />
		<Tab.Screen name="Send Egg" component={SendEgg} />
		<Tab.Screen name="Profile" component={Profile}/>
    <Tab.Screen name="About" component={About} />
	</Tab.Navigator>
  )
}

function NestTabs () {
  return (
    	<Tab.Navigator>
		<Tab.Screen name="Home" component={Home} />
		<Tab.Screen name="Send Egg" component={SendEgg} />
		<Tab.Screen name="Profile" component={Profile}/>
    <Tab.Screen name="About" component={About} />
	</Tab.Navigator>
  )
}

function App() {
  return (
    <UserContextProvider>
    <NavigationContainer>
   <Stack.Navigator screenOptions={{ headerStyle: {
        backgroundColor: 'pink',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }}}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Home" component={HomeTabs} options={{title: '🐣💖🐣💖🐣💖'}}/>
		      <Stack.Screen name="Send Egg" component={SendEggTabs} options={{headerShown: false}}/>
		      <Stack.Screen name="Nest" component={NestTabs} />
		      <Stack.Screen name="Game" component={Game} />
		      <Stack.Screen name="My Egg" component={MyEgg} />
        <Stack.Screen name="Profile" component={ProfileTabs} options={{title: 'Profile'}}/>
       <Stack.Screen name="Relationship" component={RelationshipTabs} />
       <Stack.Screen name="About" component={About} options={{headerShown: false, title: 'About'}}/>
    </Stack.Navigator>
    </NavigationContainer>
    </UserContextProvider>
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


// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from './src/screens/Home';
// import Profile from './src/screens/Profile';
// import About from './src/screens/About';
// import SendEgg from './src/screens/SendEgg';
// import Nest from './src/screens/Nest';
// import Game from './src/screens/Game';
// import MyEgg from './src/screens/MyEgg';
// import Relationship from './src/Profile_Children/Relationship';
// import 'react-native-gesture-handler';
// import Welcome from './src/SignIn_Children/Welcome';
// import Register from './src/SignIn_Children/RegisterPage';
// import LogIn from './src/SignIn_Children/LogIn';

// import { UserContextProvider } from './Context/UserContext';

// const Stack = createNativeStackNavigator()
// const Tab = createBottomTabNavigator()

// function HomeStack () {
// 	return (
// 			<Stack.Navigator screenOptions={{ headerStyle: {
//           backgroundColor: 'red',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         }}}>
          
//           <Stack.Screen name="Home" component={Home} options={{title: 'Home'}}/>
// 		      <Stack.Screen name="Send Egg" component={SendEgg} />
// 		      <Stack.Screen name="Nest" component={Nest} />
// 		      <Stack.Screen name="Game" component={Game} />
// 		      <Stack.Screen name="My Egg" component={MyEgg} />
//           <Stack.Screen name="Welcome" component={Welcome} />
//           <Stack.Screen name="Register" component={Register} />
//           <Stack.Screen name="LogIn" component={LogIn} />
          
//       </Stack.Navigator>
// 	)
// }

// function ProfileStack () {
//   return (
//     <Stack.Navigator screenOptions={{ headerStyle: {
//         backgroundColor: 'red',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       }}}>
        
//         <Stack.Screen name="Profile" component={Profile} options={{title: 'Profile'}}/>
//        <Stack.Screen name="Relationship" component={Relationship} />

//     </Stack.Navigator>
// )
// }


// function App() {
//   return (
//     // Navbar below //
//     <UserContextProvider>
//     <NavigationContainer>
// 	<Tab.Navigator screenOptions={{ headerStyle: {
//           backgroundColor: 'red',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         }}}>
// 		<Tab.Screen name="Home" component={HomeStack} options={{headerShown: false}}/>
// 		<Tab.Screen name="Send Egg" component={SendEgg} />
// 		<Tab.Screen name="Profile" component={ProfileStack} options={{headerShown: false}}/>
//     <Tab.Screen name="About" component={About} />
// 	</Tab.Navigator>
//     </NavigationContainer>
//     </UserContextProvider>
//   );
// }

// export default App;
