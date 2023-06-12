import React from "react"
import HomePage from "./HomePage";
import AboutPage from "./Nav_Children/AboutPage";
import ProfilePage from "./ProfilePage";
import SendEggIcon from "./Home_Children/SendEggIcon";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function Nav() {
    const nav = useNavigation();

    return (
      <>
        <Tab.Navigator>
			<Tab.Screen name="Home" component={ HomePage }/>
			<Tab.Screen name="Send Egg" component={ SendEggIcon } />
			<Tab.Screen name="Profile" component={ ProfilePage } />
			<Tab.Screen name="About" component={ AboutPage } />
		</Tab.Navigator>
      </>
    )
}