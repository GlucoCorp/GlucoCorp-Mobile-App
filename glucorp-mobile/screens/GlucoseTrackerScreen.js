import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GlucoseLevelTracker = () => {
  const [measurementType, setMeasurementType] = useState('Fasting');
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="water" size={30} color="#FF0000" />
        <Text style={styles.headerText}>Glucose level tracker</Text>
        <Icon name="menu" size={30} color="#4CAF50" />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Blood Glucose</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Insights</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>History</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Choose the measurement type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={measurementType}
          onValueChange={(itemValue) => setMeasurementType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Fasting" value="Fasting" />
          <Picker.Item label="After Meal" value="After Meal" />
          <Picker.Item label="Before Meal" value="Before Meal" />
        </Picker>
      </View>

      <Text style={styles.label}>Type in your measurement:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>98</Text>
      </View>

      <Text style={styles.sectionTitle}>Recent events</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Today' && styles.activeTab]}
          onPress={() => setActiveTab('Today')}
        >
          <Text style={styles.tabText}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'This week' && styles.activeTab]}
          onPress={() => setActiveTab('This week')}
        >
          <Text style={styles.tabText}>This week</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'This Month' && styles.activeTab]}
          onPress={() => setActiveTab('This Month')}
        >
          <Text style={styles.tabText}>This Month</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.eventContainer}>
        <Text style={styles.eventTime}>15:50hrs</Text>
        <Text style={styles.eventValue}>90 mg/dL</Text>
      </View>
      <View style={styles.eventContainer}>
        <Text style={styles.eventTime}>16:00hrs</Text>
        <Text style={styles.eventValue}>80 mg/dL</Text>
      </View>
      <View style={styles.eventContainer}>
        <Text style={styles.eventTime}>21:30hrs</Text>
        <Text style={styles.eventValue}>98.4 mg/dL</Text>
      </View>
      <View style={styles.eventContainer}>
        <Text style={styles.eventTime}>23:45hrs</Text>
        <Text style={styles.eventValue}>102.4 mg/dL</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  picker: {
    height: 50,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  inputText: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
  },
  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  eventTime: {
    fontSize: 16,
  },
  eventValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GlucoseLevelTracker;