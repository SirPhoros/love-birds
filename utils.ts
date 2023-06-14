// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
//Database Storage
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore'
//Firebase Auth
import {
	getAuth,
	onAuthStateChanged,
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
//Template for NewUser
interface NewUser {
	email: string
	username: string
	avatarIMG: string
	googleAuth: boolean
	partner_username: string
	in_relationship: boolean
}

//Subscribe to changes
onAuthStateChanged(auth, (user) => {
	console.log('user status changed: ', user)
})

function handleSignUpWithEmail(email: string, password: string) {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// User sign-in successful
			const user = userCredential.user
			console.log(user)
			// Proceed with attaching data to the user
			attachUserDataToUser(user)
		})
		.catch((error) => {
			console.error('Error creating user:', error)
		})
}
//Attach data to the user in Firestore
function attachUserDataToUser(user: any) {
	const uid = user.uid // Assuming you have access to the signed-in user's UID
	const userData = {
		email: user.email,
		username: user.email.split('@')[0],
		avatarIMG: '',
		googleAuth: user.emailVerified,
		partner_username: '',
		in_relationship: false,
		// Add other relevant data fields
	}
	const usersCollection = doc(db, 'users', uid)

	setDoc(usersCollection, userData)
		.then(() => {
			console.log('User data attached successfully!')
		})
		.catch((error: any) => {
			console.error('Error attaching user data:', error)
		})
}
function handleGoogle() {
	const provider = new GoogleAuthProvider()
	signInWithPopup(auth, provider)
		.then((userCredential) => {
			// User sign-in successful
			const user = userCredential.user
			// Proceed with attaching data to the user
			attachUserDataToUser(user)
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
