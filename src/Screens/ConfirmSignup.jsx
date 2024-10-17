import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'; // Ensure import

// Hard-code your Cognito User Pool configuration
const poolData = {
    UserPoolId: 'us-west-2_AMexENVv6', // Replace with your User Pool ID
    ClientId: '51dvqq4pk0s3nbj8n3835q3fgf', // Replace with your App Client ID
};
const userPool = new CognitoUserPool(poolData); // Initialize the user pool

const ConfirmSignup = ({ route, navigation }) => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const { email } = route.params; // Get email from route parameters

    const handleConfirmSignup = () => {
        const user = new CognitoUser({
            Username: email,
            Pool: userPool,
        });

        user.confirmRegistration(confirmationCode, true, (err) => {
            if (err) {
                console.error('Confirmation Error:', err);
                Alert.alert('Error', err.message || 'Something went wrong.');
                return;
            }

            Alert.alert('Success', 'Account confirmed successfully!');

            // Redirect to Home after confirmation
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }], // Navigate to 'Home'
            });
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirm Your Email</Text>

            <TextInput
                style={styles.input}
                value={confirmationCode}
                onChangeText={setConfirmationCode}
                placeholder="Enter confirmation code"
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <Button title="Confirm Signup" onPress={handleConfirmSignup} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FFF' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});

export default ConfirmSignup;



