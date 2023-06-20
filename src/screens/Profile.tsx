import React, { useContext, useEffect, useState } from 'react'
import { View, Alert, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { Text, Button, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../Context/UserContext'
import * as ImagePicker from 'expo-image-picker'

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
		  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" color="#D8A7B1" />
		  </View>
		);
	  }

	let newPartner: string = ''

	const handleImageUpdate = () => {
		ImagePicker.requestMediaLibraryPermissionsAsync()
			.then(({ status }) => {
				if (status !== 'granted') {
					console.log('Permission not granted')
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
						console.log('result in Profile: ', result)
						if (!result.canceled) {
							console.log('uri: ', result.assets[0].uri)
							setFile(result.assets[0].uri)
						}
					})
					.catch((error) => {
						console.log('ImagePicker Error: ', error)
					})
			})
			.catch((error) => {
				console.log('Permission request failed: ', error)
			})
	}

	function RelationshipTextInput() {
		return (
			<>
				<TextInput
					placeholder="add partner's name here"
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
							Alert.alert('Bye Bye!')
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
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#0fb5fe',
				}}
			>
				<Text className="text-2xl py-12">Your Profile</Text>
				<Image
					style={{
						resizeMode: 'contain',
						height: 100,
						width: 100,
						borderRadius: 50,
					}}
					source={{
						uri:
							profileId.avatarIMG ||
							'https://img.rawpixel.com/private/static/images/website/2022-05/ns8230-image.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=b3961e17298745c0868eeef46211c3d0',
					}}
				/>
				<View style={styles.uploadImgButtonContainer}>
					<Button
						title="Upload Avatar"
						onPress={() => {
							handleImageUpdate()
							updateProfilePicture(file)
              Alert.alert('Profile updated')
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: '#EF7C8E' }}
					/>
				</View>

				<View className="py-2">
					{profileId.in_relationship === false ? (
						<Text>Add a relationship to get started!</Text>
					) : (
						<Text>{'In Relationship With: ' + profileId.partner_username}</Text>
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
					{profileId.partner_username.length > 0 ? (
						<>
							<Text className="pt-12 pb-2">
								Trying to partner with: {profileId.partner_username}
							</Text>
							<SyncRelationship />
						</>
					) : null}
				</View>
				<View style={{ marginBottom: 35 }}>
					<Text className="pt-12 pb-2">Username: {profileId.username}</Text>
					<Text className="py-2">Email: {profileId.email}</Text>
					<View>
						{profileId.in_relationship === true ? (
						<Button
							title="Relationship Wrapped"
							onPress={() => nav.navigate('Relationship' as never)}
						/>
						) : null}
					</View>
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
		alignSelf: 'center',
		width: '70%',
		backgroundColor: '#f2daa4',
		borderRadius: 50,
		marginBottom: 1,
		marginTop: 1,
		borderWidth: 2,
		borderColor: 'brown',
		overflow: 'hidden',
	},
	textContainer: {
		width: 220,
		borderWidth: 1,
		borderColor: 'gray',
		backgroundColor: '#fff',
		borderRadius: 15,
		marginBottom: 10,
		height: 30,
		textAlign: 'center',
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
		width: '40%',
		height: 45,
		backgroundColor: '#f2daa4',
		borderRadius: 50,
		marginBottom: 1,
		marginTop: 1,
		borderWidth: 2,
		borderColor: 'brown',
		overflow: 'hidden',
	},
	contentContainer: {
		paddingVertical: 330
	  }
})
