import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../Context/UserContext";

export default function MyEgg() {
  const nav = useNavigation()
  const { profileId, setProfileId } = useContext(UserContext)

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