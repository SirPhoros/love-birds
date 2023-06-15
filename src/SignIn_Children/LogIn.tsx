import React from 'react'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { logIn } from '../../utils'

let email: string = ''
let password: string = ''

export default function LogIn() {
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
							email = newText
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
							password = newText
						}}
						style={styles.textContainer}
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
			}}
		>
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
						logIn(email, password)
            nav.navigate('Home' as never)
					}}
				/>
			</View>
			<Text style={styles.forgotPasswordLink}>Forgot your password?</Text>
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
