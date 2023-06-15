import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button } from "react-native-elements";


const SendEgg: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  /* --- Loading State --- */
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500); 
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#a2f6e7" />
      </View>
    );
  }


// Work in progress once we can manage the messages

//   const handleSendMessage = () => {
//     // Logic to send the message
//     console.log('Sending message:', message);
//     // Reset the input field
//     setMessage('');
//   };

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <Button
          title="Play a Game"
          onPress={() => Alert.alert('Game section coming soon! 🎮')}
          buttonStyle={{ backgroundColor: '#a2f6e7' }}
          titleStyle={{ color: 'brown' }}
        />
      </View>
      <View style={styles.textContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your message"
          value={message}
          onChangeText={setMessage}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Send"
          onPress={() => Alert.alert('Message sent but lost now 🤷‍♂️')}
        //   onPress={handleSendMessage} //to fix once we can pass the stuff from database
          buttonStyle={{ backgroundColor: '#f2daa4' }}
          titleStyle={{ color: 'brown' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '25%',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'brown',
  },
  gameContainer: {
    width: '80%',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'brown',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SendEgg;
