import React, { useContext, useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import { Camera, CameraType } from 'expo-camera'
import { shareAsync } from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library'
import { uploadMediaFromGallery } from '../../utils'
import { UserContext } from '../../Context/UserContext'

const CameraFeature = ({ game, onClose }) => {
	console.log(game)
	let cameraRef = useRef()
	const [hasCameraPermission, setHasCameraPermission] = useState()
	const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState()
	const [photo, setPhoto] = useState()
	const { profileId } = useContext(UserContext)
	const { partner_username, username } = profileId

	useEffect(() => {
		;(async () => {
			const cameraPermission = await Camera.requestCameraPermissionsAsync()
			const mediaLibraryPermission =
				await MediaLibrary.requestPermissionsAsync()
			setHasCameraPermission(cameraPermission.status === 'granted')
			setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
		})()
	}, [])

	if (hasCameraPermission === undefined) {
		return <Text>Requesting permissions...</Text>
	} else if (!hasCameraPermission) {
		return (
			<Text>
				Permission for camera not granted. Please change this in your settings.
			</Text>
		)
	}

	let takePic = async () => {
		if (cameraRef.current) {
			let options = {
				quality: 1,
				base64: false,
				exif: false,
			}

			let newPhoto = await cameraRef.current.takePictureAsync(options)
			setPhoto(newPhoto)
		}
	}

	if (photo) {
		let savePhoto = () => {
			MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
				setPhoto(undefined)
			})
		}

		let uploadPhoto = () => {
			const caption = 'This is an egg-tastic snapshop!'
			uploadMediaFromGallery(
				photo.uri,
				{ partner_username, username },
				game,
				caption
			)
			setPhoto(undefined)
		}

		return (
			<View style={styles.container}>
				{photo ? (
					<View style={styles.previewContainer}>
						<Image
							style={styles.preview}
							source={{ uri: photo.uri }}
						/>
					</View>
				) : (
					<View style={styles.cameraContainer}>
						<Camera
							style={styles.camera}
							type={CameraType.front}
							ref={cameraRef}
						/>
					</View>
				)}
				<View>
					{photo ? (
						<>
							<View style={styles.buttonGroupContainer}>
								<View style={styles.buttonContainer2}>
									<Button
										title="Save"
										onPress={savePhoto}
										buttonStyle={{ backgroundColor: '#FAE8E0' }}
										titleStyle={{ color: '#EF7C8E' }}
									/>
								</View>
								<View style={styles.buttonContainer2}>
									<Button
										title="Upload"
										onPress={uploadPhoto}
										buttonStyle={{ backgroundColor: '#FAE8E0' }}
										titleStyle={{ color: '#EF7C8E' }}
									/>
								</View>
								<View style={styles.buttonContainer2}>
									<Button
										title="Discard"
										onPress={() => setPhoto(undefined)}
										buttonStyle={{ backgroundColor: '#FAE8E0' }}
										titleStyle={{ color: '#EF7C8E' }}
									/>
								</View>
							</View>
						</>
					) : (
						<>
							<View style={styles.buttonContainer}>
								<Button
									title="Snap!"
									onPress={takePic}
									buttonStyle={{ backgroundColor: '#FAE8E0' }}
									titleStyle={{ color: '#EF7C8E' }}
								/>
							</View>
							<View style={styles.buttonContainer}>
								<Button
									title="Back"
									onPress={onClose}
									buttonStyle={{ backgroundColor: '#FAE8E0' }}
									titleStyle={{ color: '#EF7C8E' }}
								/>
							</View>
						</>
					)}
				</View>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Camera
				style={styles.camera}
				type={CameraType.front}
				ref={cameraRef}
			/>
			<View style={styles.buttonContainer}>
				<Button
					title="Snap!"
					onPress={takePic}
					buttonStyle={{ backgroundColor: '#FAE8E0' }}
					titleStyle={{ color: '#EF7C8E' }}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					title="Go Back"
					onPress={onClose}
					buttonStyle={{ backgroundColor: '#FAE8E0' }}
					titleStyle={{ color: '#EF7C8E' }}
				/>
			</View>
		</View>
	)
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const cameraSize = Math.min(windowWidth * 0.8, windowHeight * 0.6)

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	camera: {
		width: cameraSize,
		height: cameraSize,
		aspectRatio: 1,
		borderRadius: 10,
		overflow: 'hidden',
		marginBottom: 10,
	},
	previewContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: cameraSize,
		height: cameraSize,
		marginBottom: 20,
		marginTop: 0,
	},
	preview: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
	},
	buttonContainer: {
		alignSelf: 'center',
		width: '50%',
		backgroundColor: '#f2daa4',
		borderRadius: 50,
		marginBottom: 0,
		marginTop: 1,
		borderWidth: 2,
		borderColor: 'brown',
		overflow: 'hidden',
	},
	buttonContainer2: {
		alignSelf: 'center',
		width: 85,
		backgroundColor: '#f2daa4',
		borderRadius: 50,
		marginBottom: 0,
		marginTop: 1,
		borderWidth: 2,
		borderColor: 'brown',
		overflow: 'hidden',
		margin: 2,
	},
	buttonGroupContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
})

export default CameraFeature
