import Game from "./components/Game"
import "react-native-gesture-handler"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Text, View } from "react-native"
import { useRoute } from '@react-navigation/native';
import Quiz from "../Quiz/Quiz"


    function Snake () {

        const route = useRoute()
        const item = route.params?.item

        console.log('gameName', item.game.gameName)

        return (
            <>
                <GestureHandlerRootView style={{flex: 1}}>
                <Game item={item}/>
                </GestureHandlerRootView>
            </>
        )
    }

    function QuizGame () {

        const route = useRoute()
        const item = route.params?.item

        console.log('gameName', item.game.gameName)

        return (
            <>
                <GestureHandlerRootView style={{flex: 1}}>
                <Quiz />
                </GestureHandlerRootView>
            </>
        )
    }
    

const SnakeGame = () => {
    
    const route = useRoute()
    const item = route.params?.item

    console.log('gameName', item.game.gameName)
    

    return (
    <>
    {item.game.gameName === 'Snake' ? <Snake /> : <QuizGame />}
    
    </>
)
}


export default SnakeGame
