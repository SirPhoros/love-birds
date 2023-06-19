import React, { useContext, useEffect } from 'react'
import { Button, Text, View, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../Context/UserContext'
import { checkUser, getUserData } from '../../utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Egg from '../../assets/Egg.png'
import Nest from '../../assets/Nest.png'

function Home() {
	const nav = useNavigation()
	const { profileId, setProfileId } = useContext(UserContext)

	//Research about useEffect and why it is not reRendering
	useEffect(() => {
		getUserData().then((userData: any) => {
			setProfileId(userData)
		})
	}, [])
  
	return (

		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#F0CCB0' }}>
			<TouchableOpacity onPress ={() => nav.navigate('Nest' as never)}>
				<Image source={Nest} style={styles.image}/>
			</TouchableOpacity>
			<TouchableOpacity onPress ={() => nav.navigate('Send Egg' as never)}>
				<Image source={Egg} style={styles.image}/>
			</TouchableOpacity>
			<Button
				title="Go to Welcome Page"
				onPress={() => nav.navigate('Welcome' as never)}
			/>
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
