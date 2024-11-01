import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import Button from '../Components/Button'; // Importing the Button component

const ExpenseOverviewScreen = ({ navigation }) => {
    const renderExpenseItem = ({ item }) => (
        <View style={styles.expenseItem}>
            <Text style={styles.expenseTitle}>{item.title}</Text>
            <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.screenTitle}>Expense Overview</Text>

            {/* Uncomment and update FlatList data source as needed */}
            {/* <FlatList
                data={expensesData} // Replace this with your actual data source
                renderItem={renderExpenseItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            /> */}

            <Button
                title="Add Expense"
                onPress={() => navigation.navigate('ExpenseAdd')}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
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
});

export default ExpenseOverviewScreen;


