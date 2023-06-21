import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';


const Quiz: React.FC = () => {
  
  const [quiz, setQuiz] =useState()
  
  let questionText: string;
  let answerOne: string;
  let answerTwo: string;
  let answerThree: string;
  let answerIndex: number;


  
  return (
    <>
        <View className="bg-blue-400 py-8 px-4">
            <Text className="text-white text-lg mb-4">Insert questions and answers here!    (Don't make them too easy or too difficult for your partner!)</Text>
            <View className="mb-4">
                <TextInput
                    className="border border-gray-300 bg-white rounded-full px-4 py-2"
                    placeholder="Enter your question"
                    onChangeText={(newText) => {
                        questionText = newText
            console.log('question:', questionText)
                    }}
                />
            </View>
            <View className="mb-4">
                <TextInput
                    className="border border-gray-300 bg-white rounded-full px-4 py-2"
                    placeholder="Enter your first choice"
                    onChangeText={(newText) => {
                        answerOne = newText
            console.log('1:', answerOne)
                    }}
                />
            </View>
            <View className="mb-4">
                <TextInput
                    className="border border-gray-300 bg-white rounded-full px-4 py-2"
                    placeholder="Enter your second choice"
                    onChangeText={(newText) => {
                        answerTwo = newText
            console.log('2:', answerTwo)
                    }}
                />
            </View>
            <View className="mb-4">
                <TextInput
                    className="border border-gray-300 bg-white rounded-full px-4 py-2"
                    placeholder="Enter your third choice"
                    onChangeText={(newText) => {
                        answerThree = newText
            console.log('3:', answerThree)
                    }}
                />
            </View>
            <View className="items-center justify-center bg-blue-400 px-4">
                <Text className="text-white text-lg mb-4">Which answer is correct?</Text>
                <SelectDropdown
                    buttonStyle={{ backgroundColor: '#D8A7B1', borderWidth: 2, borderRadius: 50, borderColor: 'brown', marginBottom: 10 }}
                    data={['Answer 1', 'Answer 2', 'Answer 3']}
                    onSelect={(selectedItem, index) => {
                        answerIndex=selectedItem
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    dropdownStyle={{ backgroundColor: '#FAE8E0' }}
                />
            </View>
            <View>
                <Button
                    title="Add Question"
                    className="hover:bg-blue-700 text-white font-bold py-2 px-4"
                    onPress={() => {
                    Alert.alert(
                    `Question: ${questionText}, Answers: ${answerOne}, ${answerTwo}, ${answerThree}. Correct Answer is number ${answerIndex}`
                    )
                    }}
                    buttonStyle={{ backgroundColor: '#FAE8E0', borderRadius: 50, borderWidth: 2, borderColor: 'brown' }}
				    titleStyle={{ color: '#EF7C8E' }}
                />
            </View>
        </View>
    </>
  )
};

export default Quiz;