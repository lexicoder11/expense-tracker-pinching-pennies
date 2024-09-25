import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Button from '../Components/Button';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email === '' || password === '') {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Add your login logic here (e.g., API call)
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('Welcome');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.link}>
                <Text style={styles.linkText}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        alignSelf: 'flex-start',
        borderBottomWidth: 2,
        borderBottomColor: '#007bff',
        paddingBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
    },
    link: {
        marginTop: 15,
    },
    linkText: {
        color: '#007bff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default LoginScreen;
