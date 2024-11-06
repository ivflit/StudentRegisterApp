import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

const RegisterScreen = () => {
    const [attendanceCount, setAttendanceCount] = useState(0);
    const navigation = useNavigation();
    const route = useRoute();

    // Retrieve the selectedStudent from route params
    // const { selectedStudent } = route.params.student || {}; // If selectedStudent is not available, use an empty object
    const selectedStudent = route.params.student;
    // Ensure the selectedStudent is set when the component is mounted
    useEffect(() => {
        if (selectedStudent) {
            setAttendanceCount(selectedStudent.attendanceCount);
        }
    }, [selectedStudent]);

    // Handle confirm attendance - increment attendance and save data
    const handleConfirmAttendance = async () => {
        if (!selectedStudent) {
            alert('No student selected!');
            return;
        }
    
        const updatedStudent = {
            ...selectedStudent,
            attendanceCount: attendanceCount + 1,
        };
    
        try {
            // Path for students.json in the document directory
            const fileUri = FileSystem.documentDirectory + 'students.json';
    
            // Read the existing students.json file
            const fileContents = await FileSystem.readAsStringAsync(fileUri);
    
            // Parse the JSON data and update the specific student record
            let students = JSON.parse(fileContents);
            const updatedStudents = students.map(student =>
                student.name === updatedStudent.name ? updatedStudent : student
            );
    
            // Write the updated student data back to the file
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedStudents));
    
            // Navigate back to HomeScreen with updated student
            navigation.navigate('Trident Register', { updatedStudent });
            alert(`Attendance for ${updatedStudent.name} updated to ${updatedStudent.attendanceCount}`);
        } catch (error) {
            console.error("Error updating students.json:", error);
            alert('Failed to update student data');
        }
    };
    // Handle cancel - go back to HomeScreen without changes
    const handleCancel = () => {
        navigation.goBack();
    };

    if (!selectedStudent) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No student selected. Please go back and select a student.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register Attendance for {selectedStudent.name}</Text>
            <Text style={styles.subtitle}>Current Attendance Count: {attendanceCount}</Text>

            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirmAttendance}>
                <Text style={styles.buttonText}>Confirm Attendance</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 20,
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
    },
    button: {
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: 'green',
    },
    cancelButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    errorText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'red',
    },
});

export default RegisterScreen;
