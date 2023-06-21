import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet } from 'react-native';
import { Text, Button, Image } from 'react-native-elements';
import LoveBirdsLogo from '../../assets/Lovebirds-Logo.gif';
import { useNavigation } from '@react-navigation/native';
import { handleSignUpWithEmail } from '../../utils';

export default function Register() {
  const nav = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerErr, setRegisterErr] = useState(false);
  const [registerStatus, setRegisterStatus] = useState(false);

  function EmailRegister({ setEmail, setPassword, setRegisterErr, setRegisterStatus }) {
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    function handlePasswordChange(newText) {
      setNewPassword(newText);
      setPasswordError('');
    }

    function handleRegister() {
      if (newPassword.length < 8) {
        setPasswordError('Password must be at least 8 characters long');
      } else if (!/\d/.test(newPassword)) {
        setPasswordError('Password must include a number');
      } else if (!/[A-Z]/.test(newPassword)) {
        setPasswordError('Password must include an uppercase letter');
      } else {
        setEmail(newEmail);
        setPassword(newPassword);
        handleSignUpWithEmail(newEmail, newPassword)
          .then(() => {
            setRegisterStatus(true);
            setRegisterErr(false);
            Alert.alert('Registered Successfully!');
          })
          .catch((error) => {
            setRegisterErr(true);
          });
      }
    }

    return (
      <>
        <View style={styles.register}>
          <TextInput
            placeholder="Email"
            onChangeText={(newText) =>
              setNewEmail(newText.toLowerCase().replace(/\s+/g, ''))
            }
            style={styles.textContainer}
          />
          <View style={{ alignItems: 'center' }}></View>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
            style={styles.textContainer}
          />
          <View style={{ alignItems: 'center' }}>
            {registerErr ? (
              <Text style={styles.errorText}>
                The email/password does not meet the criteria
              </Text>
            ) : null}
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Register"
              onPress={handleRegister}
              buttonStyle={{ backgroundColor: '#FAE8E0' }}
              titleStyle={{ color: '#EF7C8E' }}
            />
          </View>
        </View>
      </>
    );
  }

  function WelcomeMessage() {
    return (
      <>
        <View>
          <Text className="font-bold text-white text-2xl py-7 self-center">
            Thank you for signing up!
          </Text>
          <Text className="font-bold text-white text-xl py-7 text-center">
            You can update your details within the profile page
          </Text>
          <Button
            title="Head to the App"
            onPress={() => {
              nav.navigate('Home Page' as never);
            }}
            buttonStyle={{
              backgroundColor: '#FAE8E0',
              borderRadius: 50,
              borderWidth: 2,
              borderColor: 'brown',
            }}
            titleStyle={{ color: '#EF7C8E' }}
          />
        </View>
      </>
    );
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0fb5fe',
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={LoveBirdsLogo}
          style={{
            resizeMode: 'contain',
            height: 175,
            width: 300,
            borderRadius: 40,
          }}
        />
      </View>
      <View>
        {registerStatus ? (
          <WelcomeMessage />
        ) : (
          <EmailRegister
            setEmail={setEmail}
            setPassword={setPassword}
            setRegisterErr={setRegisterErr}
            setRegisterStatus={setRegisterStatus}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  register: {
    marginBottom: 80,
  },
  textContainer: {
    width: 350,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    marginBottom: 20,
    height: 50,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '70%',
    backgroundColor: '#f2daa4',
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'brown',
    overflow: 'hidden',
  },
  imageContainer: {
    marginBottom: 50,
    marginTop: -70,
  },
  errorText: {
    fontSize: 15,
    color: 'red',
  },
});
