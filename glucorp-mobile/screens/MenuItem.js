import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MenuItem = ({ title, description, icon, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.menuItem}>
    <Icon name={icon} size={24} color="#4CAF50" style={styles.menuIcon} />
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuDescription}>{description}</Text>
    </View>
    <Icon name="chevron-right" size={24} color="#4CAF50" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({});
export default MenuItem;