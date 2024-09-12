import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Header from '../Components/Header';

const ExpenseAddScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const handleAddExpense = () => {
        if (!title || !amount || !date) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        // Here you would typically add the expense to your backend or state management
        // For example, you could use a function to add the expense to the state or database

        Alert.alert('Success', 'Expense added successfully!');
        navigation.goBack(); // Go back to the previous screen after adding
    };

    return (
        <View style={styles.container}>
            <Header title="Add Expense" />
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter expense title"
                    value={title}
                    onChangeText={setTitle}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Amount:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Date:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter date (YYYY-MM-DD)"
                    value={date}
                    onChangeText={setDate}
                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
                <Text style={styles.addButtonText}>Add Expense</Text>
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
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#000',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    addButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 18,
    },
});

export default ExpenseAddScreen;