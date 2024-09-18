import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Make sure to install expo-vector-icons

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
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.signUpButton}>
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
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginLink}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
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
    borderColor: "black"
 },
  signUpButton: {
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },
  loginText: {
    color: 'black',
    textAlign: 'center',
  },
  loginLink: {
    color: "orange",
    textAlign: "center"
  }
});

export default SignUpScreen;