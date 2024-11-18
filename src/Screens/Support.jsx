import React from 'react';
import { Text, Button, StyleSheet, SafeAreaView, Linking, Alert } from 'react-native';

const SupportScreen = ({ navigation }) => {

    // Function to handle email link
    const handleEmailPress = async () => {
        const emailUrl = 'mailto:pinchingpenniesmm@gmail.com';

        // Check if the device can open mailto URLs
        const supported = await Linking.canOpenURL(emailUrl);
        if (supported) {
            Linking.openURL(emailUrl).catch(err => console.error('Error opening email:', err));
        } else {
            // If the mailto URL is not supported, show an alert
            Alert.alert('Email Client Not Found', 'Please ensure you have an email client set up on your device.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Support</Text>
            <Text style={styles.info}>
                If you need assistance, please contact us at{' '}
                <Text
                    style={styles.email}
                    onPress={handleEmailPress}
                >
                    pinchingpenniesmm@gmail.com
                </Text>.
            </Text>

            <Button
                title="Back to Profile"
                onPress={() => navigation.goBack()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B263B',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    email: {
        color: '#1E90FF',
        textDecorationLine: 'underline',
    },
});

export default SupportScreen;

