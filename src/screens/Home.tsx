import React, { useContext, useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../Context/UserContext'
import { checkUser, getUserData } from '../../utils'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SendEgg from './SendEgg'
import Profile from './Profile'
import About from './About'


const Tab = createBottomTabNavigator()

function Home() {
	const nav = useNavigation()
	const { profileId, setProfileId } = useContext(UserContext)

	//Research about useEffect and why it is not reRendering
	useEffect(() => {
		getUserData().then((userData: any) => {
			setProfileId(userData)
		})
	}, [])
  
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button
				title="🪹"
				onPress={() => nav.navigate('Nest' as never)}
			/>
			<Button
				title="🥚"
				onPress={() => nav.navigate('Send Egg' as never)}
			/>
			{/* Button here for now, will default with context */}
			<Button
				title="Go to Welcome Page"
				onPress={() => nav.navigate('Welcome' as never)}
			/>
		</View>
	)
}

export default Home
