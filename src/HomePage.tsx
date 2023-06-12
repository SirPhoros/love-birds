import React from "react";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NestIcon from "./Home_Children/NestIcon";
import SendEggIcon from "./Home_Children/SendEggIcon";

export default function HomePage() {
    const nav = useNavigation();

    return (
    <>
        <View>
            <Text>HomePage goes here</Text>
        </View>
    </>
    )
}