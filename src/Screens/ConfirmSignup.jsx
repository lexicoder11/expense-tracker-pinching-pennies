import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Animated
} from 'react-native';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

// Hard-code your Cognito User Pool configuration
const poolData = {
    UserPoolId: 'us-west-2_AMexENVv6', // Replace with your User Pool ID
    ClientId: '51dvqq4pk0s3nbj8n3835q3fgf', // Replace with your App Client ID
};
const userPool = new CognitoUserPool(poolData);

const ConfirmSignup = ({ route, navigation }) => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const { email } = route.params || {}; // Get email from route parameters

    // Create animation references
    const scaleAnim = useRef(new Animated.Value(0.8)).current; // Start smaller

    // Run the zoom-in animation when the component mounts
    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1, // Full size
            friction: 5,
            useNativeDriver: true,
        }).start();
    }, []);

    // Redirect if no email is passed
    useEffect(() => {
        if (!email) {
            Alert.alert('Error', 'No email provided. Redirecting to Signup.');
            navigation.replace('Signup');
        }
    }, [email]);

    const handleConfirmSignup = () => {
        const user = new CognitoUser({
            Username: email, // Use the email passed from signup
            Pool: userPool,
        });

        user.confirmRegistration(confirmationCode, true, (err) => {
            if (err) {
                console.error('Confirmation Error:', err);
                Alert.alert('Error', err.message || 'Something went wrong.');
                return;
            }

            Alert.alert('Success', 'Account confirmed successfully!');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }], // Navigate to 'Home'
            });
        });
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.title}>Confirm Your Email</Text>

            <TextInput
                style={styles.input}
                value={confirmationCode}
                onChangeText={setConfirmationCode}
                placeholder="Enter confirmation code"
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#aaa"
            />

            <TouchableOpacity style={styles.button} onPress={handleConfirmSignup}>
                <Text style={styles.buttonText}>Confirm Signup</Text>
            </TouchableOpacity>
        </Animated.View>
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
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#28A745', // Green button
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ConfirmSignup;







