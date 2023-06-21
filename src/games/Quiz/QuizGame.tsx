import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { updateLock } from '../../../utils';


const QuizGame: React.FC = () => {

  const nav = useNavigation();

  const [answered, setAnswered] = useState(false)
  const [answer, setAnswer] = useState('')

  const route = useRoute()
  const item = route.params?.item

  const answerOne:string = item.game.gameContent.answerOne
  const answerTwo:string = item.game.gameContent.answerTwo
  const answerThree:string = item.game.gameContent.answerThree
  const answerIndex:string = item.game.gameContent.solution
  const answerNumber:number = +answerIndex.substring(7) - 1
  const answerArray:string[] = [answerOne, answerTwo, answerThree]

  

  function handlePress () {
    
    if(answer === answerArray[answerNumber]){
        Alert.alert('Congratulations!', 'You got the right answer!', [
            {
                text: 'Hatch your egg',
                onPress: () => {
                    nav.navigate('My Egg' as never, { item })
                    updateLock(item)
                },
            },
        ])
    } else {
        Alert.alert('Incorrect!', 'Better try again! How well do you really know your partner?')
    }
  }
  
  return (
    <>
        <View className="flex flex-col items-center justify-center h-screen py-8 px-4 bg-[#0fb5fe]">
            <Text className="text-white text-xl mb-4 text-center px-4">Your Partner sent you a Question! Answer it to hatch your egg!</Text>
            <View className="mb-4">
                <Text className='mb-4 text-xl text-center text-white underline'>Question: {item.game.gameContent.question}</Text>
            </View>
            <View className="mb-4">
               <Button 
                className='w-60'
                buttonStyle={{ backgroundColor: '#ffc0cb', borderWidth: 2, borderRadius: 50, borderColor: 'brown', marginBottom: 10 }}
                titleStyle={{ color: '#000000' }}
                title={`Option 1: ${item.game.gameContent.answerOne}`} 
                onPress={() => {
                    setAnswered(true)
                    setAnswer(item.game.gameContent.answerOne)
                    }}
                
                />
            </View>
            <View className="mb-4">
                <Button 
                className='w-60'
                buttonStyle={{ backgroundColor: '#ffc0cb', borderWidth: 2, borderRadius: 50, borderColor: 'brown', marginBottom: 10 }}
                titleStyle={{ color: '#000000' }}
                title={`Option 2: ${item.game.gameContent.answerTwo}`} 
                onPress={() => {
                    setAnswered(true)
                    setAnswer(item.game.gameContent.answerTwo)
                    }}
                    
                />
            </View>
            <View className="mb-4">
                <Button 
                className='w-60'
                buttonStyle={{ backgroundColor: '#ffc0cb', borderWidth: 2, borderRadius: 50, borderColor: 'brown', marginBottom: 10 }}
                titleStyle={{ color: '#000000' }}
                title={`Option 3: ${item.game.gameContent.answerThree}`} 
                onPress={() => {
                    setAnswered(true)
                    setAnswer(item.game.gameContent.answerThree)
                    }}/>
            </View>
            <View className="items-center justify-center bg-[#0fb5fe] px-4">
                <Text>{answered === false ? null : <Text className="text-white text-lg mb-4">You have selected: {answer}.</Text>}</Text>
                <View>{answered === false ? null : <Button title={'Confirm'} onPress={handlePress} className='w-60' buttonStyle={{ backgroundColor: '#ffc0cb', borderWidth: 2, borderRadius: 50, borderColor: 'brown', marginBottom: 10 }} titleStyle={{ color: '#000000' }}/>}</View>
                <Text>{answered === false ? null : <Text className="text-white text-lg mb-4">Confirm...? Or change your mind first!</Text>}</Text>
            </View>

        </View>
    </>
  )
};


export default QuizGame;