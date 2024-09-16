import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput } from 'react-native';

export default function SignupScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create an account</Text>
            <Text style={styles.text}>Sign up to get started!</Text>
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry={true} />
            <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Dashboard')}>
            <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create ({
    
})

