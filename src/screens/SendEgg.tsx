import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Alert, Text } from 'react-native'
import { Button } from 'react-native-elements'
import SelectDropdown from 'react-native-select-dropdown'
import { UserContext } from '../../Context/UserContext'
import { useContext } from 'react'
import { uploadMedia, uploadText } from '../../utils'
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
	const messages: string[] = ['Message', 'Image']
	const [selectedGame, setSelectedGame] = useState('')
	const [messageForm, setMessageForm] = useState('')
	const [file, setFile] = useState(null)
	const { profileId } = useContext(UserContext)
	const { username, partner_username } = profileId
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
					mediaTypes: ImagePicker.MediaTypeOptions.All,
					allowsEditing: true,
					quality: 1,
				}

				ImagePicker.launchImageLibraryAsync(options)
					.then((result) => {
						console.log(result)

						if (!result.cancelled) {
							setFile(result)
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
							console.log(newText)
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
							console.log('messageText:', messageText)
							uploadText(messageText, { partner_username, username })
						}}
						//   onPress={handleSendMessage} //to fix once we can pass the stuff from database
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
				<Button
					title="Select Image"
					onPress={handleFileSelection}
				/>
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
							console.log('File in SendEgg', file)
							uploadMedia(file, { partner_username, username })
							console.log('message state:', message)
							console.log('messageText:', messageText)
						}}
						//   onPress={handleSendMessage} //to fix once we can pass the stuff from database
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: '#EF7C8E' }}
					/>
				</View>
			</>
		)
	}

	function Upload() {
		return <>{messageForm === 'Message' ? <MessageInput /> : <UploadImage />}</>
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
})

export default SendEgg
