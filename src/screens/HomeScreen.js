// src/screens/HomeScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { loadStudents } from '../data/LoadStudents';  // Import the loadStudents function

const HomeScreen = () => {
    const [students, setStudents] = useState([]); // State to hold the students' data
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [filteredStudents, setFilteredStudents] = useState([]); // Filtered students based on search query
    const [selectedStudent, setSelectedStudent] = useState(null); // State to store the selected student
    const navigation = useNavigation();
    const route = useRoute();  // Get route params

    useEffect(() => {
        // Load the students data when the component mounts or when updated student is passed back
        (async () => {
            const data = await loadStudents();  // Get data from loadStudents
            setStudents(data);  // Set the students' data in the state
        })();
    }, [route.params?.updatedStudent]); // Dependency on updatedStudent to reload students if needed

    useEffect(() => {
        // If updatedStudent is passed from another screen, update the students list
        if (route.params?.updatedStudent) {
            const updatedStudent = route.params.updatedStudent;
            setStudents(prevStudents => 
                prevStudents.map(student => 
                    student.name === updatedStudent.name ? updatedStudent : student
                )
            );
        }
    }, [route.params?.updatedStudent]);  // Trigger this effect if updatedStudent is passed

    // Handle search query change
    const handleSearchChange = (query) => {
        setSearchQuery(query);

        // Filter students based on search query
        if (query) {
            const filtered = students.filter(student =>
                student.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredStudents(filtered);
        } else {
            setFilteredStudents([]);
        }
    };

    // Handle selecting a student from the dropdown
    const handleSelectStudent = (student) => {
        setSelectedStudent(student);  // Set the selected student
        setSearchQuery(student.name);  // Optional: set the search input to the selected student's name
        setFilteredStudents([]);  // Clear the dropdown list after selection
    };

    // Handle navigation to Student Detail with the selected student
    const handleViewDetails = () => {
        if (selectedStudent) {
            navigation.navigate('Student Detail', { student: selectedStudent });
            // Reset selected student and search query after navigation
            setSelectedStudent(null);
            setSearchQuery('');  // Clear the search query
        } else {
            alert('Please select a student first.');
        }
    };

    // Handle navigation to Register Student with the selected student
    const handleRegisterStudent = () => {
        if (selectedStudent) {
            navigation.navigate('Register Student', { student: selectedStudent });
            // Reset selected student and search query after navigation
            setSelectedStudent(null);
            setSearchQuery('');  // Clear the search query
        } else {
            alert('Please select a student first.');
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>

            {/* Search Input */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search for a student..."
                value={searchQuery}
                onChangeText={handleSearchChange}  // Update search query
            />

            {/* Dropdown for search results */}
            {filteredStudents.length > 0 && (
                <FlatList
                    data={filteredStudents}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelectStudent(item)}>
                            <View style={styles.dropdownItem}>
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    style={styles.dropdownList}
                />
            )}

            {/* Buttons for other actions */}
            <View style={{ marginTop: 20 }}>
                <Button
                    title="Register a Student for Class"
                    onPress={handleRegisterStudent} // Pass selectedStudent to Register Student screen
                />
            </View>
            <View style={{ marginTop: 10 }}>
                <Button
                    title="View Student details"
                    onPress={handleViewDetails} // Pass selectedStudent to Student Detail screen
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    dropdownList: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginTop: 10,
    },
    dropdownItem: {
        padding: 10,
    },
});

export default HomeScreen;
