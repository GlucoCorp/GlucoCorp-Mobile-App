import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../lib/supabase'; // Ensure this file path is correct

export default function GlucoseMonitor() {
  const [reading, setReading] = useState('');
  const [readingType, setReadingType] = useState('Fasting'); // Default reading type
  const [readings, setReadings] = useState([]);

  const saveReading = async () => {
    if (!reading || isNaN(parseFloat(reading))) {
      Alert.alert('Error', 'Please enter a valid number');
      return;
    }

    try {
      const { error } = await supabase
        .from('glucose')
        .insert([
          {
            glucose_levels: parseFloat(reading),
            reading_type: readingType,
            timestamp: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      setReading('');
      fetchReadings();
      Alert.alert('Success', 'Reading saved successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchReadings = async () => {
    try {
      const { data, error } = await supabase
        .from('glucose')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;
      setReadings(data || []);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchReadings();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter glucose reading (mg/dL)"
            value={reading}
            onChangeText={setReading}
            keyboardType="numeric"
          />

          <Picker
            selectedValue={readingType}
            onValueChange={(itemValue) => setReadingType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Fasting" value="Fasting" />
            <Picker.Item label="Post-Meal" value="Post-Meal" />
            <Picker.Item label="Bedtime" value="Bedtime" />
            {/* Add more types if needed */}
          </Picker>

          <TouchableOpacity style={styles.button} onPress={saveReading}>
            <Text style={styles.buttonText}>Save Reading</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={readings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.readingItem}>
              <Text style={styles.readingType}>{item.type}</Text>
              <Text style={styles.readingValue}>{item.value} mg/dL</Text>
              <Text style={styles.readingDate}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6B46C1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  readingItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  readingType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  readingValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  readingDate: {
    color: '#666',
    marginTop: 5,
  },
});
