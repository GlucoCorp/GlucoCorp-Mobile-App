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
/* import { supabase } from '../lib/supabase'; */

export default function BloodPressure() {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [readings, setReadings] = useState([]);

  const saveReading = async () => {
    if (!systolic || !diastolic || isNaN(parseFloat(systolic)) || isNaN(parseFloat(diastolic))) {
      Alert.alert('Error', 'Please enter valid numbers');
      return;
    }

    try {
      const { error } = await supabase
        .from('blood_pressure')
        .insert([{
          systolic: parseFloat(systolic),
          diastolic: parseFloat(diastolic),
          timestamp: new Date().toISOString()
        }]);

      if (error) throw error;
      
      setSystolic('');
      setDiastolic('');
      fetchReadings();
      Alert.alert('Success', 'Reading saved successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchReadings = async () => {
    try {
      const { data, error } = await supabase
        .from('blood_pressure')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);

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
          placeholder="Systolic (top number)"
          value={systolic}
          onChangeText={setSystolic}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Diastolic (bottom number)"
          value={diastolic}
          onChangeText={setDiastolic}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={saveReading}>
          <Text style={styles.buttonText}>Save Reading</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={readings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.readingItem}>
            <Text style={styles.readingValue}>{item.systolic}/{item.diastolic} mmHg</Text>
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
    marginTop: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
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
  readingValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  readingDate: {
    color: '#666',
    marginTop: 5,
  },
});