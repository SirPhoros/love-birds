import Game from "./components/Game"
import "react-native-gesture-handler"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Text } from "react-native"

const SnakeGame = () => 
<GestureHandlerRootView style={{flex: 1}}>
<Game />
</GestureHandlerRootView>

export default SnakeGame
