import React, { useContext, useEffect, useState } from 'react'
import { Button, Text, View, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../Context/UserContext'
import { checkUser, getUserData } from '../../utils'
import { TouchableOpacity } from 'react-native'
import Egg from '../../assets/Egg.png'
import Nest from '../../assets/Nest.png'
import { ActivityIndicator } from 'react-native'

function Home() {
	const nav = useNavigation()
	const { profileId, setProfileId } = useContext(UserContext)
	const [loading, setLoading] = useState(true);


	//Research about useEffect and why it is not reRendering
	useEffect(() => {
		getUserData().then((userData: any) => {
			setProfileId(userData)
			setLoading(false);
		})
	}, [])

	/* Loading State */
	if (loading) {
		return (
		  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" color="#D8A7B1" />
		  </View>
		);
	  }
  
	return (

		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#0fb5fe' }}>
			<TouchableOpacity onPress ={() => nav.navigate('Nest' as never)}>
				<Image source={Nest} style={styles.image}/>
			</TouchableOpacity>
			<Text>My Nest</Text>
			<TouchableOpacity onPress ={() => nav.navigate('Send Egg' as never)}>
				<Image source={Egg} style={styles.image}/>
			</TouchableOpacity>
			<Text>Send Egg</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	 image: {
    width: 200,
    height: 200,
  },
})

export default Home
