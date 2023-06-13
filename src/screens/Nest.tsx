import React from "react";
import { Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Nest() {
  const nav = useNavigation()

    return (
        <>
          <Text>Nest page</Text>
          <Button
          title="Todays Egg"
          onPress={() => nav.navigate('My Egg')}></Button>
        </>
    )
}