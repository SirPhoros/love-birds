import React from "react";
import { Text, View, Image } from "react-native";
import TeamPic from "../../assets/TeamPic.jpg"

export default function About() {
    return (
    <>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={TeamPic} style={{ resizeMode: 'contain', height: 175, width: 300, borderRadius: 40}} />
            <Text>About Us</Text>
            <Text className="text-xl py-4">Thanks for checking out the app!</Text>
            <Text className="text-xl py-4">You can follow us from the links below:</Text>
            <Text className="text-sm py-1">Link</Text>
            <Text className="text-sm py-1">Link</Text>
            <Text className="text-sm py-1">Link</Text>
            <Text className="text-sm py-1">Link</Text>
            <Text className="text-xl py-4">We're some kickass duuuuuudes</Text>
        </View>
    </>
    )
}