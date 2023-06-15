import React, { useState, useEffect } from "react";
import { View, TextInput, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { handleGoogle, handleSignUpWithEmail } from "../../utils";


export default function Register() {
  const nav = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /* --- Loading State also needed to be added --- */
  const [isLoading, setIsLoading] = useState(true);
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
  
  console.log('email state:', email)
  console.log('password state:', password)

  let newEmail:string = '';
  let newPassword:string = '';

    function EmailRegister () {
        return (
            <>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text>Email:</Text>
                    <TextInput
                        placeholder="Enter email..."
                        onChangeText={newText => {
                            newEmail=newText
                            console.log('typed email:', newEmail)
                        }}
                        style={styles.textContainer}
                    />
                </View>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text>New Password:</Text>
                    <TextInput
                        placeholder="Enter new password..."
                        secureTextEntry={true}
                        onChangeText={newText => {
                            newPassword=newText
                            console.log('typed password:', newPassword)
                        }}
                        style={styles.textContainer}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        title="Register With Email" 
                        onPress={() => {
                        setEmail(newEmail)
                        setPassword(newPassword)
                        handleSignUpWithEmail(newEmail, newPassword)
                        Alert.alert('Registered Successfuly!')
                        }}
                        buttonStyle={{ backgroundColor: '#f2daa4' }}
                        titleStyle={{ color: 'brown' }}
                        />
                </View>
            </>
        )
    }

    // Google auth does not yet work!! Yet!!!!

    // function GoogleRegister () {
    //     return (
    //         <>
    //             <Text>Or</Text>
    //             <Button 
    //                 title="Register with Google" 
    //                 onPress={() => {
    //                     handleGoogle()
    //                 // Alert.alert('Registered Successfuly!')
    //                 // nav.navigate('Home' as never)
    //                 }}
    //                 />
    //         </>
    //     )
    // }

    function Register () {
        return (
            <>
                <Text className="text-2xl py-12">Register Here</Text>
                <EmailRegister />
                {/* <GoogleRegister /> */}
            </>
        )
    }

    function WelcomeMessage () {
        return (
            <> 
              <View>
                <Text>Thanks for signing up!</Text>
                <Text>You can change any of your details within the profile page</Text>
                <Button 
                    title="Head to the App" 
                    onPress={() => {
                    nav.navigate('Home' as never)
                    }}
                />
              </View>
            </>
        )
    }

    return (
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View>{email.length > 1 && password.length > 0 ? <WelcomeMessage /> : <Register />}</View>

      </View>
    )
}

/* --- Non-Tailwind Styling --- */
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textContainer: {
        width: 200,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
        height: 35,
      },
      buttonContainer: {
        width: 200,
        backgroundColor: '#f2daa4',
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 2.5,
        borderColor: 'brown',
      },
})