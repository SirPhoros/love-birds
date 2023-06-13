import React from "react";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";



function Home() {
    const nav = useNavigation()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Button
        title="🪹"
        onPress={() => nav.navigate('Game' as never)}
      />
      <Button
        title="🥚"
        onPress={() => nav.navigate('Send Egg' as never)}
      />
    </View>
  );
}

export default Home