import React, { useState } from 'react'
import { View, TextInput, Alert, StyleSheet } from 'react-native'
import { Text, Button, Image } from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'
import { handleSignUpWithEmail } from '../../utils'

export default function Register() {
	const nav = useNavigation()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [registerErr, setRegisterErr] = useState(false)
	const [registerStatus, setRegisterStatus] = useState(false)

	let newEmail: string = ''
	let newPassword: string = ''

	function EmailRegister() {
		return (
			<>
				<View style={{ alignItems: 'center' }}>
					{registerErr ? (
						//CHANGE THIS TO MAKE IT LOOK LIKE AN ERROR MESSAGE
						<Text style={styles.textContainer}>
							The email/password does not meet the criteria
							<View></View>
						</Text>
					) : null}
					<Text>Email:</Text>
				</View>
				<TextInput
					placeholder="add your email address here"
					onChangeText={(newText) => {
						newEmail = newText.toLocaleLowerCase().replace(/\s+/g, '')
					}}
					style={styles.textContainer}
				></TextInput>
				<View style={{ alignItems: 'center' }}>
					<Text>Secret Password:</Text>
				</View>
				<TextInput
					placeholder="add your password here"
					secureTextEntry={true}
					onChangeText={(newText) => {
						newPassword = newText
					}}
					style={styles.textContainer}
				></TextInput>
				<View style={styles.buttonContainer}>
					<Button
						title="Register With Email"
						onPress={() => {
							setEmail(newEmail)
							setPassword(newPassword)
							handleSignUpWithEmail(newEmail, newPassword)
								.then(() => {
									setRegisterStatus(true)
									setRegisterErr(false)
									Alert.alert('Registered Successfuly!')
								})
								.catch((error) => {
									setRegisterErr(true)
								})
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: '#EF7C8E' }}
					/>
				</View>
			</>
		)
	}

	function Register() {
		return (
			<>
				<Text className="font-bold text-white text-3xl py-7">Register Here:</Text>
				<EmailRegister />
			</>
		)
	}

	function WelcomeMessage() {
		return (
			<>
				<View>
					<Text className="font-bold text-white text-2xl py-7 self-center">Thank you for signing up!</Text>
					<Text className="font-bold text-white text-xl py-7 text-center">
						You can update your details within the profile page
					</Text>
					<Button
						title="Head to the App"
						onPress={() => {
							nav.navigate('Home Page' as never)
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0', borderRadius: 50, borderWidth: 2, borderColor: 'brown' }}
				    	titleStyle={{ color: '#EF7C8E' }}
					/>
				</View>
			</>
		)
	}

	return (
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
			<View>{registerStatus ? <WelcomeMessage /> : <Register />}</View>
		</View>
	)
}

const styles = StyleSheet.create({
	textContainer: {
		width: 200,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 50,
		marginBottom: 20,
		height: 35,
		textAlign: 'center',
		backgroundColor: '#fff',
	},
	buttonContainer: {
		alignSelf: 'center',
		width: '70%',
		backgroundColor: '#f2daa4',
		borderRadius: 50,
		marginBottom: 10,
		marginTop: 20,
		borderWidth: 2,
		borderColor: 'brown',
		overflow: 'hidden',
	},
})
