import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';

const IncomeScreen = () => {
    const [incomes, setIncomes] = useState([]); // State to manage income entries
    const [source, setSource] = useState(''); // State for income source
    const [amount, setAmount] = useState(''); // State for income amount

    // Add new income entry
    const addIncome = () => {
        if (source.trim() && amount.trim()) {
            setIncomes([...incomes, { source, amount: parseFloat(amount) }]);
            setSource('');
            setAmount('');
        }
    };

    // Calculate total income
    const calculateTotalIncome = () => {
        return incomes.reduce((total, item) => total + item.amount, 0).toFixed(2);
    };

    return (
        <View style={styles.container}>
            {/* Total Income Box */}
            <View style={styles.totalIncomeBox}>
                <Text style={styles.totalIncomeText}>
                    Total Income: ${calculateTotalIncome()}
                </Text>
            </View>

            {/* Input Section */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Income Source (e.g., Salary)"
                    value={source}
                    onChangeText={setSource}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Amount ($)"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.addButton} onPress={addIncome}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>

            {/* List of Income Sources */}
            <FlatList
                data={incomes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.incomeItem}>
                        <Text style={styles.incomeText}>
                            {item.source}: ${item.amount.toFixed(2)}
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
    totalIncomeBox: {
        backgroundColor: '#28A745',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    totalIncomeText: {
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
    incomeItem: {
        padding: 15,
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        marginBottom: 10,
    },
    incomeText: {
        fontSize: 16,
        color: '#1B263B',
    },
});

export default IncomeScreen;
