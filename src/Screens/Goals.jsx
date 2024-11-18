import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const GoalsScreen = () => {
    const [goals, setGoals] = useState([]); // State to manage list of goals
    const [newGoal, setNewGoal] = useState(''); // State to manage new goal input

    // Function to handle adding a new goal
    const addGoal = () => {
        if (newGoal.trim()) {
            setGoals([...goals, newGoal]);
            setNewGoal(''); // Clear input field after adding
        }
    };

    // Function to delete a goal
    const deleteGoal = (index) => {
        const updatedGoals = goals.filter((_, i) => i !== index);
        setGoals(updatedGoals);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Goals</Text>

            {/* Input field for new goals */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a new goal"
                    value={newGoal}
                    onChangeText={setNewGoal}
                />
                <TouchableOpacity style={styles.addButton} onPress={addGoal}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>

            {/* List of goals */}
            <FlatList
                data={goals}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.goalItem}>
                        <Text style={styles.goalText}>{item}</Text>
                        <TouchableOpacity onPress={() => deleteGoal(index)}>
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
    goalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        marginBottom: 10,
    },
    goalText: {
        fontSize: 16,
        color: '#1B263B',
    },
    deleteText: {
        fontSize: 16,
        color: '#FF4D4D',
        fontWeight: 'bold',
    },
});

export default GoalsScreen;
