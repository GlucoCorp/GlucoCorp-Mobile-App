import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GluCorp.</Text>
      <Text style={styles.subtitle}>Let's take care of you and your baby</Text>
      <TouchableOpacity 
        style={styles.Button} 
        onPress={() => navigation.navigate('GlucoseLevelTracker')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'white',
    fontFamily: ''
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  Button: {
    backgroundColor:'orange',
    width: 100,
    borderRadius: 10
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 15

  }
});
