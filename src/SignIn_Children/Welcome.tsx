import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoveBirdsLogo from '../../assets/Lovebirds-Logo.gif';
// import Lovebirds from '../../assets/Lovebirds-welcomepage.jpg'

export default function Welcome() {
  const nav = useNavigation()

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text>Welcome Page Goes Here</Text> */}
      <View style={styles.imageContainer}>
        <Image
          source={LoveBirdsLogo}
          style={{ resizeMode: 'contain', height: 175, width: 300, borderRadius: 40 }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Log In"
          onPress={() => nav.navigate('LogIn' as never)}
          />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Register"
          onPress={() => nav.navigate('Register' as never)}
          />
      </View>
      <View style={styles.welcomePageTxt}>
        <Text>
          Presented by The Dev Wears Java
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>©The Dev Wears Java</Text>
      </View>
</View>

)
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '25%',
    backgroundColor: '#f2daa4',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  imageContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
  },
  welcomePageTxt: {
    marginBottom: 20,
    marginTop: 60,
  },
})



{/* <View style={styles.imageContainer}>
  <Image
    source={Lovebirds}
    style={{ resizeMode: 'contain', height: 175, width: 300, borderRadius: 40 }}
  />
</View> */}