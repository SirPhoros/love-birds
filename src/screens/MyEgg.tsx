import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MyEgg() {
  const nav = useNavigation()

    return (
      <View>
          <Text>MyEgg</Text>
          <Text>Content Goes in here</Text>

          <Button
        title="Back to 🪹"
        onPress={() => nav.navigate('Nest' as never)}
      />
      </View>
    )
}