import { Coordinate } from "../types/types";
import { StyleSheet, View } from 'react-native'
import { Colours } from "../styles/colours";

interface SnakeProps {
    snake: Coordinate[];
}


export default function Snake ({snake}:SnakeProps): JSX.Element {
return (
    <>
    {snake.map((segment: any, index:number) => {
        const segmentStyle = {
            left: segment.x * 10,
            top: segment.y * 10, 
        }
        return <View key={index} style={[styles.snake, segmentStyle]}/>
    })}
    </>
)
}

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        backgroundColor: Colours.primary,
        position: 'absolute'
    }
})