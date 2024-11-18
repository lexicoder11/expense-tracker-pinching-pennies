
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SpendingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Spending</Text>
            {/* Add your form to add expenses here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default SpendingScreen;
