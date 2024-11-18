import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Animated,
    Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import Button from '../Components/Button';
import PasswordInput from '../Components/PasswordInput';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

// Cognito User Pool configuration
const poolData = {
    UserPoolId: 'us-west-2_AMexENVv6',
    ClientId: '51dvqq4pk0s3nbj8n3835q3fgf',
};
const userPool = new CognitoUserPool(poolData);

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); // New state to control password visibility

    // Animated values for fade and zoom
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    // Load saved email if "Remember Me" was previously checked
    useEffect(() => {
        const loadSavedEmail = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('rememberedEmail');
                if (savedEmail) {
                    setEmail(savedEmail);
                    setRememberMe(true);
                }
            } catch (error) {
                console.error('Failed to load email', error);
            }
        };
        loadSavedEmail();

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

    // Handle Login and Remember Me
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        // Save or clear the email based on Remember Me
        if (rememberMe) {
            await AsyncStorage.setItem('rememberedEmail', email);
        } else {
            await AsyncStorage.removeItem('rememberedEmail');
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
                console.log('Access Token:', accessToken);

                Alert.alert('Success', 'Logged in successfully!');
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })
                );
            },
            onFailure: (err) => {
                console.error('Login Error:', err);
                if (err.code === 'UserNotConfirmedException') {
                    Alert.alert(
                        'Account Not Verified',
                        'Your account is not confirmed. Please enter the confirmation code sent to your email.'
                    );
                    navigation.navigate('ConfirmSignup');
                } else if (err.code === 'PasswordResetRequiredException') {
                    Alert.alert(
                        'Password Reset Required',
                        'Your account requires a password reset. Please check your email for the reset code.'
                    );
                    navigation.navigate('PasswordReset');
                } else {
                    Alert.alert('Login Failed', err.message || 'An unknown error occurred.');
                }
            },
            newPasswordRequired: (userAttributes) => {
                delete userAttributes.email_verified;
                Alert.alert('New Password Required', 'Please reset your password.');
            },
            mfaRequired: (challengeName, challengeParameters) => {
                Alert.alert('MFA Required', 'Multi-factor authentication required.');
            },
        });
    };

    const handleForgotPassword = () => {
        if (!email) {
            Alert.alert(
                'Email Required',
                'Please enter your email address to reset your password.'
            );
            return;
        }

        const user = new CognitoUser({
            Username: email,
            Pool: userPool,
        });

        user.forgotPassword({
            onSuccess: (data) => {
                console.log('Forgot Password Success:', data);
                Alert.alert(
                    'Reset Password',
                    'A password reset code has been sent to your email. Follow the instructions to reset your password.'
                );
                navigation.navigate('PasswordReset');
            },
            onFailure: (err) => {
                console.error('Forgot Password Error:', err);
                Alert.alert('Error', err.message || 'An unknown error occurred.');
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
                    secureTextEntry={!passwordVisible}  // Toggling password visibility
                />
                <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                    style={styles.showPasswordButton}
                >
                    <Text style={styles.showPasswordText}>
                        {passwordVisible ? 'Hide Password' : 'Show Password'}
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Remember Me Toggle */}
            <View style={styles.rememberMeContainer}>
                <Text style={styles.rememberMeText}>Remember Me</Text>
                <Switch
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    trackColor={{ false: '#767577', true: '#32CD32' }}
                    thumbColor={rememberMe ? '#ffffff' : '#f4f3f4'}
                />
            </View>

            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                <Button title="Login" onPress={handleLogin} />
            </Animated.View>

            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity onPress={handleForgotPassword} style={styles.link}>
                    <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>
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
    rememberMeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
    },
    rememberMeText: {
        fontSize: 16,
        color: '#333',
    },
    showPasswordButton: {
        marginTop: 10,
        alignItems: 'flex-end',
    },
    showPasswordText: {
        color: '#007bff',
        fontSize: 14,
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













