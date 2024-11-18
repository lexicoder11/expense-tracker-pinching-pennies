import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';

const DebtScreen = () => {
    const [debts, setDebts] = useState([]); // State to manage debt entries
    const [debtName, setDebtName] = useState(''); // State for debt name
    const [debtAmount, setDebtAmount] = useState(''); // State for debt amount
    const [paymentAmount, setPaymentAmount] = useState(''); // State for payment amount
    const [selectedDebtIndex, setSelectedDebtIndex] = useState(null); // To track selected debt for payments

    // Add new debt entry
    const addDebt = () => {
        if (debtName.trim() && debtAmount.trim()) {
            setDebts([
                ...debts,
                { name: debtName, amount: parseFloat(debtAmount), payments: [] },
            ]);
            setDebtName('');
            setDebtAmount('');
        }
    };

    // Add payment to a specific debt
    const addPayment = (index) => {
        if (paymentAmount.trim() && !isNaN(paymentAmount)) {
            const updatedDebts = [...debts];
            updatedDebts[index].payments.push(parseFloat(paymentAmount));
            updatedDebts[index].amount -= parseFloat(paymentAmount);
            setDebts(updatedDebts);
            setPaymentAmount('');
        }
    };

    // Calculate total debt
    const calculateTotalDebt = () => {
        return debts.reduce((total, item) => total + item.amount, 0).toFixed(2);
    };

    return (
        <View style={styles.container}>
            {/* Total Debt Box */}
            <View style={styles.totalDebtBox}>
                <Text style={styles.totalDebtText}>
                    Total Debt: ${calculateTotalDebt()}
                </Text>
            </View>

            {/* Input Section */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Debt Name (e.g., Credit Card)"
                    value={debtName}
                    onChangeText={setDebtName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Amount ($)"
                    value={debtAmount}
                    onChangeText={setDebtAmount}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.addButton} onPress={addDebt}>
                    <Text style={styles.addButtonText}>Add Debt</Text>
                </TouchableOpacity>
            </View>

            {/* Debt List */}
            <FlatList
                data={debts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.debtItem}>
                        <Text style={styles.debtText}>
                            {item.name}: ${item.amount.toFixed(2)}
                        </Text>

                        {/* Add Payment Section */}
                        <TextInput
                            style={styles.paymentInput}
                            placeholder="Payment Amount ($)"
                            value={paymentAmount}
                            onChangeText={setPaymentAmount}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => addPayment(index)}
                        >
                            <Text style={styles.addButtonText}>Add Payment</Text>
                        </TouchableOpacity>

                        {/* List of Payments */}
                        {item.payments.length > 0 && (
                            <View style={styles.paymentList}>
                                <Text style={styles.paymentHeader}>Payments:</Text>
                                {item.payments.map((payment, idx) => (
                                    <Text key={idx} style={styles.paymentText}>
                                        ${payment.toFixed(2)}
                                    </Text>
                                ))}
                            </View>
                        )}
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
    totalDebtBox: {
        backgroundColor: '#DC3545',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    totalDebtText: {
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
    debtItem: {
        padding: 15,
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        marginBottom: 10,
    },
    debtText: {
        fontSize: 16,
        color: '#1B263B',
        marginBottom: 10,
    },
    paymentInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
        marginBottom: 10,
    },
    paymentList: {
        marginTop: 10,
    },
    paymentHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    paymentText: {
        fontSize: 14,
        color: '#28A745',
    },
});

export default DebtScreen;
