import React, { useState } from "react"
import { Text, View, Image, Button, Alert, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"

const profileId:{ 
    avatarIMG: string,
    email:string,
    googleAuth: boolean,
    in_relationship: boolean,
    partner_username: string,
    username: string
} = { 
    avatarIMG: "https://img.rawpixel.com/private/static/images/website/2022-05/ns8230-image.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=b3961e17298745c0868eeef46211c3d0",
    email:"byebye@gmail.com",
    googleAuth: false,
    in_relationship: false,
    partner_username: "Tom",
    username: "byebye"
    }

export default function Profile() {

    const nav = useNavigation()
    const [partner, setPartner] = useState('')

    let newPartner:string = '';

    console.log(newPartner)

    function RelationshipTextInput () {
        return (
            <>
                <TextInput
                    placeholder="add partner's name here"
                    onChangeText={newText => {
                        newPartner=newText
                        console.log("state:", newPartner)
                    }}
                ></TextInput> 
                <Button 
                    title="Add Relationship" 
                    onPress={() => {
                    setPartner(newPartner)
                    Alert.alert("Relationship updated with " + newPartner)
                    profileId.in_relationship = true,
                    profileId.partner_username = newPartner
                    }}
                    />
            </>
        )
    }

    function EditRelationship () {
        return (
            <>
                <Button 
                    title="Break Up" 
                    onPress={() => {
                    setPartner("")
                    Alert.alert("Left Relationship")
                    profileId.in_relationship = false,

                    profileId.partner_username = ""
                    
                    }}
                    />
            </>
        )
    }

    console.log(partner)
    console.log(profileId)

    return (
        <>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                
                <Text className="text-2xl py-12">Your Profile</Text>
                <Image style={{ resizeMode: 'contain', height: 100, width: 100, borderRadius: 40,
          }} source={{uri: profileId.avatarIMG}} />
                
                <View className="py-2">{ profileId.in_relationship === false? <Text>Add a relationship to get started!</Text> : <Text>{"In Relationship With: " + profileId.partner_username}</Text>}</View>
                <View>{profileId.in_relationship === false? <RelationshipTextInput /> : <EditRelationship />}</View>
                <Text className="pt-12 pb-2">Username: {profileId.username}</Text>
                <Text className="py-2">Email: {profileId.email}</Text>
                <View>{profileId.in_relationship === true? <Button title="Relationship Wrapped" onPress={() => nav.navigate('Relationship')}></Button> : null}</View>
                
                
                
            </View>
        </>
    )
}