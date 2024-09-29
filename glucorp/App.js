import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/Signup';
import LoginScreen from './screens/LoginScreen'; // Correct component import
import Questionnaire from './screens/Questionnaire';
import Dashboard from './screens/Dashbord';
import Profile from './screens/Profile';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Questionnaire" component={Questionnaire} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}}  />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Register the app with Expo
registerRootComponent(App);
