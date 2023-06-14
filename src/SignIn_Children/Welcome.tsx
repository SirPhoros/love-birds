import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {
  const nav = useNavigation()

    return (
      <View>
          <Text>Welcome Page Goes Here</Text>
          <Button
        title="Log In"
        onPress={() => nav.navigate('LogIn' as never)}
      />
          <Button
        title="Register"
        onPress={() => nav.navigate('Register' as never)}
      />
      </View>
    )
}