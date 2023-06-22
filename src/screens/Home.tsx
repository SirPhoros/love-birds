import React, { useContext, useEffect, useState } from 'react'
import { Button, Text, View, Image, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../Context/UserContext'
import { checkConnection, getUserData } from '../../utils'
import { TouchableOpacity } from 'react-native'
import Egg from '../../assets/Egg.png'
import Nest from '../../assets/Nest.png'
import { ActivityIndicator } from 'react-native'

function Home() {
	const nav = useNavigation()
	const { profileId, setProfileId } = useContext(UserContext)
	const [loading, setLoading] = useState(true)
	const { in_relationship } = profileId

	//Research about useEffect and why it is not reRendering
	useEffect(() => {
		const isConnected = checkConnection()
		if (!isConnected) {
			Alert.alert('Connection Lost', `Please, log in again`, [
				{
					text: 'Go back',
					onPress: () => {
						nav.navigate('Welcome' as never)
					},
				},
			])
		}
		if (isConnected) {
			getUserData().then((userData: any) => {
				setProfileId(userData)
				setLoading(false)
			})
		}
	}, [])

	/* Loading State */
	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#0fb5fe',
				}}
			>
				<ActivityIndicator
					size="large"
					color="#D8A7B1"
				/>
			</View>
		)
	}

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#0fb5fe',
			}}
		>
			<View className="py-5 self-center">
			
			</View>
			<View className="py-5 px-10 self-center">
				<Text className="font-bold text-white text-2xl text-center">
					Exchange gifts and hatch eggs with your loved one!
				</Text>
			</View>
			<TouchableOpacity onPress={() => nav.navigate('Nest' as never)}>
				<Image
					source={Nest}
					style={styles.image}
				/>
				<View className="self-center">
					<Text className="font-bold text-white text-xl">Lovers' Nest</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					if (in_relationship) {
						nav.navigate('Send Egg' as never)
					} else {
						Alert.alert('Careful', `You haven't established a relationship!`, [
							{
								text: 'Go to Profile',
								onPress: () => {
									nav.navigate('Profile' as never)
								},
							},
						])
					}
				}}
			>
				<Image
					source={Egg}
					style={styles.image}
				/>
			</TouchableOpacity>
			<View className="py-5 self-center">
				<Text className="font-bold text-white text-xl">
					Send an egg to your partner
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
		width: 200,
		height: 200,
	},
})

export default Home
