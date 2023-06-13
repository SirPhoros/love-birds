import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const SendEgg: React.FC = () => {
  const [message, setMessage] = useState('');


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
          color="#ffffff"
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
          color="#000000"
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
    backgroundColor: '#f2daa4',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  gameContainer: {
    width: '80%',
    backgroundColor: 'green',
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#000000',
  },
});

export default SendEgg;
