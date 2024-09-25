import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, style = {} }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#28A745',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
        marginVertical: 10,
        elevation: 3, // For Android shadow
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    text: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default Button;
