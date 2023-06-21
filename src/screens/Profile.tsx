import React, { useContext, useEffect, useState } from 'react'
import { View, Alert, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { Text, Button, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../Context/UserContext'
import * as ImagePicker from 'expo-image-picker'
import LoveBirds from '../../assets/LoveBirds.png'

import {
	checkRelationship,
	getUserData,
	logOut,
	removePartner,
	updatePartner,
	updateProfilePicture,
} from '../../utils'


export default function Profile() {
	const nav = useNavigation()
	const { profileId, setProfileId } = useContext(UserContext)
	const [file, setFile] = useState('')
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkRelationship(profileId.partner_username)
		getUserData().then((userData: any) => {
			setProfileId(userData)
			setLoading(false);
		})
	}, [])

	/* Loading State */
	if (loading) {
		return (
		  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0fb5fe' }}>
			<ActivityIndicator size="large" color="#D8A7B1" />
		  </View>
		);
	  }

	let newPartner: string = ''

	const handleImageUpdate = () => {
		ImagePicker.requestMediaLibraryPermissionsAsync()
			.then(({ status }) => {
				if (status !== 'granted') {
					return
				}

				const options = {
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				}

				ImagePicker.launchImageLibraryAsync(options)
					.then((result) => {
						if (!result.canceled) {
							setFile(result.assets[0].uri)
						}
						 Alert.alert('Profile updated')
					})
					.catch((error) => {
						Alert.alert('Image Not Found', error)
					})
			})
			.catch((error) => {
				Alert.alert('Permission request failed: ', error)
			})
	}

	function RelationshipTextInput() {
		return (
			<>
				<TextInput
					placeholder="Type your partner's name"
					onChangeText={(newText) => {
						newPartner = newText
					}}
					style={styles.textContainer}
				></TextInput>
				<View style={styles.buttonContainer}>
					<Button
						title="Add Relationship"
						onPress={() => {
							setProfileId({ ...profileId, partner_username: newPartner })
							updatePartner(newPartner).then(() => {})
							Alert.alert('Relationship updated with ' + newPartner)
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: '#EF7C8E' }}
					/>
				</View>
			</>
		)
	}

	function SyncRelationship() {
		return (
			<>
				<View style={styles.syncButtonContainer}>
					<Button
						title="Pair"
						onPress={() => {
							Alert.alert('Syncing...')
							checkRelationship(profileId.partner_username).then(() => {
								getUserData().then((userData: any) => {
									setProfileId(userData)
								})
							})
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: 'blue' }}
					/>
				</View>
			</>
		)
	}

	function EditRelationship() {
		return (
			<>
				<Button
					title="Break Up"
					onPress={() => {
						Alert.alert('Left Relationship')
						removePartner()
						setProfileId({
							...profileId,
							partner_username: newPartner,
							in_relationship: false,
						})
					}}
					buttonStyle={{ backgroundColor: '#f21fa9', padding: 10, margin: 20, borderRadius:50 }}
				/>
			</>
		)
	}

	function SignOutButton() {
		return (
			<>
				<View style={styles.buttonContainer}>
					<Button
						title="Log Out"
						onPress={() => {
							logOut()
							nav.navigate('Welcome' as never)
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: '#EF7C8E' }}
					/>
				</View>
			</>
		)
	}

	return (
		<>
		  <ScrollView contentContainerStyle={styles.contentContainer}>
			<View
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					justifyContent: 'flex-start',
					alignItems: 'center',
					backgroundColor: '#0fb5fe',
				}}
			>
				<View style={styles.userContainer}>
					<Text className="font-bold text-white text-2xl self-center" style={styles.userText}>Username: {profileId.username}</Text>
					<Text className="py-2 self-center" style={styles.userText}>Email: {profileId.email}</Text>
				</View>
				<Image
					style={{
						resizeMode: 'contain',
						height: 200,
						width: 200,
						borderRadius: 100,
						marginBottom: 30
					}}
					source={LoveBirds}
				/>
				<View style={styles.uploadImgButtonContainer}>
					<Button
						title="Upload Avatar"
						onPress={() => {
							handleImageUpdate()
							updateProfilePicture(file)
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: '#EF7C8E' }}
					/>
				</View>
				<View className="py-2">
					{profileId.in_relationship === false ? (
						<Text style={styles.text}>Add a relationship to get started!</Text>
					) : (
						<Text style={styles.text}>{'In Relationship With: ' + profileId.partner_username}</Text>
					)}
				</View>
				<View>
					{profileId.in_relationship === false ? (
						<RelationshipTextInput />
					) : (
						<EditRelationship />
					)}
				</View>
				<View>
					{profileId.partner_username.length > 0 || profileId.in_relationship === true? null: (
						<>
							{/* <Text className="pt-12 pb-2" style={styles.text}>
								Trying to partner with: {profileId.partner_username}
							</Text> */}
							<SyncRelationship />
						</>
					)}
				</View>
				<View>
					<View>
						<SignOutButton />
					</View>
				</View>
			</View>
		  </ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		position: 'absolute',
		bottom: -90,
		alignSelf: 'center',
		width: 160,
		backgroundColor: '#f2daa4',
		borderRadius: 50,
		marginBottom: 10,
		marginTop: 10,
		borderWidth: 3,
		borderColor: 'brown',
		overflow: 'hidden',
	},
	textContainer: {
		width: 350,
		borderWidth: 1,
		borderColor: 'gray',
		backgroundColor: '#fff',
		borderRadius: 15,
		marginBottom: 10,
		height: 50,
		textAlign: 'center',
	},
	text: {
		color: '#FAE8E0',
		fontSize: 20,
		fontWeight: 'bold'
	},
	userContainer: {
		padding: 10,
		marginTop: 30
	},
	userText: {
		color: '#FAE8E0',
		fontSize: 20,
		fontWeight: 'bold'
	},
	syncButtonContainer: {
		alignSelf: 'center',
		width: 100,
		backgroundColor: '#f2daa4',
		borderRadius: 50,
		marginBottom: 1,
		marginTop: 1,
		borderWidth: 2,
		borderColor: 'brown',
		overflow: 'hidden',
	},
	uploadImgButtonContainer: {
		alignSelf: 'center',
		width: 160,
		height: 45,
		backgroundColor: '#f2daa4',
		borderRadius: 50,
		marginBottom: 10,
		marginTop: 1,
		borderWidth: 3,
		borderColor: 'brown',
		overflow: 'hidden',
	},
	contentContainer: {
		paddingVertical: 350
	  }
})
