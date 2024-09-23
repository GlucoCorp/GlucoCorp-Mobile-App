import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Text>Sign in to continue</Text>
      <TextInput 
      style = {styles.input}
      placeholder="Email" 
      autoCapitalize="none" 
      onChangeText={value => { setUser({ ...user, email: value }); }} 
     />
      <TextInput 
        style = {styles.input}
        placeholder="Password" 
        onChangeText={value => { setUser({ ...user, password: value }); }} secureTextEntry 
      />
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Dashboard')}> 
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
  },
  signupButton: {
    backgroundColor: 'green',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});