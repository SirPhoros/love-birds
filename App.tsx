import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { UserContextProvider } from './Context/UserContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SendEgg from './src/screens/SendEgg';
import Profile from './src/screens/Profile';
import About from './src/screens/About';
import Welcome from './src/SignIn/Welcome';
import Register from './src/SignIn/RegisterPage';
import LogIn from './src/SignIn/LogIn';
import Nest from './src/screens/Nest';
import Game from './src/screens/Game';
import MyEgg from './src/screens/MyEgg';
import Relationship from './src/screens/Relationship';
import Snake from './src/games/Snake/components/Snake';
import { Icon } from 'react-native-elements';
import SnakeGame from './src/games/Snake/SnakeGame';

const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

function HomeNav() {
  return (
   <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: {
              backgroundColor: '#BA2953', //header bar colour
            },
            headerTintColor: '#FAE8E0', //header bar text colour
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            tabBarStyle: {
              backgroundColor: '#BA2953', //nav bar bg colour
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
		<Tab.Screen name="Home" component={Home} />
		<Tab.Screen name="Profile" component={Profile}/>
    <Tab.Screen name="About" component={About} />
	</Tab.Navigator>
  )
}

function App() {
  return (
    <UserContextProvider>    
    <NavigationContainer>
       <Stack.Navigator
      screenOptions={{ headerStyle: {
        backgroundColor: '#BA2953'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
      }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Home" component={HomeNav} options={{headerShown: false}}/>
        <Stack.Screen name="Send Egg" component={SendEgg}/>
		      <Stack.Screen name="Nest" component={Nest} />
		      <Stack.Screen name="Game" component={Game} />
           <Stack.Screen name="Snake Game" component={SnakeGame} />
		      <Stack.Screen name="My Egg" component={MyEgg} />
       <Stack.Screen name="Relationship" component={Relationship} />
    </Stack.Navigator>
    </NavigationContainer>
    </UserContextProvider>
  );
}

export default App;