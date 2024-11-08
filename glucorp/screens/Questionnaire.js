import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
const { width } = Dimensions.get('window');

export default function Questionnaire({ navigation }) {
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [otherAllergy, setOtherAllergy] = useState('');
  const scrollViewRef = useRef(null);

  const headerTexts = [
    "Let's Start...",
    "You're Doing Great...",
    "You're Doing Great...",
    "Almost Done...",
    "One More To Go...",
    "And We Are Done..."
  ];

  const questions = [
    {
      text: "What is your age?",
      placeholder: "Enter your age",
      field: "age",
      choices: ["18-25", "26-35", "36-45", "46-55", "56+"]
    },
    {
      text: "What is your weight?",
      placeholder: "Enter your weight",
      field: "weight",
      choices: ["Under 50", "50-70", "71-90", "91-110", "Over 110"]
    },
    {
      text: "What is your height?",
      placeholder: "Enter your height",
      field: "height",
      choices: ["Under 150", "150-160", "161-170", "171-180", "Over 180"]
    },
    {
      text: "Are you diabetic?",
      placeholder: "yes or no",
      field: "diabetic",
      choices: ["yes", "no"]
    },
    {
      text: "Are you pregnant?",
      placeholder: "yes or no",
      field: "pregnant",
      choices: ["yes", "no"]
    },
    {
      text: "Do you have any allergies?",
      placeholder: "Enter allergies (if any)",
      field: "allergies",
      choices: ["Peanuts", "Dairy", "Gluten", "Shellfish", "Eggs", "Other"],
      allowMultiple: true
    }
  ];

  const handleScroll = (event) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  };

  const renderProgressBar = () => {
    const progress = ((currentPage + 1) / questions.length) * 100;
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    );
  };

  const handleChoice = (field, choice) => {
    if (field === 'allergies') {
      const currentAllergies = user.allergies || [];
      const updatedAllergies = currentAllergies.includes(choice)
        ? currentAllergies.filter(item => item !== choice)
        : [...currentAllergies, choice];
      setUser({ ...user, [field]: updatedAllergies });
    } else {
      setUser({ ...user, [field]: choice });
    }
  };

  const renderChoices = (question) => {
    // Check if choices are available
    if (!question.choices) {
      return null; // Return nothing if no choices
    }

    return question.choices.map((choice, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.choiceButton,
          user[question.field] === choice && styles.selectedChoice,
          question.allowMultiple && user[question.field]?.includes(choice) && styles.selectedChoice
        ]}
        onPress={() => handleChoice(question.field, choice)}
      >
        <Text style={styles.choiceText}>{choice}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>{headerTexts[currentPage]}</Text>
        <TouchableOpacity
                  onPress={() => navigation.navigate('Dashboard')} // Navigate to the Dashboard
                  style={styles.headerArrow}
                >
                <AntDesign name="rightcircleo" size={30} color="black"/>
         </TouchableOpacity>
      </View>
      {renderProgressBar()}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.text}</Text>
            <View style={styles.choicesContainer}>
              {renderChoices(question)}
            </View>
            {question.field === 'allergies' && user.allergies?.includes('Other') && (
              <TextInput
                style={styles.input}
                placeholder="Enter other allergies"
                placeholderTextColor="#999"
                value={otherAllergy}
                onChangeText={setOtherAllergy}
                onEndEditing={() => {
                  if (otherAllergy) {
                    setUser(prevUser => ({
                      ...prevUser,
                      allergies: [...(prevUser.allergies || []), otherAllergy]
                    }));
                    setOtherAllergy('');
                  }
                }}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(360 100% 100%)',
  },
  header: {
    justifyContent: "space-between",
    paddingTop: 40,
    paddingBottom: 40,
    fontWeight: 'bold',
    marginTop: 30,
    flexDirection: "row"
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerArrow: {
    justifyContent: "flex-start",
    marginRight: 30
  },
  progressBarContainer: {
    height: 5,
    backgroundColor: '#ffe0e0',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#D94F70',
  },
  questionContainer: {
    width: width,
    padding: 20,
    justifyContent: 'left',
    alignItems: 'left',
  },
  questionText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    color: '#000000',
  },
  input: {
    width: 250,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    color: '#333',
    marginBottom: 20,
  },
  choiceButton: {
    width: "80%",
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginTop: 10

  },
  selectedChoice: {
    backgroundColor: '#ffe0e0',
  },
  choiceText: {
    fontSize: 16,
    color: '#000000',
  }
});