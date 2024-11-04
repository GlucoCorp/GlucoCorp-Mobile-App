import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import supabase from '../lib/supabase'; // Import the supabase client

const SignUpScreen = ({ navigation }) => {
  const [user, setUser] = useState({ email: '', password: '', name: '' });
  const [passwordError, setPasswordError] = useState('');

  const checkUserExists = async (email, name) => {
    const { data: emailCheckData, error: emailCheckError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email);

    const { data: nameCheckData, error: nameCheckError } = await supabase
      .from('users')
      .select('id')
      .eq('name', name);

    if (emailCheckError || nameCheckError) {
      Alert.alert('Error', emailCheckError?.message || nameCheckError?.message);
      return true;
    }

    return emailCheckData.length > 0 || nameCheckData.length > 0;
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);

    if (password.length < minLength) {
      setPasswordError(`Password must be at least ${minLength} characters long.`);
      return false;
    } else if (!(hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas)) {
      setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const validateForm = () => {
    if (!user.name || !user.email || !user.password) {
      Alert.alert('Error', 'All fields are required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    return validatePassword(user.password);
  };

  async function signUpWithEmail() {
    if (!validateForm()) return;

    const userExists = await checkUserExists(user.email, user.name);

    if (userExists) {
      Alert.alert('Error', 'Email or name is already taken. Please choose another.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ name: user.name })
        .eq('id', data.user.id);

      if (updateError) {
        Alert.alert('Warning', 'Account created, but failed to set name: ' + updateError.message);
      } else {
        Alert.alert('Success', 'Account created successfully!');
      }
      navigation.navigate('EmailVerification');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        keyboardType="email-address"
        onChangeText={(value) => setUser({ ...user, email: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(value) => {
          setUser({ ...user, password: value });
          validatePassword(value);
        }}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <Text style={styles.passwordHint}>
        Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.
      </Text>

      <TouchableOpacity style={styles.signUpButton} onPress={signUpWithEmail}>
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
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.loginLink}>Log in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#D94F70",
    padding: 20,
    justifyContent: 'center',
    width: '100%',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
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
    marginTop: 10,
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orText: {
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: "bold",
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
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: "bold",
    marginTop: 10,
  },
  loginLink: {
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  errorText: {
    color: 'yellow',
    marginBottom: 10,
  },
  passwordHint: {
    color: 'white',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default SignUpScreen;