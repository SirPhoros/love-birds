import React from "react";
import { Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Game() {
  const nav = useNavigation()

    return (
        <>
          <Text>Game of Day</Text>
          <Button 
          title="Unlock Egg"
          onPress={() => nav.navigate('My Egg' as never)}
          ></Button>
        </>
    )
}