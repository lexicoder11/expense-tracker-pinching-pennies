import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native'; // Import View and Text
import AppNavigator from './src/Navigation/AppNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>App is running!</Text> {/* Temporary text to ensure no error */}
      <AppNavigator /> {/* Render AppNavigator */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures it fills the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
});