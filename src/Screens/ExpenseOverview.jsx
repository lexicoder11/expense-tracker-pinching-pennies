import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import { expensesData } from '../data/expenses'; // Assuming you have some sample data

const ExpenseOverviewScreen = ({ navigation }) => {
    const renderExpenseItem = ({ item }) => (
        <View style={styles.expenseItem}>
            <Text style={styles.expenseTitle}>{item.title}</Text>
            <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="Expense Overview" />
            <FlatList
                data={expensesData} // Replace this with your actual data source
                renderItem={renderExpenseItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('ExpenseAdd')}
            >
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
    listContainer: {
        flexGrow: 1,
    },
    expenseItem: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    expenseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    expenseAmount: {
        fontSize: 16,
        color: '#333',
    },
    addButton: {
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 18,
    },
});

export default ExpenseOverviewScreen;