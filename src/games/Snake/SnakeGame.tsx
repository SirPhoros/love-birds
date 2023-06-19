import Game from "./components/Game"
import "react-native-gesture-handler"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Text } from "react-native"
import { useRoute } from '@react-navigation/native';



    

const SnakeGame = () => {
    
    const route = useRoute()
    const item = route.params?.item
    

    return (
    <>
    <GestureHandlerRootView style={{flex: 1}}>
    <Game item={item}/>
    </GestureHandlerRootView>
    </>
)
}


export default SnakeGame
