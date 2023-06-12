import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import HomePage from './src/HomePage'

export default function App() {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<Text className='text-green-500'>In APP</Text>
			<HomePage />
			<StatusBar style="auto" />
		</View>
	)
}
