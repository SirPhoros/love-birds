// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
//Database Storage
import { getFirestore, collection, addDoc } from 'firebase/firestore'
//Firebase Auth
import {
	getAuth,
	signInWithPopup,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig: {
	apiKey: string
	authDomain: string
	projectId: string
	storageBucket: string
	messagingSenderId: string
	appId: string
} = {
	apiKey: 'AIzaSyBnlb5QLZkR3xp2KBb8wQwheNHb2WgE14s',
	authDomain: 'love-birds-a5bd6.firebaseapp.com',
	projectId: 'love-birds-a5bd6',
	storageBucket: 'love-birds-a5bd6.appspot.com',
	messagingSenderId: '1048606210807',
	appId: '1:1048606210807:web:9735998c7b9fd4753cf1f2',
}

// Initialise Firebase
const app = initializeApp(firebaseConfig)

//Initialise Services
const db = getFirestore(app)
const auth = getAuth(app)

//Sign Users

interface newInfo {
	email: string
	password: string
}

interface NewUser {
	email: string
	username: string
	avatarIMG: string
	googleAuth: boolean
	partner_username: string
	in_relationship: boolean
}

function handleSignUp(e: any, newInfo: newInfo) {
	e.preventDefault()
	const { email, password } = newInfo
	createUserWithEmailAndPassword(auth, email, password)
		.then((cred) => {
			// User successfully created
			const user = cred.user
			console.log('User created:', user)
			const newUserRef = collection(db, 'USERS')
			addDoc(newUserRef, {
				email,
				username: email.split('@')[0],
				avatarIMG: '',
				googleAuth: false,
				partner_username: '',
				in_relationship: false,
			})
				.then((docRef) => {
					console.log('New user added:', docRef.id)
				})
				.catch((error) => {
					console.error('Error adding new user:', error)
				})
		})
		.catch((error) => {
			// Handle error during user creation
			console.error('Error creating user:', error)
		})
}
const provider = new GoogleAuthProvider()

function handleGoogle() {
	signInWithPopup(auth, provider)
		.then((result) => {
			// The signed-in user info.
			const { displayName, email } = result.user
			const newUserRef = collection(db, 'USERS')
			addDoc(newUserRef, {
				email,
				username: email?.split('@')[0],
				avatarIMG: '',
				googleAuth: true,
				partner_username: '',
				in_relationship: false,
			})
				.then((docRef) => {
					console.log('New user added:', docRef.id)
				})
				.catch((error) => {
					console.error('Error adding new user:', error)
				})
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code
			const errorMessage = error.message
			// The email of the user's account used.
			const email = error.customData.email
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error)
			// ...
		})
}
