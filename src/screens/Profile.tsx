import React from "react"
import { Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native";


export default function Profile() {
    const nav = useNavigation()
    return (
        <>
            <View>
                <Text>Profile page here</Text>
            </View>
        </>
    )
}