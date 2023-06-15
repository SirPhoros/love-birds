import React from "react";
import { View, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import { Text, Button, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

const LoginPage = {
  email: "byebye@gmail.com",
  password: "abcd1234",
  googleAuth: false,
};

export default function LogIn() {
  const nav = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  /* --- Loading State --- */
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500); 
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#a2f6e7" />
      </View>
    );
  }



  /* --- Email Input --- */
  function EmailInput() {
    return (
      <>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text>Email:</Text>
          <TextInput placeholder="Enter email..." style={styles.textContainer} />
        </View>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text>Password:</Text>
          <TextInput 
            placeholder="Password..."
            secureTextEntry={true}
            style={styles.textContainer} 
          />
        </View>
      </>
    );
  }


  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>

      <Button
        title="Goes to home once registered"
        onPress={() => nav.navigate('Home' as never)}
      />
      <EmailInput />
      <View style={styles.buttonContainer}>
        <Button 
          title="Login"
          buttonStyle={{ backgroundColor: '#f2daa4' }}
          titleStyle={{ color: 'brown' }}
        />
      </View>
      <Text style={styles.forgotPasswordLink}>Forgot your password?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    height: 35,
  },
  buttonContainer: {
    width: '30%',
    backgroundColor: '#f2daa4',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'brown',
  },
  forgotPasswordLink: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

