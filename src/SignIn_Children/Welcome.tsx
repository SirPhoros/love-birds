import React from "react";
import { Text, Button, Image } from "react-native-elements";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoveBirdsLogo from '../../assets/Lovebirds-Logo.gif';

export default function Welcome() {
  const nav = useNavigation();
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       
      <View style={styles.imageContainer}>
        <Image
          source={LoveBirdsLogo}
          style={{ resizeMode: 'contain', height: 175, width: 300, borderRadius: 40 }}
          containerStyle={{
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.8,
            shadowRadius: 6,
            elevation: 6,
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Log In"
          onPress={() => nav.navigate('LogIn' as never)}
          buttonStyle={{ backgroundColor: '#f2daa4' }}
          titleStyle={{ color: 'brown' }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Register"
          onPress={() => nav.navigate('Register' as never)}
          buttonStyle={{ backgroundColor: '#f2daa4' }}
          titleStyle={{ color: 'brown' }}
        />
      </View>

      <View style={styles.welcomePageTxt}>
        <Text>
          Presented by The_Dev_Wears_Java
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ©The_Dev_Wears_Java
        </Text>
      </View>
    </View>
  );
}

/* --- Styling --- */
const styles = StyleSheet.create({
  buttonContainer: {
    width: '40%',
    backgroundColor: '#f2daa4',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 2.5,
    borderColor: 'brown',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
