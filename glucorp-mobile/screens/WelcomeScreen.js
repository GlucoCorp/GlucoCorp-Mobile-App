import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('./assets/images/DigitalFindsCanada.jpeg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>GluCorp</Text>
          <Text style={styles.subtitle}>Holistic care for mothers and babies</Text>
        </View>
        <View style={styles.buttonContainer}>
        <Text style={styles.getStartedText}>Get started</Text>
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.signupButton} 
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'contain'

  },
  container: {
    flex: 1,
    justifyContent: 'space-between', // Space out content and buttons
    alignItems: 'center',
    paddingBottom: 20, // Padding from the bottom for buttons
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Center title and subtitle vertically
    alignItems: 'center',
    marginTop: 50, // Adjust spacing as needed
  },
  title: {
    fontSize: 50, // Increased size for emphasis
    fontWeight: 'bold',
    color: '#FFFFFF', // Adjust to match the design color
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    color: '#CCCCCC', // Adjust to match the design color
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '400',
  },
  getStartedText: {
    fontSize: 20,
    color: 'black', // Adjust color as needed
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'black',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: 'black',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
