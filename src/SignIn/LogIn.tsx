import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, Alert } from 'react-native'
import { Text, Button, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { logIn } from '../../utils'
import LoveBirdsLogo from '../../assets/Lovebirds-Logo.gif'

let emailLogin: string = ''
let passwordLogin: string = ''

export default function LogIn() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const nav = useNavigation()
	const [loginErr, setLoginErr] = useState(false)
	const [loginStatus, setLoginStatus] = useState(false)

	useEffect(() => {}, [loginErr])

	/* --- Email Input --- */
	function EmailInput() {
		return (
			<>
				<View style={{ alignItems: 'center', marginBottom: 20 }}>
					{loginErr ? (
						<Text>
							Wrong email/password. Please try again.
							<View></View>
						</Text>
					) : null}
					<TextInput
						placeholder="Enter email..."
						onChangeText={(newText) => {
							emailLogin = newText.toLocaleLowerCase().replace(/\s+/g, '')
						}}
						style={styles.textContainer}
					/>
				</View>
				<View style={{ alignItems: 'center', marginBottom: 20 }}>
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
							nav.navigate('Home Page' as never)
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
				<EmailInput />
				<View style={styles.buttonContainer}>
					<Button
						title="Login"
						onPress={() => {
							setEmail(emailLogin)
							setPassword(passwordLogin)
							logIn(emailLogin, passwordLogin)
								.then(() => {
									setLoginStatus(true)
									setLoginErr(false)
								})
								.catch((error) => {
									if (error) {
										setLoginErr(true)
									}
								})
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: '#EF7C8E' }}
					/>
					<Button
						title="User"
						onPress={() => {
							setEmail('user@example.com')
							setPassword('123456')
							logIn('user@example.com', '123456')
							setLoginStatus(true)
							console.log('email: ', email, 'password: ', password)
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: '#EF7C8E' }}
					/>
					<Button
						title="Example"
						onPress={() => {
							setEmail('example@example.com')
							setPassword('123456')
							logIn('example@example.com', '123456')
							setLoginStatus(true)
							console.log('email: ', email, 'password: ', password)
						}}
						buttonStyle={{ backgroundColor: '#FAE8E0' }}
						titleStyle={{ color: '#EF7C8E' }}
					/>
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
				backgroundColor: '#0fb5fe',
			}}
		>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#0fb5fe',
				}}
			>
				<View style={styles.imageContainer}>
					<Image
						source={LoveBirdsLogo}
						style={{
							resizeMode: 'contain',
							height: 175,
							width: 300,
							borderRadius: 40,
						}}
					/>
				</View>
				<View>{loginStatus ? <LoginMessage /> : <LoginPage />}</View>
			</View>
			<View style={styles.footer}>
				<Text style={styles.footerText}>©The Dev Wears Java</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	textContainer: {
		width: 350,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 50,
		marginBottom: 3,
		height: 50,
		textAlign: 'center',
		backgroundColor: '#fff',
	},
	buttonContainer: {
		alignSelf: 'center',
		width: 350,
		backgroundColor: '#f2daa4',
		borderRadius: 30,
		borderWidth: 2,
		borderColor: 'brown',
		overflow: 'hidden',
	},
	forgotPasswordLink: {
		marginTop: 50,
		marginBottom: 0,
		width: '70%',
		color: '#FAE8E0',
		alignSelf: 'center',
		fontSize: 17,
		textDecorationLine: 'underline',
		textAlign: 'center',
		overflow: 'hidden',
	},

	imageContainer: {
		marginBottom: 80,
		marginTop: 10,
	},
	footer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#0fb5fe',
		paddingVertical: 35,
		paddingHorizontal: 20,
	},
	footerText: {
		textAlign: 'center',
		color: '#FAE8E0',
		fontSize: 20,
		backgroundColor: '#0fb5fe',
	},
})
