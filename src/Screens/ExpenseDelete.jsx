import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Header from '../Components/Header';

const ExpenseDeleteScreen = ({ route, navigation }) => {
    const { expense } = route.params; // Receive the expense data from navigation params

    const handleDelete = () => {
        // Here you would typically delete the expense from your backend or state management
        // For example, you could use a function to remove the expense from the state or database

        Alert.alert('Success', 'Expense deleted successfully!');
        navigation.goBack(); // Go back to the previous screen after deleting
    };

    const handleCancel = () => {
        navigation.goBack(); // Go back to the previous screen without making any changes
    };

    return (
        <View style={styles.container}>
            <Header title="Delete Expense" />
            <Text style={styles.message}>
                Are you sure you want to delete the expense "{expense.title}"?
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 15,
        borderRadius: 5,
        marginRight: 10,
        alignItems: 'center',
        flex: 1,
    },
    deleteButtonText: {
        color: '#FFF',
        fontSize: 18,
    },
    cancelButton: {
        backgroundColor: '#6c757d',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
    },
    cancelButtonText: {
        color: '#FFF',
        fontSize: 18,
    },
});

export default ExpenseDeleteScreen;