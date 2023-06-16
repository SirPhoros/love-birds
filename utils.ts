// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
//Database Storage
import {
	getFirestore,
	collection,
	addDoc,
	setDoc,
	getDoc,
	updateDoc,
	getDocs,
	doc,
	query,
	where,
	serverTimestamp,
} from 'firebase/firestore'
//Firebase Auth
import {
	getAuth,
	onAuthStateChanged,
	signInWithPopup,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

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
const storage = getStorage(app)
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

//Collections/Tables

const usersRef = collection(db, 'users')
const eggsRef = collection(db, 'eggs')

//Subscribe to changes
onAuthStateChanged(auth, (user) => {
	console.log('user status changed: ', user)
})

export function handleSignUpWithEmail(email: string, password: string) {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// User sign-in successful
			const user = userCredential.user
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
export function handleGoogle() {
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

//Get Main User's Data
export function getUserData(): any {
	const userId: string = auth.currentUser.uid
	const documentRef = doc(db, `users/${userId}`)

	return getDoc(documentRef)
		.then((docSnapshot: any) => {
			if (docSnapshot.exists()) {
				// Document exists
				const documentData = docSnapshot.data()
				return documentData
			} else {
				throw Error('There is no username')
			}
		})
		.catch((error) => {
			console.error('Error getting document:', error)
		})
}

//Log-in/Log-out functions

export function logIn(email: string, password: string) {
	signInWithEmailAndPassword(auth, email, password)
		.then((cred) => {
			console.log('User logged in', cred.user)
		})
		.catch((error) => {
			console.log('Error logging in:', error)
		})
}

export function logOut() {
	signOut(auth)
		.then(() => {
			console.log('user signed out')
		})
		.catch((error) => {
			console.error('Error logging out:', error)
		})
}

//Verify that there's a relationship and it is mutual
// This should be the username in context
const testUsername = {
	avatarIMG: '',
	email: 'example@example.com',
	googleAuth: false,
	in_relationship: false,
	partner_username: 'user',
	username: 'example',
}
// console.log(testUsername.partner_username)

export function updatePartner(newPartner: string): any {
	return updateDoc(doc(db, 'users', auth.currentUser.uid), {
		partner_username: newPartner,
	})
}

export function removePartner() {
	return updateDoc(doc(db, 'users', auth.currentUser.uid), {
		partner_username: '',
		in_relationship: false,
	})
}

export function checkRelationship(partner: string): any {
	const isPartnerQuery = query(usersRef, where('username', '==', partner))
	let oneSide = false
	return getDocs(isPartnerQuery)
		.then((querySnapshot) => {
			querySnapshot.forEach((document) => {
				oneSide = true
				const { username } = document.data()
				const isMutualQuery = query(
					usersRef,
					where('partner_username', '==', username)
				)

				updateDoc(doc(db, 'users', document.id), {
					in_relationship: true,
				})

				getDocs(isMutualQuery)
					.then((querySnapshot) => {
						querySnapshot.forEach((document) => {
							updateDoc(doc(db, 'users', document.id), {
								in_relationship: true,
							}).then(() => console.log(testUsername))
						})
					})
					.catch((error) => {
						console.error('Error getting documents:', error)
					})
			})
		})
		.then(() => {
			if (!oneSide) {
				// Handle the case when no partner is found
				throw Error('Not partner found')
			}
		})
		.catch((error: any) => {
			console.error('Error getting documents:', error)
		})
}

export function checkUser() {
	console.log(auth.currentUser)
}

//We need to see the shape of the file

//we need to send the file along with the metadata to this file,
//probably handled by a "handleSubmit" kind of function
export function uploadMedia(file: any, metadata: any) {
	const { contentType, recipient, sender } = metadata
	if (file) {
		console.log(file)
		const fileRef = ref(storage, file.name)
		uploadBytes(fileRef, file)
			.then(() => {
				getDownloadURL(fileRef)
					.then((fileUrl) => {
						addDoc(collection(db, 'eggs'), {
							fileURL: fileUrl,
							file_name: file.name,
							//recipient: testUsername.partner_username,
							recipient: recipient,
							//sender: testUsername.username,
							sender: sender,
							timestamp: serverTimestamp(),
							isLocked: true,
							contentType: contentType,
						}).then((data: any) => {
							console.log(data)
						})
					})
					.catch((error) => {
						console.log(error.message)
					})
			})
			.catch((error) => {
				console.log(error.message)
			})

		//This would need to be handled by React-Native
		// setFile(null)
		// setMessage('')
	}
}

//fetch Eggs for "Eggs Page"
function getEggs(username: string) {
	const recipientQuery = query(eggsRef, where('recipient', '==', username))
	return getDocs(recipientQuery).then((querySnapshot) => {
		let eggArray: any[] = []
		querySnapshot.forEach((document) => {
			eggArray.push(document.data())
		})
		return eggArray
	})
}
