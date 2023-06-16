import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import TabNav from '../components/TabNav';

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
    <View style={styles.buttonContainer}>
      <Button
        title="Play a Game"
        onPress={() => Alert.alert('Game section coming soon! 🎮')}
        buttonStyle={{ backgroundColor: '#D8A7B1' }}
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
        buttonStyle={{ backgroundColor: '#FAE8E0' }}
        titleStyle={{ color: '#EF7C8E' }}
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
		width: 300,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius:15,
		marginBottom: 10,
		height: 100,
		textAlign: 'center',
	},
  textInput: {
    height: 40,
    paddingHorizontal: 10,
  },
  buttonContainer: {
		alignSelf: 'center', 
		width: '45%',
		backgroundColor: '#f2daa4',
		borderRadius: 50,
		marginBottom: 20,
		marginTop: 10,
		borderWidth: 2,
		borderColor: 'brown',
		overflow: 'hidden', 
	  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SendEgg;
