import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';

const MoneyPlanScreen = () => {
    const [plans, setPlans] = useState([]); // State to manage money plans
    const [newPlan, setNewPlan] = useState(''); // State for inputting a new plan
    const [amount, setAmount] = useState(''); // State for the associated amount

    // Add a new money plan
    const addPlan = () => {
        if (newPlan.trim() && amount.trim()) {
            setPlans([...plans, { plan: newPlan, amount: parseFloat(amount) }]);
            setNewPlan(''); // Clear inputs
            setAmount('');
        }
    };

    // Delete a plan
    const deletePlan = (index) => {
        const updatedPlans = plans.filter((_, i) => i !== index);
        setPlans(updatedPlans);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Money Plan</Text>

            {/* Summary Section */}
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total Income: <Text style={styles.amount}>$0.00</Text>
                </Text>
                <Text style={styles.summaryText}>
                    Total Planned: <Text style={styles.amount}>
                        ${plans.reduce((total, item) => total + item.amount, 0).toFixed(2)}
                    </Text>
                </Text>
            </View>

            {/* Input Section */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter plan (e.g., Rent)"
                    value={newPlan}
                    onChangeText={setNewPlan}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Amount ($)"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.addButton} onPress={addPlan}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>

            {/* List of Money Plans */}
            <FlatList
                data={plans}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.planItem}>
                        <Text style={styles.planText}>
                            {item.plan}: <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
                        </Text>
                        <TouchableOpacity onPress={() => deletePlan(index)}>
                            <Text style={styles.deleteText}>X</Text>
                        </TouchableOpacity>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1B263B',
        marginBottom: 20,
    },
    summary: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
    },
    summaryText: {
        fontSize: 16,
        color: '#1B263B',
        marginBottom: 5,
    },
    amount: {
        fontWeight: 'bold',
        color: '#4CAF50',
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
    planItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        marginBottom: 10,
    },
    planText: {
        fontSize: 16,
        color: '#1B263B',
    },
    deleteText: {
        fontSize: 16,
        color: '#FF4D4D',
        fontWeight: 'bold',
    },
});

export default MoneyPlanScreen;
