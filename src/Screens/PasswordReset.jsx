import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-west-2_AMexENVv6',
    ClientId: '51dvqq4pk0s3nbj8n3835q3fgf',
};
const userPool = new CognitoUserPool(poolData);

const PasswordResetScreen = ({ navigation, route }) => {
    const preFilledEmail = route?.params?.email || ''; // Access pre-filled email from route params
    const [email, setEmail] = useState(preFilledEmail);
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Request Code, 2: Reset Password

    const requestResetCode = () => {
        const user = new CognitoUser({
            Username: email,
            Pool: userPool,
        });

        user.forgotPassword({
            onSuccess: (data) => {
                console.log('Code sent:', data);
                Alert.alert('Success', 'Verification code sent to your email.');
                setStep(2);
            },
            onFailure: (err) => {
                console.error('Error:', err);
                Alert.alert('Error', err.message || 'An unknown error occurred.');
            },
        });
    };

    const resetPassword = () => {
        const user = new CognitoUser({
            Username: email,
            Pool: userPool,
        });

        user.confirmPassword(verificationCode, newPassword, {
            onSuccess: () => {
                Alert.alert('Success', 'Password reset successfully!');
                navigation.navigate('Login');
            },
            onFailure: (err) => {
                console.error('Error:', err);
                Alert.alert('Error', err.message || 'An unknown error occurred.');
            },
        });
    };

    return (
        <View style={styles.container}>
            {step === 1 ? (
                <>
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
                    <TouchableOpacity onPress={requestResetCode} style={styles.button}>
                        <Text style={styles.buttonText}>Send Verification Code</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.label}>Verification Code</Text>
                    <TextInput
                        style={styles.input}
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                        placeholder="Enter verification code"
                    />
                    <Text style={styles.label}>New Password</Text>
                    <TextInput
                        style={styles.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Enter new password"
                        secureTextEntry
                    />
                    <TouchableOpacity onPress={resetPassword} style={styles.button}>
                        <Text style={styles.buttonText}>Reset Password</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    label: { fontSize: 16, marginBottom: 10 },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontSize: 16 },
});

export default PasswordResetScreen;

