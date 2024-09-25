import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={ styles.headerText }>Welcome!</Text>
      <Text style={ styles.subtitleText }>Sign in to continue</Text>
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
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Questionnaire')}> 
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
    backgroundColor: "#000000"
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "left",
    color: "#ffffff"
  },
  subtitleText: {
     fontSize: 20,
     fontWeight: "bold",
     alignItems: "left",
     color: "orange"
  },
  input: {
    width: 300,
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    backgroundColor: "#ffffff",
    color: "#000000"
  },
  loginButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    margin: 10,
    width: 200,
    height: 45,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 100,
    marginBotto:30
  },
  signupButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    margin: 10,
    width: 200,
    height: 50,
    borderRadius: 20,
    alignItems: "center"
  },
  buttonText: {
    color: '#000000',
    fontSize: 20,
  },
});