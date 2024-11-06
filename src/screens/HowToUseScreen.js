// src/screens/HowToUseScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HowToUseScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>How to Use This App</Text>
            <Text style={styles.instructions}>
                1. **Select a Student**: From the home screen, you can search for a student using the search bar. 
                Tap on a student's name to select them.
            </Text>
            <Text style={styles.instructions}>
                2. **Register a Student**: Once a student is selected, you can register them for classes by clicking the "Register a Student for Class" button.
            </Text>
            <Text style={styles.instructions}>
                3. **View Student Details**: You can view detailed information about the student by clicking the "View Student Details" button.
            </Text>
            <Text style={styles.instructions}>
                4. **Update Attendance**: While viewing the student details, you can update their attendance count.
            </Text>
            <Text style={styles.instructions}>
                5. **Access this Guide**: You can return to this guide anytime to refresh your understanding of the app’s functionalities.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    instructions: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default HowToUseScreen;
