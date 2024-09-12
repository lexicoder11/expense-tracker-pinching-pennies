import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Header from '../Components/Header';

const ExpenseEditScreen = ({ route, navigation }) => {
    const { expense } = route.params; // Receive the expense data from navigation params

    const [title, setTitle] = useState(expense.title);
    const [amount, setAmount] = useState(expense.amount.toString());

    const handleSave = () => {
        // Validate input
        if (!title || !amount) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        const updatedExpense = {
            ...expense,
            title,
            amount: parseFloat(amount),
        };

        // Here you would typically save the updatedExpense to your backend or state management
        // For example, you could use a function to update the expense in the state or database

        Alert.alert('Success', 'Expense updated successfully!');
        navigation.goBack(); // Go back to the previous screen after saving
    };

    return (
        <View style={styles.container}>
            <Header title="Edit Expense" />
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 18,
    },
});

export default ExpenseEditScreen;