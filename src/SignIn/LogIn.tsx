import React, { useState } from 'react'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { logIn } from '../../utils'

let emailLogin: string = ''
let passwordLogin: string = ''

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
					<Text>Password:</Text>
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
				<View>
					<Text>Welcome back! </Text>
					<Text>We've missed you</Text>
					<Button
						title="Head to the App"
						onPress={() => {
							nav.navigate('Home' as never)
						}}
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
						color="#000000"
						onPress={() => {
							setEmail(emailLogin)
							setPassword(passwordLogin)
							console.log('email: ', email, 'password: ', password)
							logIn(emailLogin, passwordLogin)
						}}
					/>
					<Text style={styles.forgotPasswordLink}>Forgot your password?</Text>
				</View>
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
		borderRadius: 5,
		marginBottom: 10,
		height: 35,
	},
	buttonContainer: {
		width: '25%',
		backgroundColor: '#f2daa4',
		borderRadius: 5,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#000000',
	},
	forgotPasswordLink: {
		marginTop: 10,
		color: 'blue',
		textDecorationLine: 'underline',
	},
})
