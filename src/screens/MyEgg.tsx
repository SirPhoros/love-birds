import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../Context/UserContext";
import { useRoute } from "@react-navigation/native";

function ImageContent ({item}: any) {

    console.log('text content item:', item)
    console.log('image content:', item.fileURL)
    const image = item.fileURL

    return (
      <>
        <Text>Congratulations!!</Text>
        <Text>Your partner sent you an {item.typeEgg}! Lucky you!</Text>
        <Image source={{
						uri: image
        }}
          style={styles.image}/>
        <Text>{item.caption.length > 0 ? <Text>Caption: {item.caption}</Text> : null}</Text>
      </>
    )
}

function TextContent ({item}:any) {

  console.log('text content item:', item)
  console.log('text content:', item.typeEgg)

  return (
    <>
      <Text>Congratulations!!</Text>
      <Text>Your partner sent you an {item.typeEgg}! Lucky you!</Text>
      <Text>{item.contentMsg}</Text>
    </>
  )
}


export default function MyEgg() {
  const nav = useNavigation()
  const { profileId, setProfileId } = useContext(UserContext)

  const route = useRoute()
  const item = route.params?.item
  
  


    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#F0CCB0' }}>
        
        <View>{item.typeEgg === 'message' ? <TextContent item={item}/> : <ImageContent item={item}/> }</View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Back to Nest"
            onPress={() => nav.navigate('Nest' as never)}
            buttonStyle={{ backgroundColor: '#FAE8E0' }}
            titleStyle={{ color: '#EF7C8E' }}
          />
        </View>
        <Image source={item.fileURL} style={styles.image}/>
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
  image: {
   width: 200,
   height: 200,
 },
})