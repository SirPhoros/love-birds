import React, { useState } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const nav = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    console.log('email state:', email)
    console.log('password state:', password)

    let newEmail:string = '';
    let newPassword:string = '';

    function EmailRegister () {
        return (
            <>
                <Text>Email:</Text>
                <TextInput
                    placeholder="add your email address here"
                    onChangeText={newText => {
                        newEmail=newText
                        console.log('typed email:', newEmail)
                    }}
                ></TextInput> 
                <Text>Password:</Text>
                <TextInput
                    placeholder="add your password here"
                    secureTextEntry={true}
                    onChangeText={newText => {
                        newPassword=newText
                        console.log('typed password:', newPassword)
                    }}
                ></TextInput> 
                <Button 
                    title="Register With Email" 
                    onPress={() => {
                    setEmail(newEmail)
                    setPassword(newPassword)
                    Alert.alert('Registered Successfuly!')
                    }}
                    />
            </>
        )
    }

    function GoogleRegister () {
        return (
            <>
                <Text>Or</Text>
                <Button 
                    title="Register with Google" 
                    onPress={() => {
                    Alert.alert('Registered Successfuly!')
                    nav.navigate('Home' as never)
                    }}
                    />
            </>
        )
    }

    function Register () {
        return (
            <>
                <Text className="text-2xl py-12">Register Here</Text>
                <EmailRegister />
                <GoogleRegister />
            </>
        )
    }

    function WelcomeMessage () {
        return (
            <> 
            <View >
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