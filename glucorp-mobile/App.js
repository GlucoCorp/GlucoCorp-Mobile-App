import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen.js';
import DashboardScreen from './screens/DashboardScreen';
import GlucoseLevelTracker from './screens/GlucoseTrackerScreen.js';
import ProfileScreen from './screens/ProfileScreen';
import Signup from './screens/Signup.js';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
    CubaRegular: require('./assets/fonts/PlaywriteCU-Regular.ttf'),
    CubaExtraLight: require('./assets/fonts/PlaywriteCU-ExtraLight.ttf'),
    CubaLight: require('./assets/fonts/PlaywriteCU-Light.ttf'),
    CubaThin: require('./assets/fonts/PlaywriteCU-Thin.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner/component if you have one
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="GlucoseLevelTracker" component={GlucoseLevelTracker} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
