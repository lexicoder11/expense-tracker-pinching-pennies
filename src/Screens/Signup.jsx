import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Animated,
} from 'react-native';
import Button from '../Components/Button';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import PasswordInput from '../Components/PasswordInput'; // Import the PasswordInput component

// Hard-code your Cognito User Pool configuration
const poolData = {
    UserPoolId: 'us-west-2_AMexENVv6',
    ClientId: '51dvqq4pk0s3nbj8n3835q3fgf',
};
const userPool = new CognitoUserPool(poolData);

const SignupScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleSignUp = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Email and password are required.');
            return;
        }

        const attributeList = [new CognitoUserAttribute({ Name: 'email', Value: email })];

        if (username) {
            attributeList.push(
                new CognitoUserAttribute({ Name: 'custom:username', Value: username })
            );
        }

        if (phoneNumber) { // Add phone number if provided
            attributeList.push(
                new CognitoUserAttribute({ Name: 'phone_number', Value: phoneNumber })
            );
        }

        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err) {
                console.error('Signup Error:', err);
                Alert.alert('Signup Failed', err.message || JSON.stringify(err));
                return;
            }

            Alert.alert('Success', 'Account created! Please verify your email.');

            navigation.navigate('ConfirmSignup', { email }); // Redirect to ConfirmSignup with email
        });
    };

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.title, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                Create an Account
            </Animated.Text>

            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter your username"
                    placeholderTextColor="#aaa"
                />
            </Animated.View>

            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    placeholderTextColor="#aaa"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </Animated.View>

            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                <Text style={styles.label}>Password</Text>
                <PasswordInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                />
            </Animated.View>

            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                <Text style={styles.label}>Phone Number (Optional)</Text>
                <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Enter phone number with your country area code"
                    keyboardType="phone-pad"
                    placeholderTextColor="#aaa"
                />
            </Animated.View>

            <Button title="Sign Up" onPress={handleSignUp} />

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
            </TouchableOpacity>

            {/* Temporary Test Button to Navigate to ConfirmSignup */}
            <TouchableOpacity
                style={styles.testButton}
                onPress={() => navigation.navigate('ConfirmSignup', { email: 'test@example.com' })}
            >
                <Text style={styles.testButtonText}>Test Confirm Signup</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FFF' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
    label: {
        fontSize: 20,
        marginBottom: .5,
        color: '#333',
        borderBottomWidth: 2,
        paddingBottom: 5
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 8,
    },
    link: { marginTop: 15 },
    linkText: { color: '#007bff', fontSize: 16, textAlign: 'center' },
    testButton: {
        marginTop: 15,
        backgroundColor: '#1B263B',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    testButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});

export default SignupScreen;










