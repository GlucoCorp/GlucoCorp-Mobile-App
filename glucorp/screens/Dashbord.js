import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const Dashboard = ({ navigation }) => {
  // State to store the user's name
  const [userName, setUserName] = useState('');

  // Simulate fetching the name from registration or an API
  useEffect(() => {
    // In a real scenario, you can replace this with an API call
    const fetchUserName = async () => {
      const registeredName = await getRegisteredUserName(); // Simulated API call
      setUserName(registeredName);
    };
    fetchUserName();
  }, []);

  // Mock function to simulate fetching the user's name
  const getRegisteredUserName = async () => {
    // In a real app, you might fetch this from AsyncStorage, an API, or a database
    return 'Jessika'; // Replace this with actual data
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.greeting}>
          <Text style={styles.helloText}>Hello,</Text>
          {/* Dynamically display the registered user's name */}
          <Text style={styles.nameText}>{userName}!</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
             <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profilePic} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search..." style={styles.searchInput} />
      </View>

      {/* Notification Section */}
      <View style={styles.notificationCard}>
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>Need Help?</Text>
          <Text style={styles.notificationMessage}>
            Worry no more! Here to help with your pregnancy journey.
          </Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Options Section */}
      <Text style={styles.optionsTitle}>What do you need?</Text>
      <View style={styles.optionsGrid}>
        <TouchableOpacity style={[styles.optionButton, styles.diagnosis]}>
          <Text style={styles.optionText}>Model Prediction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Glucose Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Chatbot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Baby Development</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.optionButton, styles.home]}>
          <Text style={styles.optionText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Find a Doctor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "flex-end"
  },
  greeting: {
    flex: 1,
    marginLeft: 10,
    alignItems: "flex-start"
  },
  helloText: {
    fontSize: 18,
    color: '#555',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    fontSize: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#4D5B9E',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#FFF',
  },
  closeButton: {
    marginLeft: 10,
    padding: 10,
  },
  closeText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  optionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    backgroundColor: '#D94F70',
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  diagnosis: {
    backgroundColor: '#F2994A',
  },
  home: {
    backgroundColor: '#EB5757',
  },
});

export default Dashboard;
