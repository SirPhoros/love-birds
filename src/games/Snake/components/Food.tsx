import React from "react";
import { Coordinate } from "../types/types";
import { StyleSheet, Text, View } from 'react-native'

export default function Food({x, y}: Coordinate): JSX.Element {
    return <Text style={[{top: y * 10, left: x * 10}, styles.food]}>🥚</Text>
}

const styles = StyleSheet.create({
    food: {
        width: 20,
        height: 20,
        borderRadius: 7,
        position: 'absolute',
    }
})