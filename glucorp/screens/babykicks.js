import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';
/* import { supabase } from '../lib/supabase'; */

export default function BabyKicks() {
  const [isRecording, setIsRecording] = useState(false);
  const [kicks, setKicks] = useState([]);
  const [subscription, setSubscription] = useState(null);

  const startRecording = () => {
    setIsRecording(true);
    const sub = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      
      if (magnitude > 1.5) { // Threshold for detecting movement
        saveKick();
      }
    });
    
    Accelerometer.setUpdateInterval(100);
    setSubscription(sub);
  };

  const stopRecording = () => {
    setIsRecording(false);
    subscription?.remove();
    setSubscription(null);
  };

  const saveKick = async () => {
    try {
      const { error } = await supabase
        .from('baby_kicks')
        .insert([{ timestamp: new Date().toISOString() }]);

      if (error) throw error;
      fetchKicks();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchKicks = async () => {
    try {
      const { data, error } = await supabase
        .from('baby_kicks')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);

      if (error) throw error;
      setKicks(data || []);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchKicks();
    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.recordButton,
          { backgroundColor: isRecording ? '#EF4444' : '#10B981' }
        ]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.recordButtonText}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>Recent Kicks</Text>
      <FlatList
        data={kicks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.kickItem}>
            <Text style={styles.kickTime}>
              {new Date(item.timestamp).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  recordButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  kickItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  kickTime: {
    fontSize: 16,
  },
});