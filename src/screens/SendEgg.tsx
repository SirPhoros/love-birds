import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Alert, Text } from 'react-native'
import { Button } from 'react-native-elements'
import SelectDropdown from 'react-native-select-dropdown'
import { UserContext } from '../../Context/UserContext'
import { useContext } from 'react'
import { uploadMediaFromGallery, uploadText } from '../../utils'
import CameraFeature from '../Camera/CameraFeature'
import * as ImagePicker from 'expo-image-picker'

const SendEgg: React.FC = () => {
	const [message, setMessage] = useState('')
	const games: string[] = [
		'Snake',
		'Quiz',
		'Guess the Song',
		'Eat Pizza',
		'Go to Paris',
		'Football',
		'Kill a Man',
	]
	const messages: string[] = ['Message', 'Image', 'Send a Snap']
	const [selectedGame, setSelectedGame] = useState('')
	const [messageForm, setMessageForm] = useState('')
	const [file, setFile] = useState('')
	const { profileId } = useContext(UserContext)
	const { username, partner_username } = profileId
	const [showCamera, setShowCamera] = useState(false) //added x camera feat
	console.log('selectedGame:', selectedGame)
	console.log('selectedMessageForm:', messageForm)
	let messageText: string

	const handleFileSelection = () => {
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
						if (!result.canceled) {
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
	function MessageInput() {
		return (
			<>
				<View style={styles.textContainer}>
					<TextInput
						style={styles.textInput}
						placeholder="Enter your message"
						onChangeText={(newText) => {
							messageText = newText
						}}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						title="Send"
						onPress={() => {
							Alert.alert('Message Sent!')
							setMessage(messageText)
							uploadText(messageText, { partner_username, username }) //to fix once we can pass the stuff from database
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: '#EF7C8E' }}
					/>
				</View>
			</>
		)
	}

	function UploadImage() {
		return (
			<>
				<View style={styles.buttonContainerUploadImg}>
					<Button
						title="Select Image"
						onPress={handleFileSelection}
					/>
				</View>
				<View style={styles.textContainer}>
					<TextInput
						style={styles.textInput}
						placeholder="Add a caption? (Optional)"
						onChangeText={(newText) => {
							console.log(newText)
							messageText = newText
						}}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						title="Send"
						onPress={() => {
							Alert.alert('Image Sent!')
							setMessage(messageText)
							uploadMediaFromGallery(file, { partner_username, username }, messageText)
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: '#EF7C8E' }}
					/>
				</View>
			</>
		)
	}

	function Upload() {
		return (
			<>
				{messageForm === 'Message' ? (
					<MessageInput />
				) : messageForm === 'Image' ? (
					<UploadImage />
				) : (
					showCamera && <CameraFeature onClose={() => setShowCamera(false)} />
				)}
			</>
		)
	}

	return (
		<View style={styles.container}>
			<Text>Select Message Type:</Text>
			<View style={styles.buttonContainer}>
				<SelectDropdown
					buttonStyle={{ backgroundColor: '#D8A7B1' }}
					data={messages}
					onSelect={(selectedItem, index) => {
						setMessageForm(selectedItem)
						setShowCamera(selectedItem === 'Send a Snap')
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						return selectedItem
					}}
					rowTextForSelection={(item, index) => {
						return item
					}}
				/>
			</View>
			<Text>Select Game for Partner:</Text>
			<View style={styles.buttonContainer}>
				<SelectDropdown
					buttonStyle={{ backgroundColor: '#D8A7B1' }}
					data={games}
					onSelect={(selectedItem, index) => {
						setSelectedGame(selectedItem)
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						return selectedItem
					}}
					rowTextForSelection={(item, index) => {
						return item
					}}
				/>
			</View>
			<View>{messageForm.length > 0 ? <Upload /> : null}</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textContainer: {
		width: 300,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 15,
		marginBottom: 10,
		height: 100,
		textAlign: 'center',
	},
	textInput: {
		height: 40,
		paddingHorizontal: 10,
	},
	buttonContainer: {
		alignSelf: 'center',
		width: '45%',
		backgroundColor: '#f2daa4',
		borderRadius: 50,
		marginBottom: 20,
		marginTop: 10,
		borderWidth: 2,
		borderColor: 'brown',
		overflow: 'hidden',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonContainerUploadImg: {
		width: '70%',
		alignSelf: 'center',
		marginBottom: 10,
		borderColor: 'brown',
		backgroundColor: '#f2daa4',
		borderRadius: 50,
	},
})

export default SendEgg
