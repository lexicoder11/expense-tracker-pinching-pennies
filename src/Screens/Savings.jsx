import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';

const SavingsScreen = () => {
    const [savings, setSavings] = useState([]); // State to manage savings entries
    const [savingsAmount, setSavingsAmount] = useState(''); // State for savings amount

    // Add new savings entry
    const addSavings = () => {
        if (savingsAmount.trim()) {
            setSavings([
                ...savings,
                { amount: parseFloat(savingsAmount) },
            ]);
            setSavingsAmount('');
        }
    };

    // Calculate total savings
    const calculateTotalSavings = () => {
        return savings.reduce((total, item) => total + item.amount, 0).toFixed(2);
    };

    return (
        <View style={styles.container}>
            {/* Total Savings Box */}
            <View style={styles.totalSavingsBox}>
                <Text style={styles.totalSavingsText}>
                    Total Savings: ${calculateTotalSavings()}
                </Text>
            </View>

            {/* Input Section */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Savings Amount ($)"
                    value={savingsAmount}
                    onChangeText={setSavingsAmount}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.addButton} onPress={addSavings}>
                    <Text style={styles.addButtonText}>Add Savings</Text>
                </TouchableOpacity>
            </View>

            {/* Savings List */}
            <FlatList
                data={savings}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.savingsItem}>
                        <Text style={styles.savingsText}>
                            Savings: ${item.amount.toFixed(2)}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    totalSavingsBox: {
        backgroundColor: '#28A745',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    totalSavingsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#1B263B',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    savingsItem: {
        padding: 15,
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        marginBottom: 10,
    },
    savingsText: {
        fontSize: 16,
        color: '#1B263B',
    },
});

export default SavingsScreen;
