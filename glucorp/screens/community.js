import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Community() {
  const handleJoinCommunity = async () => {
    const whatsappUrl = 'https://chat.whatsapp.com/L404sFO9JD82DVjgFPbLNz';
    
    try {
      const supported = await Linking.canOpenURL(whatsappUrl);

      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert(
          'Error',
          'WhatsApp is not installed on your device',
          [
            {
              text: 'OK',
              style: 'default',
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open WhatsApp');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="people" size={60} color="#6B46C1" />
        <Text style={styles.title}>Join Our Community</Text>
      </View>

      <Text style={styles.description}>
        Connect with other expectant mothers, share experiences, and get support
        from our caring community.
      </Text>

      <TouchableOpacity
        style={styles.joinButton}
        onPress={handleJoinCommunity}
      >
        <Ionicons name="logo-whatsapp" size={24} color="white" />
        <Text style={styles.joinButtonText}>Join WhatsApp Group</Text>
      </TouchableOpacity>

      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Community Features:</Text>
        <View style={styles.featureItem}>
          <Ionicons name="chatbubbles-outline" size={24} color="#6B46C1" />
          <Text style={styles.featureText}>24/7 Chat Support</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="calendar-outline" size={24} color="#6B46C1" />
          <Text style={styles.featureText}>Weekly Virtual Meetups</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="information-circle-outline" size={24} color="#6B46C1" />
          <Text style={styles.featureText}>Expert Advice</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  joinButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 40,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  featuresContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2D3748',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4A5568',
  },
});