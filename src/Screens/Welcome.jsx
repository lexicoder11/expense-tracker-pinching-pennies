import React from 'react';
import { Text, SafeAreaView, StyleSheet, ActivityIndicator, View } from 'react-native';
import Button from '../Components/Button';
import { useFonts } from 'expo-font';

const WelcomeScreen = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'Raleway': require('/Users/lexi/Documents/expense-tracker-pinching-pennies/assets/Fonts/Raleway-Regular.ttf')
    });


    if (!fontsLoaded) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#FFFFFF" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.welcomeText}>Welcome to Pinching Pennies</Text>

            <Button title="Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Signup" onPress={() => navigation.navigate('Signup')} />

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
    welcomeText: {
        fontSize: 24,
        color: '#FFFFFF',
        fontFamily: 'Raleway-Regular',
        marginBottom: 400,
    },
});

export default WelcomeScreen;
