import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
// import { useNavigation } from '@react-navigation/native'
// import { UserContext } from '../../Context/UserContext'
import { useRoute } from '@react-navigation/native'

function ImageContent({ item }: any) {
	// console.log('text content item:', item)
	// console.log('image content:', item.fileURL)
	// console.log('item', item)

	return (
		<>
			<Text style={styles.text}>
				{item.sender} sent you an {item.typeEgg}!
			</Text>
			<Image
				source={{
					uri: item.fileURL,
				}}
				style={styles.image}
			/>
			<View style={styles.captionContainer}>
				<Text style={styles.captionText}>
					{item.caption.length > 0 ? (
						<Text>CAPTION: {item.caption}</Text>
					) : null}
				</Text>
			</View>
		</>
	)
}

function TextContent({ item }: any) {
	console.log('text content item:', item)
	console.log('text content:', item.typeEgg)

	return (
		<>
			<Text style={styles.text}>
				{item.sender} sent you an {item.typeEgg}!
			</Text>

			<View style={styles.messageContainer}>
				<Text style={styles.messageText}>{item.contentMsg}</Text>
			</View>
		</>
	)
}

export default function MyEgg() {
	// const nav = useNavigation()
	// const { profileId, setProfileId } = useContext(UserContext)
	const route = useRoute()

	interface RouteParams {
		item?: {
			caption: string
			fileURL: string
			game: {
				gameContent: any
				gameName: string
			}
			isLocked: boolean
			recipient: string
			sender: string
			timestamp: {
				nanoseconds: number
				seconds: number
			}
			typeEgg: string
		}
	}

	const item = (route.params as RouteParams)?.item

	return (
		<ScrollView>
			<View style={styles.container}>
				<View>
					{item.typeEgg === 'message' ? (
						<TextContent item={item} />
					) : (
						<ImageContent item={item} />
					)}
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#0fb5fe',
		padding: 20,
	},
	text: {
		fontSize: 20,
		textAlign: 'center',
		padding: 50,
		color: '#FAE8E0',
	},
	image: {
		width: 350,
		height: 350,
	},
	captionContainer: {
		backgroundColor: '#f21fa9', // Set the background color of the bubble
		padding: 8, // Adjust the padding as needed
		borderRadius: 10, // Adjust the border radius to control the shape of the bubble
		marginTop: 50, // Add some margin to separate the bubble from the image
		alignSelf: 'center', // Align the bubble to the left side of the screen
	},
	captionText: {
		fontSize: 16,
		color: '#FFFFFF', // Set the text color of the caption
	},
	messageContainer: {
		backgroundColor: '#f21fa9', // Set the background color of the bubble
		padding: 8, // Adjust the padding as needed
		borderRadius: 20, // Adjust the border radius to control the shape of the bubble
		marginTop: -10, // Add some margin to separate the bubble from the image
		alignSelf: 'flex-start',
		marginBottom: 200,
	},
	messageText: {
		fontSize: 16,
		color: '#FFFFFF',
		textAlign: 'left',
	},
})
