import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Animated,
} from 'react-native';
import Button from '../Components/Button';
import PasswordInput from '../Components/PasswordInput'; // Importing the PasswordInput component
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

// Hard-code your Cognito User Pool configuration
const poolData = {
    UserPoolId: 'us-west-2_AMexENVv6', // Replace with your User Pool ID
    ClientId: '51dvqq4pk0s3nbj8n3835q3fgf', // Replace with your App Client ID
};
const userPool = new CognitoUserPool(poolData);

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Animated values for fade and zoom
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    // Trigger animation when the component mounts
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // AWS Cognito
    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        const user = new CognitoUser({
            Username: email,
            Pool: userPool,
        });

        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                const accessToken = result.getAccessToken().getJwtToken();
                console.log('Access Token:', accessToken); // Debugging log

                Alert.alert('Success', 'Logged in successfully!');

                // Navigate to Tabs (Main App) and reset the navigation stack
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            },
            onFailure: (err) => {
                console.error('Login Error:', err);
                if (err.code === 'UserNotConfirmedException') {
                    Alert.alert(
                        'Account Not Verified',
                        'Your account is not confirmed. Please enter the confirmation code sent to your email.'
                    );
                    navigation.navigate('ConfirmSignup'); // Redirect to ConfirmSignup page
                } else {
                    Alert.alert('Login Failed', err.message || 'An unknown error occurred.');
                }
            },
            newPasswordRequired: (userAttributes) => {
                delete userAttributes.email_verified; // Remove read-only attributes
                Alert.alert('New Password Required', 'Please reset your password.');
            },
            mfaRequired: (challengeName, challengeParameters) => {
                Alert.alert('MFA Required', 'Multi-factor authentication required.');
            },
        });
    };

    return (
        <View style={styles.container}>
            <Animated.Text
                style={[styles.title, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
            >
                Welcome Back!
            </Animated.Text>

            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
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
                <Button title="Login" onPress={handleLogin} />
            </Animated.View>

            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.link}
                >
                    <Text style={styles.linkText}>Don't have an account? Sign up</Text>
                </TouchableOpacity>
            </Animated.View>
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





