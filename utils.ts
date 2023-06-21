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
	orderBy,
	QuerySnapshot,
} from 'firebase/firestore'
//Firebase Auth
import {
	getAuth,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	UserCredential,
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
interface User {
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

export function handleSignUpWithEmail(
	email: string,
	password: string
): Promise<void> {
	return createUserWithEmailAndPassword(auth, email, password).then(
		(userCredential) => {
			// User sign-in successful
			const user = userCredential.user
			// Proceed with attaching data to the user
			attachUserDataToUser(user)
		}
	)
}
//Attach data to the user in Firestore
function attachUserDataToUser(user: any): void {
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

//Check User's connection
export function checkConnection(): boolean {
	return !!auth.currentUser
}

//Get Main User's Data
export function getUserData(): Promise<any> {
	const user = auth.currentUser

	if (!user) {
		return Promise.reject(new Error('User is not authenticated'))
	}

	const userId = user.uid
	const documentRef = doc(db, `users/${userId}`)

	return getDoc(documentRef)
		.then((docSnapshot: any) => {
			if (docSnapshot.exists()) {
				// Document exists
				const documentData = docSnapshot.data()
				return documentData
			} else {
				throw new Error('There is no username')
			}
		})
		.catch((error) => {
			console.error('Error getting document:', error)
			throw error
		})
}

//Log-in/Log-out functions

export function logIn(
	email: string,
	password: string
): Promise<UserCredential> {
	return signInWithEmailAndPassword(auth, email, password)
}

export function logOut(): void {
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

export function updatePartner(newPartner: string): Promise<any> {
	return updateDoc(doc(db, 'users', auth.currentUser!.uid), {
		partner_username: newPartner,
	})
}

export function removePartner(): Promise<any> {
	return updateDoc(doc(db, 'users', auth.currentUser!.uid), {
		partner_username: '',
		in_relationship: false,
	})
}

export function checkRelationship(partner: string): Promise<any> {
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
				throw Error('Not partner found')
			}
		})
}

export function checkUser() {
	console.log(auth.currentUser)
}

//we need to send the file along with the metadata to this file
export async function uploadMediaFromGallery(
	uri: string,
	metadata: any,
	metadataGame: any,
	caption: string | undefined
): Promise<void> {
	const { partner_username, username } = metadata
	//BlobFroUri transforms the URL we retrieve from the phone to Binary Data
	//Ready to be uploaded into Firebase db.
	const getBlobFroUri = async (uri: string): Promise<Blob> => {
		const blob = await new Promise<Blob>((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			xhr.onload = function () {
				resolve(xhr.response as Blob)
			}
			xhr.onerror = function (e) {
				reject(new TypeError('Network request failed'))
			}
			xhr.responseType = 'blob'
			xhr.open('GET', uri, true)
			xhr.send(null)
		})

		return blob
	}

	const imageBlob: Blob = await getBlobFroUri(uri)
	if (imageBlob) {
		const fileRef = ref(storage, `images/${partner_username}/` + Date.now())
		uploadBytes(fileRef, imageBlob)
			.then(() => {
				getDownloadURL(fileRef)
					.then((fileUrl) => {
						addDoc(collection(db, `eggs`), {
							fileURL: fileUrl,
							recipient: partner_username,
							caption: caption || '',
							sender: username,
							timestamp: serverTimestamp(),
							isLocked: true,
							typeEgg: 'image',
							game: metadataGame,
						})
					})
					.catch((error) => {
						console.log(error.message)
					})
			})
			.catch((error) => {
				console.log(error.message)
			})
			.catch((error) => {
				console.log(error.message)
			})
	}
}

//Send messages as an Egg:
export function uploadText(
	text: string,
	metadata: any,
	metadataGame: any
): void {
	const { partner_username, username } = metadata
	addDoc(collection(db, 'eggs'), {
		typeEgg: 'message',
		contentMsg: text,
		recipient: partner_username,
		sender: username,
		timestamp: serverTimestamp(),
		isLocked: true,
		game: metadataGame,
	}).catch((error) => {
		console.log(error.message)
	})
}

//fetch Eggs for "Eggs Page"
export function getEggs(
	username: string,
	partner_username: string
): Promise<any[]> {
	const recipientQuery = query(
		eggsRef,
		where('recipient', '==', username),
		where('sender', '==', partner_username),
		orderBy('timestamp', 'desc')
	)
	return getDocs(recipientQuery).then((querySnapshot) => {
		let eggArray: any[] = []
		querySnapshot.forEach((document) => {
			eggArray.push(document.data())
		})
		return eggArray
	})
}

//upload Image for your profile picture
export async function updateProfilePicture(uri: string): Promise<void> {
	//BlobFroUri transforms the URL we retrieve from the phone to Binary Data
	//Ready to be uploaded into Firebase db.
	const getBlobFroUri = async (uri: string): Promise<Blob> => {
		const blob = await new Promise<Blob>((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			xhr.onload = function () {
				resolve(xhr.response as Blob)
			}
			xhr.onerror = function () {
				reject(new TypeError('Network request failed'))
			}
			xhr.responseType = 'blob'
			xhr.open('GET', uri, true)
			xhr.send(null)
		})

		return blob
	}

	const imageBlob: Blob = await getBlobFroUri(uri)
	if (imageBlob) {
		const fileRef = ref(storage, 'profilePictures/' + Date.now())
		uploadBytes(fileRef, imageBlob)
			.then(() => {
				getDownloadURL(fileRef)
					.then((fileUrl) => {
						updateDoc(doc(db, 'users', auth.currentUser!.uid), {
							avatarIMG: fileUrl,
						})
					})
					.catch((error) => {
						console.log(error.message)
					})
			})
			.catch((error) => {
				console.log(error.message)
			})
			.catch((error) => {
				console.log(error.message)
			})
	}
}

//Update isLocked to false when passed the game:
export function updateLock({ timestamp }: any): Promise<void> {
	const LockQuery = query(eggsRef, where('timestamp', '==', timestamp))
	return getDocs(LockQuery).then((querySnapshot) => {
		querySnapshot.forEach((document) => {
			updateDoc(doc(db, 'eggs', document.id), {
				isLocked: false,
			})
		})
	})
}
