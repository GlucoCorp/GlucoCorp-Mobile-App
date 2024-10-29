import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard({ navigation }) {
  const menuItems = [
    {
      title: 'Glucose Monitor',
      icon: 'water',
      screen: 'GlucoseMonitor',
      color: '#F687B3',
    },
    {
      title: 'Blood Pressure',
      icon: 'heart',
      screen: 'BloodPressure',
      color: '#63B3ED',
    },
    {
      title: 'Baby Kicks',
      icon: 'footsteps',
      screen: 'BabyKicks',
      color: '#68D391',
    },
    {
      title: 'Baby Development',
      icon: 'body',
      screen: 'BabyDevelopment',
      color: '#F6E05E',
    },
    {
      title: 'Community',
      icon: 'people',
      screen: 'Community',
      color: '#9F7AEA',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons name={item.icon} size={32} color="white" />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});