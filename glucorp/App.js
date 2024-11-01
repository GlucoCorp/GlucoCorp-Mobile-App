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
import EmailVerification from './screens/EmailVerification';
import GlucoseMonitor from './screens/GlucoseTracking';
import Community from './screens/community';
import BloodPressure from './screens/BloodPressure';
import BabyKicks from './screens/babykicks';
import BabyDevelopment from './screens/babydev';

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
        <Stack.Screen name="EmailVerification" component={EmailVerification} options={{headerShown: false}} />
        <Stack.Screen name="GlucoseMonitor" component={GlucoseMonitor} options={{headerShown: false}} />
        <Stack.Screen name="Community" component={Community} options={{headerShown: false}} />
        <Stack.Screen name="BloodPressure" component={BloodPressure} options={{headerShown: false}} />
        <Stack.Screen name="BabyKicks" component={BabyKicks} options={{headerShown: false}} />
        <Stack.Screen name="BabyDevelopment" component={BabyDevelopment} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Register the app with Expo
registerRootComponent(App);
