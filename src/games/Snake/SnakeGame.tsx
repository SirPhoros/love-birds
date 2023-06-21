import Game from './components/Game'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import QuizGame from '../Quiz/QuizGame'
const route = useRoute()

function Snake() {
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
		<>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Game item={item} />
			</GestureHandlerRootView>
		</>
	)
}

function QuizLink() {
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

	console.log('gameName', item.game.gameName)

	return (
		<>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<QuizGame item={item} />
			</GestureHandlerRootView>
		</>
	)
}

const SnakeGame = () => {
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

	console.log('gameName', item.game.gameName)

	return <>{item.game.gameName === 'Snake' ? <Snake /> : <QuizLink />}</>
}

export default SnakeGame
