import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
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
    <View>
        <Text>Insert Questions and answers here! (Don't make them too easy or too difficult for your partner!)</Text>
        <View>
					<TextInput
						placeholder="Enter your question"
						onChangeText={(newText) => {
							questionText = newText
              console.log('question:', questionText)
						}}
					/>
				</View>
        <View>
					<TextInput
						placeholder="Enter your first choice"
						onChangeText={(newText) => {
							answerOne = newText
              console.log('1:', answerOne)
						}}
					/>
				</View>
        <View>
					<TextInput
						placeholder="Enter your second choice"
						onChangeText={(newText) => {
							answerTwo = newText
              console.log('2:', answerTwo)
						}}
					/>
				</View>
        <View>
					<TextInput
						placeholder="Enter your third choice"
						onChangeText={(newText) => {
							answerThree = newText
              console.log('3:', answerThree)
						}}
					/>
				</View>
        <View>
          <Text>Which answer is correct?</Text>
        <SelectDropdown
					buttonStyle={{ backgroundColor: '#D8A7B1'}}
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
          dropdownStyle={{ borderRadius: 20, backgroundColor: '#FAE8E0' }}
				/>
				</View>
        <Button
						title="Add Question"
						onPress={() => {
              Alert.alert(
                `Question: ${questionText}, Answers: ${answerOne}, ${answerTwo}, ${answerThree}. Correct Answer is number ${answerIndex}`
                
                )
							
						}}

					/>
    </View>
    </>
  )
};

export default Quiz;