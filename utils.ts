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
} from 'firebase/firestore'
//Firebase Auth
import {
	getAuth,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	UserCredential,
	User as FirebaseAuthUser,
	UserMetadata,
} from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

//Interfaces
interface NewUser {
	email: string
	username: string
	avatarIMG: string
	googleAuth: boolean
	partner_username: string
	in_relationship: boolean
}

interface Timestamp {
	timestamp: {
		nanoseconds: number
		seconds: number
	}
}

interface Game {
	gameContent: any
	gameName: string
}

interface MessageEgg {
	contentMsg: string
	game: Game
	isLocked: boolean
	recipient: string
	sender: string
	timestamp: Timestamp
	typeEgg: 'message'
}

interface FileEgg {
	caption: string
	fileURL: string
	game: Game
	isLocked: boolean
	recipient: string
	sender: string
	timestamp: Timestamp
	typeEgg: 'image'
}

type Egg = MessageEgg | FileEgg

// Your web app's Firebase configuration
const firebaseConfig = {
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

//Collections/Tables
const usersRef = collection(db, 'users')
const eggsRef = collection(db, 'eggs')

// Subscribe to changes
onAuthStateChanged(auth, (user: FirebaseAuthUser | null) => {
	console.log('user status changed: ', user)
})

export function handleSignUpWithEmail(
	email: string,
	password: string
): Promise<void> {
	return createUserWithEmailAndPassword(auth, email, password).then(
		(userCredential: UserCredential) => {
			const user = userCredential.user
			if (user) {
				attachUserDataToUser(user)
			}
		}
	)
}
//Attach data to the user in Firestore
function attachUserDataToUser(user: FirebaseAuthUser): Promise<void> {
	const uid = user.uid
	const userData: NewUser = {
		email: user.email || '',
		username: user.email?.split('@')[0] || '',
		avatarIMG: '',
		googleAuth: user.emailVerified,
		partner_username: '',
		in_relationship: false,
		// Add other relevant data fields
	}
	const usersCollection = doc(db, 'users', uid)

	return setDoc(usersCollection, userData)
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
export function getUserData(): Promise<UserMetadata> {
	const user = auth.currentUser

	if (!user) {
		return Promise.reject(new Error('User is not authenticated'))
	}

	const userId = user.uid
	const documentRef = doc(db, `users/${userId}`)

	return getDoc(documentRef)
		.then((docSnapshot) => {
			if (docSnapshot.exists()) {
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
							})
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
	userData: NewUser,
	metadataGame: Game,
	caption: string | undefined
): Promise<void> {
	const { partner_username, username } = userData
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
	metadataGame: Game
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
): Promise<Egg[]> {
	const recipientQuery = query(
		eggsRef,
		where('recipient', '==', username),
		where('sender', '==', partner_username),
		orderBy('timestamp', 'desc')
	)
	return getDocs(recipientQuery).then((querySnapshot) => {
		let eggArray: Egg[] = []
		querySnapshot.forEach((document) => {
			const data = document.data()
			if (data.typeEgg === 'message') {
				const messageEgg = data as MessageEgg
				eggArray.push(messageEgg)
			} else {
				const fileEgg = data as FileEgg
				eggArray.push(fileEgg)
			}
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
export function updateLock({ timestamp }: Timestamp): Promise<void> {
	const LockQuery = query(eggsRef, where('timestamp', '==', timestamp))
	return getDocs(LockQuery).then((querySnapshot) => {
		querySnapshot.forEach((document) => {
			updateDoc(doc(db, 'eggs', document.id), {
				isLocked: false,
			})
		})
	})
}
