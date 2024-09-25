import React from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, } from "react-native";

export default function Dashboard({  navigation  }){
    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>Welcome</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'

    },
    headerText: {
        alignItems: 'left',
        color: 'white',

    }

});