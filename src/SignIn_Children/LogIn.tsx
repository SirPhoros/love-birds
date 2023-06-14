import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LogIn() {
  const nav = useNavigation()

    return (
      <View>
          <Text>Log in Page Goes Here</Text>
          <Button
        title="Goes to home once registered"
        onPress={() => nav.navigate('Home' as never)}
      />

      </View>
    )
}