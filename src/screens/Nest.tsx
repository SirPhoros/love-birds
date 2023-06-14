import React from "react";
import { Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function Nest() {
  const nav = useNavigation()

    return (
        <>
          <Text>Nest page</Text>
           <Button
          title="Link to locked egg"
          onPress={() => nav.navigate('Game')}></Button>
          <Button
          title="Link to unlocked egg 1"
          onPress={() => nav.navigate('My Egg')}></Button>
         <Button
          title="Link to unlocked egg 2"
          onPress={() => nav.navigate('My Egg')}></Button>
          <Button
          title="Link to unlocked egg 3"
          onPress={() => nav.navigate('My Egg')}></Button>
        </>
    )
}