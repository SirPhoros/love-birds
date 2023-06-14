import React from "react";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";



function Home() {
    const nav = useNavigation()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Button
        title="🪹"
        onPress={() => nav.navigate('Nest' as never)}
      />
      <Button
        title="🥚"
        onPress={() => nav.navigate('Send Egg' as never)}
      />
      {/* Button here for now, will default with context */}
      <Button
        title="Go to Welcome Page"
        onPress={() => nav.navigate('Welcome' as never)}
      />

    </View>
  );
}

export default Home