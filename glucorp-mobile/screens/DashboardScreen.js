import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install this package
import MenuItem from './MenuItem';
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://example.com/profile-pic.jpg' }}
          style={styles.profilePic}
        />
        <Text style={styles.greeting}>Hi, Lynn</Text>
        <Icon name="menu" size={24} color="#FFF" style={styles.menuIcon} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('GlucoseLevelTracker')}>
      <MenuItem
        title="Glucose level tracker"
        description="Track your glucose levels"
        icon="timeline"
      />
    </TouchableOpacity>

      <MenuItem
        title="Check your prediction level"
        description="View glucose predictions"
        icon="assessment"
      />
      <MenuItem
        title="Talk to a doctor"
        description="Consult with healthcare professionals"
        icon="local-hospital"
      />
      <MenuItem
        title="Healthy Living"
        description="Tips for a healthier lifestyle"
        icon="favorite"
      />
      <MenuItem
        title="Device management"
        description="Manage your connected devices"
        icon="devices"
      />

      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatButtonText}>How can we help you?</Text>
        <Icon name="chat" size={24} color="#4CAF50" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4CAF50',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  greeting: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E8F5E9',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  chatButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
});