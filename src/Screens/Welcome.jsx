
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import Button from '../Components/Button';



const WelcomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.welcomeText}>Welcome to Pinching Pennies!</Text>


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
        backgroundColor: '#000',
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 400,
    },
    image: {
        width: 270,
        height: 250,
        marginBottom: 100,
    },

});

export default WelcomeScreen;