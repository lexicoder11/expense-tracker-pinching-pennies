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

    // Animated values for fade-in and zoom effects
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    // Run animation on component mount
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1, // Fully visible
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1, // Full size
                friction: 5, // Adds smooth bounce
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

        // Sign the user up using Cognito
        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err) {
                console.error('Signup Error:', err); // Log the error to the console
                Alert.alert('Signup Failed', err.message || JSON.stringify(err));
                return;
            }

            console.log('Signup Result:', result); // Log success response
            Alert.alert('Success', 'Account created successfully!');

            navigation.navigate('Login'); // Redirect to Login on success
        });
    };

    return (
        <View style={styles.container}>
            <Animated.Text
                style={[
                    styles.title,
                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                ]}
            >
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
                />
            </Animated.View>

            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry
                    placeholderTextColor="#aaa"
                />
            </Animated.View>

            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                <Button title="Sign Up" onPress={handleSignUp} />
            </Animated.View>

            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.link}
            >
                <Text style={styles.linkText}>Already have an account? Login</Text>
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
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        alignSelf: 'flex-start',
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#007bff',
        paddingBottom: 5,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 15,
        paddingHorizontal: 15,
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

export default SignupScreen;





