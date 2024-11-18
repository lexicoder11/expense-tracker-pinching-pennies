import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Button, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

// Cognito User Pool configuration
const poolData = {
    UserPoolId: 'us-west-2_AMexENVv6', // Replace with your actual User Pool ID
    ClientId: '51dvqq4pk0s3nbj8n3835q3fgf', // Replace with your actual Client ID
};

const userPool = new CognitoUserPool(poolData);

const ProfileScreen = ({ navigation }) => {
    const [remindersEnabled, setRemindersEnabled] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Fetch user profile from Cognito
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Assuming the user is authenticated and their session is stored
                const currentUser = userPool.getCurrentUser();

                if (currentUser) {
                    currentUser.getSession((err, session) => {
                        if (err) {
                            console.error('Session error:', err);
                            return;
                        }

                        // Retrieve user attributes
                        currentUser.getUserAttributes((err, attributes) => {
                            if (err) {
                                console.error('Error fetching attributes:', err);
                                return;
                            }

                            // Extract attributes into state
                            const userAttributes = attributes.reduce((acc, attr) => {
                                acc[attr.Name] = attr.Value;
                                return acc;
                            }, {});

                            // Update state with user details
                            setName(userAttributes['custom:username'] || '');
                            setEmail(userAttributes['email'] || '');
                            setPhoneNumber(userAttributes['phone_number'] || '');
                        });
                    });
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const toggleReminders = () => {
        setRemindersEnabled(previousState => !previousState);
    };

    const handleSaveProfile = () => {
        console.log({
            name,
            email,
            phoneNumber,
            remindersEnabled,
        });
        alert('Profile Saved!');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Profile</Text>

                {/* Name Field */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        placeholderTextColor="#aaa"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {/* Email Field */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Phone Number Field */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        placeholderTextColor="#aaa"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>

                {/* Reminder Toggle */}
                <View style={styles.settingContainer}>
                    <Text style={styles.settingText}>Reminders</Text>
                    <Switch
                        value={remindersEnabled}
                        onValueChange={toggleReminders}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={remindersEnabled ? '#f5dd4b' : '#f4f3f4'}
                    />
                </View>

                {/* Save Button */}
                <Button title="Save Profile" onPress={handleSaveProfile} />

                {/* Support Button */}
                <Button
                    title="Go to Support"
                    onPress={() => navigation.navigate('Support')}
                    color="#007BFF"
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B263B',
    },
    scrollContent: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        color: '#000',
    },
    settingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        marginVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    settingText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
});

export default ProfileScreen;




