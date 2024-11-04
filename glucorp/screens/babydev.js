import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const weeklyData = [
  {
    week: 8,
    size: 'Raspberry',
    description: 'Your baby is about the size of a raspberry. Major organs are forming!',
  },
  {
    week: 12,
    size: 'Lime',
    description: 'Your baby is now the size of a lime. Reflexes are developing!',
  },
  {
    week: 16,
    size: 'Avocado',
    description: 'Your baby is as big as an avocado. The baby can make sucking movements!',
  },
  {
    week: 20,
    size: 'Banana',
    description: 'Your baby is the length of a banana. You might feel movement!',
  },
  {
    week: 24,
    size: 'Corn',
    description: 'Your baby is as long as an ear of corn. The baby is developing taste buds!',
  },
  {
    week: 28,
    size: 'Eggplant',
    description: 'Your baby is the size of an eggplant. Eyes can open and close!',
  },
  {
    week: 32,
    size: 'Squash',
    description: 'Your baby is the size of a squash. The baby is practicing breathing!',
  },
  {
    week: 36,
    size: 'Honeydew Melon',
    description: 'Your baby is as big as a honeydew melon. Getting ready for birth!',
  },
];

export default function BabyDevelopment() {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Baby Development Timeline</Text>
      {weeklyData.map((item, index) => (
        <View key={index} style={styles.weekContainer}>
          <Text style={styles.weekTitle}>Week {item.week}</Text>
          <Text style={styles.sizeText}>Size: {item.size}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6B46C1',
  },
  weekContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  weekTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2D3748',
  },
  sizeText: {
    fontSize: 18,
    color: '#6B46C1',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
  },
});