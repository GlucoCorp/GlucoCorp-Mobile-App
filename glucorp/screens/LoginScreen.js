import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={ styles.headerText }>Welcome!</Text>
      <Text style={ styles.subtitleText }>Login With</Text>
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
       <View style={{flexDirection: 'row', alignItems: 'center'}}>
         <View style={{flex: 1, height: 1, margin: 30, backgroundColor: 'black'}} />
         <View>
           <Text style={{width: 20, textAlign: 'center'}}>Or</Text>
         </View>
         <View style={{flex: 1, height: 1, margin:30, backgroundColor: 'black'}} />
       </View>
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
      <Text style={styles.accText}>
           Forgot Password?
       </Text>
      <Text style={styles.accText}>
          Don't Have an Account?
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.loginLink}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#D94F70"
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 100
  },
  subtitleText: {
     fontSize: 20,
     fontWeight: "bold",
     alignItems: "left",
     color: "#ffffff",
     marginBottom: 20
  },
  socialLoginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
   },
   socialButton: {
       backgroundColor: 'white',
       borderRadius: 20,
       padding: 10,
       marginHorizontal: 10,
   },
   orText: {
    fontWeight: "bold",
    marginTop: 20
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
    backgroundColor: '#000000',
    padding: 10,
    margin: 10,
    width: 300,
    height: 45,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 100,
    marginBotto:30
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold"
  },
  accText: {
    color: "#ffffff",
    fontWeight: "bold"
  },
  loginLink: {
    color: "orange",

  }
});