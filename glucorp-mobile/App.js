import React from 'react';
import { registerRootComponent } from 'expo';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to GlucoCorp Mobile App!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#006400',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

registerRootComponent(App);

export default App;

