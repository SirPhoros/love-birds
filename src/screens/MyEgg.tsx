import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../Context/UserContext";
import { useRoute } from "@react-navigation/native";

export default function MyEgg() {
  const nav = useNavigation()
  const { profileId, setProfileId } = useContext(UserContext)

  const route = useRoute()
  const prop = route.params?.item
  console.log("prop:", prop)


    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#F0CCB0' }}>
        <Text>MyEgg</Text>
        <Text>Content Goes in here</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Back to Nest"
            onPress={() => nav.navigate('Nest' as never)}
            buttonStyle={{ backgroundColor: '#FAE8E0' }}
            titleStyle={{ color: '#EF7C8E' }}
          />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  buttonContainer: {
		alignSelf: 'center', 
		width: '50%',
		backgroundColor: '#f2daa4',
		borderRadius: 50,
		marginBottom: 1,
		marginTop: 1,
		borderWidth: 2,
		borderColor: 'brown',
		overflow: 'hidden', 
	  },
})