import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import supabase from '../lib/supabase.ts';

// Define the EmailVerification component as a constant
const EmailVerification = ({ navigation }) => {
  const [email, setEmail] = useState(''); // State for email
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyCode = async () => {
    setLoading(true);
    setError('');

    const { user, session, error } = await supabase.auth.verifyOtp({
      token: verificationCode,
      type: 'magiclink',
    });

    setLoading(false);

    if (error) {
      setError('Verification failed. Please check the code and try again.');
    } else {
      navigation.navigate('Login');
    }
  };

  const resendVerificationCode = async () => {
    const { error } = await supabase.auth.api.sendVerificationEmail(email); // Use the email associated with the user

    if (error) {
      alert('Failed to resend verification code. Please try again.');
    } else {
      alert('Verification code resent!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Email Verification</Text>
      <Text style={styles.subtitleText}>We've sent a verification code to your email.</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter verification code"
        onChangeText={setVerificationCode}
        keyboardType="numeric"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify Code'}</Text>
      </TouchableOpacity>
      <Text style={styles.accText}>Didn't receive the code?</Text>
      <TouchableOpacity onPress={resendVerificationCode}>
        <Text style={styles.loginLink}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
};

// Export the component at the bottom
export default EmailVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#D94F70",
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  subtitleText: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  verifyButton: {
    backgroundColor: '#000000',
    padding: 10,
    width: '100%',
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  accText: {
    color: "#ffffff",
    marginTop: 20,
  },
  loginLink: {
    color: "orange",
    fontWeight: "bold",
  },
});
