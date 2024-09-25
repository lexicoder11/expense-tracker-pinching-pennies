import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Header from '../Components/Header'; // Assuming you have a header component
import Button from '../Components/Button';

const SignupScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        if (username === '' || email === '' || password === '') {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Add your sign-up logic here (e.g., API call)
        Alert.alert('Success', 'You have signed up successfully');
        navigation.navigate('Welcome');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
                placeholderTextColor="#aaa" // Placeholder color for better visibility
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                placeholderTextColor="#aaa"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                placeholderTextColor="#aaa"
            />
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center content vertically
        padding: 20,
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        borderBottomWidth: 2,
        borderBottomColor: '#007bff', // Adds a stylish bottom border
        paddingBottom: 5,
    },
    input: {
        height: 50, // Increased height for better usability
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 25, // More rounded edges for modern look
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9', // Light background for the input
        fontSize: 16,
    },
});

export default SignupScreen;
