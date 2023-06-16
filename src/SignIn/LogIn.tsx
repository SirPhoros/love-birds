import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Text, Button, Image } from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'
import { logIn } from '../../utils'

let emailLogin: string = ''
let passwordLogin: string = ''

const emailHolder = 'user@example.com'
const passwordHolder = '123456'

export default function LogIn() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const nav = useNavigation()

	/* --- Email Input --- */
	function EmailInput() {
		return (
			<>
				<View style={{ alignItems: 'center', marginBottom: 20 }}>
					<Text>Email:</Text>
					<TextInput
						placeholder="Enter email..."
						onChangeText={(newText) => {
							emailLogin = newText
						}}
						style={styles.textContainer}
					/>
				</View>
				<View style={{ alignItems: 'center', marginBottom: 20 }}>
					<Text>Secret Password:</Text>
					<TextInput
						placeholder="Password..."
						secureTextEntry={true}
						onChangeText={(newText) => {
							passwordLogin = newText
						}}
						style={styles.textContainer}
					/>
				</View>
			</>
		)
	}

	function LoginMessage() {
		return (
			<>
				<View style={{ alignItems: 'center', marginBottom: 50 }}>
					<Text>Welcome back! </Text>
				</View>
				<View style={{ alignItems: 'center', marginBottom: 50 }}>
					<Text>We've missed you 😍</Text>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						title="Head to the App"
						onPress={() => {
							nav.navigate('Home' as never)
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: '#EF7C8E' }}
					/>
				</View>
			</>
		)
	}

	function LoginPage() {
		return (
			<View>
				<Text>Log in Page Goes Here.</Text>
				<Button
					title="Goes to home once registered"
					onPress={() => nav.navigate('Home' as never)}
				/>
				<EmailInput />
				<View style={styles.buttonContainer}>
					<Button
						title="Login"
						onPress={() => {
							// setEmail(emailLogin)
							// setPassword(passwordLogin)
							// logIn(emailLogin, passwordLogin)
							
							//Set Dummy Login for the sake of testing in an easier way. Uncomment above and delete once finished. 
							setEmail(emailHolder)
							setPassword(passwordHolder)
							console.log('email: ', email, 'password: ', password)
							logIn(emailHolder, passwordHolder)
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: '#EF7C8E' }}
					/>
				</View>
				<Text style={styles.forgotPasswordLink}>Forgot your password?</Text>
			</View>
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
			}}
		>
			<View>
				{email.length > 1 && password.length >= 6 ? (
					<LoginMessage />
				) : (
					<LoginPage />
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	textContainer: {
		width: 200,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 50,
		marginBottom: 10,
		height: 35,
		textAlign: 'center',
	},
	buttonContainer: {
		alignSelf: 'center',
		width: '70%',
		backgroundColor: '#f2daa4',
		borderRadius: 50,
		marginBottom: 10,
		borderWidth: 2,
		borderColor: 'brown',
		overflow: 'hidden',
	},
	forgotPasswordLink: {
		marginTop: 30,
		color: '#BA2953',
		textDecorationLine: 'underline',
		textAlign: 'center',
	},
})
