import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Button title="Edit Profile" onPress={() => alert('Edit Profile')} />
      <Button title="Change Password" onPress={() => alert('Change Password')} />
      <Button title="Notification Preferences" onPress={() => alert('Notification Preferences')} />
      <Button title="Logout" onPress={() => navigation.navigate('Welcome')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
