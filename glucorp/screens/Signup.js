import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Make sure to install expo-vector-icons
import { createUser } from '../lib/appwrite';

const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require('./assets/images/Pregnantwoman3.jpeg')}
          style={styles.avatar}
        />
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Full name"
      />
      <TextInput
        style={styles.input}
        placeholder="Email address"
        keyboardType="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.signUpButton} onPress={createUser}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      
      <Text style={styles.orText}>Or</Text>
      
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="apple1" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="facebook-square" size={24} color="blue" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.loginText}>
        Already have an account?{' '}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: 'center',
    width: '100%'
  },
  
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginBottom: 30,
    borderColor: "black",
    borderWidth: 1
 },
  signUpButton: {
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#FFC107"
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orText: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: "bold"
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },
  loginText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: "bold"
  },
  loginLink: {
    color: "orange",
    textAlign: "center",
    fontWeight: "bold"
  }
});

export default SignUpScreen;