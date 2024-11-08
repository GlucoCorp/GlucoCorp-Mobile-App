import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const WelcomeScreen = ({navigation}) => {
  return(
  <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source = {require("./assets/images/Pregnantwoman2.jpeg")}
          style={styles.blackSection}
        >
        </ImageBackground>
        <Svg height="100" width="100%" viewBox="0 0 1440 320" style={styles.wavySvg}>
          <Path
            fill="#D94F70"
            d="M0,128L60,112C120,96,240,64,360,96C480,128,600,224,720,250.7C840,277,960,235,1080,234.7C1200,235,1320,277,1380,298.7L1440,320L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"          />
        </Svg>
        <View style={styles.orangeSection}>
        <Text style={styles.title}>GluCorp</Text>
        <Text style={styles.subtitle}>Healthy mother, healthy baby</Text>
          <Text
            style={styles.getStarted}>Get started
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
  },
  blackSection: {
    flex: 1,
    backgroundImage: '../glucorp-mobile/screens/assets/images/DigitalFindsCanada.jpeg',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orangeSection: {
    flex: 1,
    backgroundColor: '#D94F70',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  wavySvg: {
    position: 'absolute',
    bottom: '50%',
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    justifyContent:'flex-end'
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign:'center'
  },
  getStarted: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 100,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: "bold"
  },
});

export default WelcomeScreen