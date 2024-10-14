import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Make sure to install expo-vector-icons
import supabase from '../lib/supabase.ts'; // Ensure the path is correct

const SignUpScreen = ({ navigation }) => {
  const [user, setUser] = useState({ email: '', password: '', name: '' });

  async function signUpwithEmail() {
    const { email, password, name } = user; // Destructure user to get email, password, name
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, // Store the name in user metadata
      },
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login'); // Redirect to Login screen after sign up
    }
  }

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
        placeholder="Name"
        onChangeText={(value) => setUser({ ...user, name: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(value) => setUser({ ...user, email: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(value) => setUser({ ...user, password: value })}
      />

      <TouchableOpacity style={styles.signUpButton} onPress={signUpwithEmail}>
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

      <Text style={styles.loginText}>Already have an account?{' '}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D94F70",
    padding: 20,
    justifyContent: 'center',
    width: '100%',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 50,
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
    borderWidth: 1,
  },
  signUpButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#000000",
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orText: {
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: "bold",
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
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: "bold",
  },
  loginLink: {
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
