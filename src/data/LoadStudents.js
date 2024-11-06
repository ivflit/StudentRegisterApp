// src/data/loadStudents.js

import studentsJson from '../../assets/students.json'; // Importing the external JSON file
import * as FileSystem from 'expo-file-system';

// Path for the student data file in the app's document directory (which is persistent)
const fileUri = FileSystem.documentDirectory + 'students.json';


// Function to check if the file exists and create it if not
const createInitialFileIfNotExist = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    // Only create the file if it does not exist
    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(studentsJson));
      console.log("Initial student data created in students.json");
    } else {
      console.log("students.json already exists");
    }
  } catch (error) {
    console.error("Error checking or creating the file:", error);
  }
};

// Function to load students from the local file (with fallback to initial data if necessary)
const loadStudents = async () => {
  try {
    // Ensure the file is created if it doesn't exist
    await createInitialFileIfNotExist();

    // Read the content from the file
    const fileContents = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(fileContents);  // Parse and return the JSON data
  } catch (error) {
    console.error("Error reading students data:", error);
    return [];  // Return an empty array or fallback data in case of error
  }
};

export { loadStudents };
