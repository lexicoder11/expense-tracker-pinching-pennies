// PasswordInput.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PasswordInput = ({ value, onChangeText, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.passwordContainer}>
            <TextInput
                style={styles.passwordInput}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={!showPassword} // Toggle visibility
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={24}
                    color="gray"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9',
    },
    passwordInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
});

export default PasswordInput;
