import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import StudentOptions from './src/screens/StudentOptions';
import StudentDetail from './src/screens/StudentDetail';
import RegisterScreen from './src/screens/RegisterScreen';
import HowToUseScreen from './src/screens/HowToUseScreen'; 

const Drawer = createDrawerNavigator();

const CustomHeader = ({ navigation }) => (
  <View style={styles.header}>
    <Image source={require('./assets/logo.png')} style={styles.logo} />
    <Text style={styles.headerTitle}>Student Register</Text>
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Ionicons name="menu" size={28} color="black" />
    </TouchableOpacity>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      {/* Drawer Navigator */}
      <Drawer.Navigator initialRouteName="Trident Register" screenOptions={{ headerShown: false }}>
        {/* Home Screen with Custom Header */}
        <Drawer.Screen name="Trident Register">
          {props => (
            <>
              <CustomHeader {...props} />
              <HomeScreen {...props} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Student Options" component={StudentOptions} />
        <Drawer.Screen name="Student Detail" component={StudentDetail} />
        <Drawer.Screen name="Register Student" component={RegisterScreen} />
        <Drawer.Screen name="How to Use" component={HowToUseScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20, // Added margin to the top
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: 'black',
    flex: 1,
  },
});
