import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import { useRoute } from '@react-navigation/native';


const QuizGame: React.FC = () => {
  
  const [quiz, setQuiz] =useState()
  
  let questionText: string;
  let answerOne: string;
  let answerTwo: string;
  let answerThree: string;
  let answerIndex: number;

  const [answered, setAnswered] = useState(false)
  const [answer, setAnswer] = useState('')

  const route = useRoute()
  const item = route.params?.item

  console.log('gameName', item)
  console.log('answered:', answered)
  console.log('answer:', answer)

  

  function handlePress () {
    
  }
  
  return (
    <>
        <View className="bg-blue-400 py-8 px-4">
            <Text className="text-white text-lg mb-4">Your Partner sent you a Question! Answer it to hatch your egg!</Text>
            <View className="mb-4">
                <Text>Question: {item.game.gameContent.question}</Text>
            </View>
            <View className="mb-4">
               <Button title={`Option 1: ${item.game.gameContent.answerOne}`} 
               onPress={() => {
                setAnswered(true)
                setAnswer(item.game.gameContent.answerOne)
                }}/>
            </View>
            <View className="mb-4">
                <Button title={`Option 2: ${item.game.gameContent.answerTwo}`} 
                onPress={() => {
                    setAnswered(true)
                    setAnswer(item.game.gameContent.answerTwo)
                    }}/>
            </View>
            <View className="mb-4">
                <Button title={`Option 3: ${item.game.gameContent.answerThree}`} 
                onPress={() => {
                    setAnswered(true)
                    setAnswer(item.game.gameContent.answerThree)
                    }}/>
            </View>
            <View className="items-center justify-center bg-blue-400 px-4">
                <Text>{answered === false ? null : <Text className="text-white text-lg mb-4">You have selected: {answer}. Last change to change your mind, or confirm when you are sure! Good luck!</Text>}</Text>
                <View>{answered === false ? null : <Button title={'Confirm'} onPress={handlePress}/>}</View>
            </View>

        </View>
    </>
  )
};


export default QuizGame;