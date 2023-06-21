import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Alert, Text } from 'react-native'
import { Button } from 'react-native-elements'
import SelectDropdown from 'react-native-select-dropdown'
import { UserContext } from '../../Context/UserContext'
import { useContext } from 'react'
import { uploadMediaFromGallery, uploadText } from '../../utils'
import CameraFeature from '../Camera/CameraFeature'
import * as ImagePicker from 'expo-image-picker'
import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native'

const SendEgg: React.FC = () => {
	const [message, setMessage] = useState('')
	const games: string[] = ['Snake', 'Quiz']
	const messages: string[] = ['Message', 'Image', 'Send a Snap']
	const [selectedGame, setSelectedGame] = useState('')
	const [gameContent, setGameContent] = useState({})
	const [messageForm, setMessageForm] = useState('')
	const [file, setFile] = useState('')
	const { profileId } = useContext(UserContext)
	const { username, partner_username } = profileId
	const [showCamera, setShowCamera] = useState(false) //added x camera feature
	const [showQuiz, setShowQuiz] = useState(false)
	const [showMessage, setShowMessage] = useState(true)
	const [gameUpdated, setGameUpdate] = useState(false)
	const [showButton, setShowButton] = useState(false)
	const [imageUpload, setImageUpload] = useState(false)

	let messageText: string
	let mediaText: string

	const game = {
		gameName: selectedGame,
		gameContent: gameContent,
	}

	console.log('This is game content:', gameContent)

	const Quiz: React.FC = () => {
		let questionText: string
		let answerOne: string
		let answerTwo: string
		let answerThree: string
		let answerIndex: number

		return (
			<>
				<View className="bg-blue-400 py-8 px-4">
					<Text className="text-white text-lg mb-4">
						Insert questions and answers here! (Don't make them too easy or too
						difficult for your partner!)
					</Text>
					<View className="mb-4">
						<TextInput
							className="border border-gray-300 bg-white rounded-full px-4 py-2"
							placeholder="Enter your question"
							onChangeText={(newText) => {
								questionText = newText
								console.log('question:', questionText)
							}}
						/>
					</View>
					<View className="mb-4">
						<TextInput
							className="border border-gray-300 bg-white rounded-full px-4 py-2"
							placeholder="Enter your first choice"
							onChangeText={(newText) => {
								answerOne = newText
								console.log('1:', answerOne)
							}}
						/>
					</View>
					<View className="mb-4">
						<TextInput
							className="border border-gray-300 bg-white rounded-full px-4 py-2"
							placeholder="Enter your second choice"
							onChangeText={(newText) => {
								answerTwo = newText
								console.log('2:', answerTwo)
							}}
						/>
					</View>
					<View className="mb-4">
						<TextInput
							className="border border-gray-300 bg-white rounded-full px-4 py-2"
							placeholder="Enter your third choice"
							onChangeText={(newText) => {
								answerThree = newText
								console.log('3:', answerThree)
							}}
						/>
					</View>
					<View className="items-center justify-center bg-blue-400 px-4">
						<Text className="text-white text-lg mb-4">
							Which answer is correct?
						</Text>
						<SelectDropdown
							buttonStyle={{
								backgroundColor: '#D8A7B1',
								borderWidth: 2,
								borderRadius: 50,
								borderColor: 'brown',
								marginBottom: 10,
							}}
							data={['Answer 1', 'Answer 2', 'Answer 3']}
							onSelect={(selectedItem, index) => {
								answerIndex = selectedItem
							}}
							buttonTextAfterSelection={(selectedItem, index) => {
								return selectedItem
							}}
							rowTextForSelection={(item, index) => {
								return item
							}}
							dropdownStyle={{ backgroundColor: '#FAE8E0' }}
						/>
					</View>
					<View>
						<Button
							title="Add Question"
							className="hover:bg-blue-700 text-white font-bold py-2 px-4"
							onPress={() => {
								Alert.alert(`Quiz ready to be sent...`)
								setGameContent({
									question: questionText,
									answerOne: answerOne,
									answerTwo: answerTwo,
									answerThree: answerThree,
									solution: answerIndex,
								})
								setShowQuiz(false)
								setGameUpdate(true)
							}}
							buttonStyle={{
								backgroundColor: '#FAE8E0',
								borderRadius: 50,
								borderWidth: 2,
								borderColor: 'brown',
							}}
							titleStyle={{ color: '#EF7C8E' }}
						/>
					</View>
				</View>
			</>
		)
	}

	const handleFileSelection = () => {
		ImagePicker.requestMediaLibraryPermissionsAsync()
			.then(({ status }) => {
				if (status !== 'granted') {
					console.log('Permission not granted')
					return
				}

				const options: {} = {
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				}

				ImagePicker.launchImageLibraryAsync(options)
					.then((result) => {
						if (!result.canceled) {
							setFile(result.assets[0].uri)
							setShowMessage(false)
							setImageUpload(true)
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
						placeholder="Enter your message..."
						onChangeText={(newText) => {
							messageText = newText
						}}
					/>
				</View>
				<Button
					title="Add Message"
					className="hover:bg-blue-700 text-white font-bold py-2 px-4"
					onPress={() => {
						Alert.alert(`Message ready to be sent...`)
						setMessage(messageText)
						setShowButton(true)
						setShowMessage(false)
					}}
					buttonStyle={{
						backgroundColor: '#FAE8E0',
						borderRadius: 50,
						borderWidth: 2,
						borderColor: 'brown',
					}}
					titleStyle={{ color: '#EF7C8E' }}
				/>
			</>
		)
	}

	function SendTextInfo() {
		return (
			<View style={styles.buttonContainer}>
				<Button
					title="Send"
					onPress={() => {
						Alert.alert('Message Sent!')
						console.log('console log the game: ', game)
						uploadText(message, { partner_username, username }, game) //to fix once we can pass the stuff from database
					}}
					buttonStyle={{ backgroundColor: '#FAE8E0' }}
					titleStyle={{ color: '#EF7C8E' }}
					disabled={!gameUpdated}
				/>
			</View>
		)
	}

	function UploadImage() {
		return (
			<>
				<View style={styles.buttonContainerUploadImg}>
					<Button
						title="⇧ Upload Image ⇧"
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: 'blue' }}
						onPress={handleFileSelection}
					/>
				</View>
				<View style={styles.textContainer}>
					<TextInput
						style={styles.textInput}
						placeholder="Add a caption? (Optional)"
						onChangeText={(newText) => {
							console.log(newText)
							mediaText = newText
						}}
					/>
				</View>
				<View style={styles.buttonContainer}>
					{imageUpload && (
						<Button
							title="Send"
							onPress={() => {
								Alert.alert('Image Sent!')
								setMessage(mediaText)
								uploadMediaFromGallery(
									file,
									{ partner_username, username },
									game,
									mediaText
								)
							}}
							buttonStyle={{ backgroundColor: '#FAE8E0' }}
							titleStyle={{ color: '#EF7C8E' }}
						/>
					)}
				</View>
			</>
		)
	}

	function Upload() {
		return (
			<>
				{messageForm === 'Message' ? (
					showMessage && <MessageInput />
				) : messageForm === 'Image' ? (
					<UploadImage />
				) : (
					showCamera && <CameraFeature onClose={() => setShowCamera(false)} />
				)}
			</>
		)
	}

	return (
		<ScrollView contentContainerStyle={styles.contentContainer}>
			<View className="pt-8 self-center bg-[#0fb5fe] w-full flex items-center justify-center">
				<Text className="font-bold text-white text-lg text-center">
					Is time to play! Choose the content of the egg you'll be sending and
					surprise your partner with a minigame to hatch it!
				</Text>
			</View>
			<View style={styles.container}>
				<Text>Choose a game</Text>
				<View style={styles.buttonContainer}>
					<SelectDropdown
						buttonStyle={{ backgroundColor: '#D8A7B1' }}
						data={games}
						onSelect={(selectedItem, index) => {
							setSelectedGame(selectedItem)
							game.gameName = selectedItem
							if (selectedItem === 'Quiz') setShowQuiz(true)
							if (selectedItem === 'Snake') setGameUpdate(true)
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							return selectedItem
						}}
						rowTextForSelection={(item, index) => {
							return item
						}}
						dropdownStyle={{ borderRadius: 20, backgroundColor: '#FAE8E0' }}
					/>
				</View>
				<View>
					{selectedGame === 'Quiz' && showQuiz && (
						<Quiz /> // Quiz Game
					)}
				</View>
				<Text>What do you want to send?</Text>
				<View style={styles.buttonContainer}>
					<SelectDropdown
						buttonStyle={{ backgroundColor: '#D8A7B1' }}
						data={messages}
						onSelect={(selectedItem, index) => {
							setMessageForm(selectedItem)
							setShowCamera(selectedItem === 'Send a Snap')
							setShowMessage(true)
							setShowButton(false)
							setImageUpload(false)
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							return selectedItem
						}}
						rowTextForSelection={(item, index) => {
							return item
						}}
						dropdownStyle={{ borderRadius: 20, backgroundColor: '#FAE8E0' }}
					/>
				</View>
				<View>{messageForm.length > 0 ? <Upload /> : null}</View>
				<View>{gameUpdated && showButton && <SendTextInfo />}</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0fb5fe',
		marginTop: 0,
	},
	textContainer: {
		width: 300,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 15,
		marginBottom: 10,
		height: 100,
		textAlign: 'center',
		backgroundColor: '#FEE8F7',
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
		alignItems: 'center',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonContainerUploadImg: {
		alignSelf: 'center',
		textAlign: 'center',
		width: '50%',
		borderRadius: 50,
		marginBottom: 20,
		marginTop: 10,
		borderWidth: 2,
		borderColor: 'brown',
		overflow: 'hidden',
		alignItems: 'center',
	},
	contentContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		paddingBottom: 0,
	},
})

export default SendEgg
