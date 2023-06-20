import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

interface Question {
  question: string;
  choices: string[];
  correctAnswerIndex: number;
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleAddQuestion = () => {
    if (questions.length >= 1) return; // Limit num of questions to 1

    const choices = ['', '', ''];
    const correctAnswerIndex = Math.floor(Math.random() * choices.length);
    setQuestions([{ question: '', choices, correctAnswerIndex }]);
  };

  const handleQuestionChange = (text: string, index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = text;
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (
    text: string,
    questionIndex: number,
    choiceIndex: number
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices[choiceIndex] = text;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Perform additional logic here, to send questions to another user
  };

  const handleCloseQuiz = () => {
    setQuestions([]);
    setSubmitted(false);
  };

  return (
    <View className='flex-1 p-4 View bg-[#0fb5fe]'>
      <View className='mb-4'>
        {questions.map((question, index) => (
          <View key={index}>
            <Text className='font-bold text-lg mb-2'>Your Question:</Text>
            <TextInput
              className='border border-gray-400 rounded p-2 mb-2 bg-white'
              value={question.question}
              onChangeText={(text) => handleQuestionChange(text, index)}
            />
            {question.choices.map((choice, choiceIndex) => (
              <View key={choiceIndex}>
                <Text className='mb-1'>Answer {choiceIndex + 1}:</Text>
                <TextInput
                  className='border border-gray-400 rounded p-2 mb-2 bg-white'
                  value={choice}
                  onChangeText={(text) =>
                    handleChoiceChange(text, index, choiceIndex)
                  }
                />
              </View>
            ))}
          </View>
        ))}
      </View>
      {submitted ? (
        <>
          <View className="self-center w-70 bg-[#FAE8E0] rounded-full mb-10 mt-1 border-2 border-[#8B4513] overflow-hidden">
            <Button
              title="Close Quiz"
              onPress={handleCloseQuiz}
              color="#EF7C8E"
              style={{ fontWeight: 'bold', paddingVertical: 8, paddingHorizontal: 16 }}
            />
          </View>
        </>
      ) : (
        <View className="self-center w-70 bg-[#FAE8E0] rounded-full mb-10 mt-1 border-2 border-[#8B4513] overflow-hidden">
          <Button
            title={questions.length === 1 ? 'Submit' : 'Add Question'}
            onPress={questions.length === 1 ? handleSubmit : handleAddQuestion}
          />
        </View>
      )}
    </View>
  );
};

export default Quiz;