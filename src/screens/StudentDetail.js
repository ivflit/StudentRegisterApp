// src/screens/StudentDetail.js

import React from 'react';
import { View, Text } from 'react-native';

const StudentDetail = ({ route }) => {
    const { student } = route.params;  // Access the student data passed from HomeScreen

    return (
        <View style={{ padding: 20 }}>
            <Text>Name: {student.name}</Text>
            <Text>Date of Birth: {student.dateOfBirth}</Text>
            <Text>Grade: {student.grade}</Text>
            <Text>Attendance: {student.attendanceCount}</Text>
            <Text>Membership Status: {student.isMember ? 'Active' : 'Inactive'}</Text>
        </View>
    );
};

export default StudentDetail;
