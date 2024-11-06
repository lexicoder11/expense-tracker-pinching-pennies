import React from 'react';
import { Text, Button, StyleSheet, SafeAreaView } from 'react-native';

const SupportScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Support</Text>
            <Text style={styles.info}>If you need assistance, please contact us at support@example.com.</Text>


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
    },
});

export default SupportScreen;
